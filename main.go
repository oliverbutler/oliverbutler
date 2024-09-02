package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log/slog"
	"net/http"
	"oliverbutler/templates"
	"path/filepath"
	"sync"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	_ "github.com/lib/pq"
)

var db *sql.DB

func initDB() error {
	connStr := "host=10.0.0.40 port=5432 user=dbuser password=password123 dbname=oliverbutler sslmode=disable"
	var err error
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		return err
	}

	// Create the visits table if it doesn't exist
	_, err = db.Exec(`
        CREATE TABLE IF NOT EXISTS visits (
            id SERIAL PRIMARY KEY,
            page VARCHAR(255) NOT NULL,
            count INT DEFAULT 0
        )
    `)
	if err != nil {
		return err
	}

	return nil
}

func incrementVisits(page string) (int, error) {
	// Check if the page already exists
	var count int
	err := db.QueryRow("SELECT count FROM visits WHERE page = $1", page).Scan(&count)
	if err != nil {
		if err == sql.ErrNoRows {
			// Page doesn't exist, insert it
			_, err := db.Exec("INSERT INTO visits (page, count) VALUES ($1, 1)", page)
			if err != nil {
				return 0, err
			}
			return 1, nil
		}
		return 0, err
	}

	// Page exists, increment the count
	_, err = db.Exec("UPDATE visits SET count = count + 1 WHERE page = $1", page)
	if err != nil {
		return 0, err
	}

	return count + 1, nil
}

type Trip struct {
	Name   string      `json:"name"`
	Events []TripEvent `json:"events"`
}

type TripEvent interface {
	EventType() string
}

type CampEvent struct {
	Type string  `json:"type"`
	Name string  `json:"name"`
	Lat  float64 `json:"lat"`
	Lon  float64 `json:"lon"`
	Alt  int     `json:"alt"`
}

func (c CampEvent) EventType() string {
	return "camp"
}

type HikeEvent struct {
	Type              string       `json:"type"`
	TrackPoints       []TrackPoint `json:"trackPoints"`
	TrackPointsLowRes []TrackPoint `json:"trackPointsLowRes"`
}

func (h HikeEvent) EventType() string {
	return "hike"
}

var (
	tripCache      []Trip
	tripCacheMutex sync.RWMutex
)

func main() {
	if err := initDB(); err != nil {
		slog.Error("Failed to initialize database", "error", err)
		return
	}
	defer db.Close()

	// Load the cache on startup
	if err := loadTripCache(); err != nil {
		slog.Error("Failed to load trip cache", "error", err)
	}

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	fileServer := http.FileServer(http.Dir("./static"))
	r.Handle("/static/*", http.StripPrefix("/static/", fileServer))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		templates.Index().Render(r.Context(), w)
	})

	r.Get("/maps", func(w http.ResponseWriter, r *http.Request) {
		count, err := incrementVisits("/maps")
		if err != nil {
			slog.Error("Failed to increment visit count", "error", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		tripCacheMutex.RLock()
		tripsJSON, err := json.Marshal(tripCache)
		tripCacheMutex.RUnlock()

		if err != nil {
			http.Error(w, "Error marshaling trip data", http.StatusInternalServerError)
			return
		}

		title := fmt.Sprintf("Maps (%d visits)", count)

		templates.Map(title, string(tripsJSON)).Render(r.Context(), w)
	})

	http.ListenAndServe(":3000", r)
}

func loadTripCache() error {
	trips, err := readTripData()
	if err != nil {
		return err
	}

	tripCacheMutex.Lock()
	tripCache = trips
	tripCacheMutex.Unlock()

	slog.Info("Trip cache loaded", "count", len(trips))
	return nil
}

func readTripData() ([]Trip, error) {
	tripsDir := "./static/gpx/"
	tripFolders, err := ioutil.ReadDir(tripsDir)
	if err != nil {
		return nil, err
	}

	var trips []Trip

	for _, folder := range tripFolders {
		if folder.IsDir() {
			tripPath := filepath.Join(tripsDir, folder.Name())
			metaPath := filepath.Join(tripPath, "meta.yaml")

			meta, err := parseMetaFile(metaPath)
			if err != nil {
				return nil, err
			}

			trip := Trip{
				Name:   meta.Name,
				Events: make([]TripEvent, len(meta.Events)),
			}

			slog.Info(fmt.Sprintf("Processing trip: %s", trip.Name))

			for i, event := range meta.Events {
				if event.Type == "camp" {
					trip.Events[i] = CampEvent{
						Type: event.Type,
						Name: event.Name,
						Lat:  event.Lat,
						Lon:  event.Lon,
						Alt:  event.Alt,
					}

					slog.Info(fmt.Sprintf("Processing camp: %s at %f, %f", event.Name, event.Lat, event.Lon))
				} else if event.Type == "hike" {
					hikePath := filepath.Join(tripPath, event.GPX)
					processed, err := processGPXFile(hikePath)
					if err != nil {
						return nil, err
					}

					slog.Info(fmt.Sprintf("Processing hike: %s", event.GPX))

					trip.Events[i] = HikeEvent{
						Type:              event.Type,
						TrackPoints:       processed.HighResolution,
						TrackPointsLowRes: processed.LowResolution,
					}
				}
			}

			trips = append(trips, trip)
		}
	}

	return trips, nil
}
