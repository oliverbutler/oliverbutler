package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log/slog"
	"net/http"
	"oliverbutler/templates"
	"path/filepath"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

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

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	fileServer := http.FileServer(http.Dir("./static"))
	r.Handle("/static/*", http.StripPrefix("/static/", fileServer))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		templates.Index().Render(r.Context(), w)
	})

	r.Get("/maps", func(w http.ResponseWriter, r *http.Request) {
		trips, err := readTripData()
		if err != nil {
			http.Error(w, "Error reading trip data", http.StatusInternalServerError)
			return
		}

		tripsJSON, err := json.Marshal(trips)
		if err != nil {
			http.Error(w, "Error marshaling trip data", http.StatusInternalServerError)
			return
		}

		templates.Map("My Trips", string(tripsJSON)).Render(r.Context(), w)
	})

	http.ListenAndServe(":3000", r)
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
