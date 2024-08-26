package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"oliverbutler/templates"
	"path/filepath"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/paulmach/go.geojson"
	"github.com/tkrajina/gpxgo/gpx"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	fileServer := http.FileServer(http.Dir("./static"))
	r.Handle("/static/*", http.StripPrefix("/static/", fileServer))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		templates.Index().Render(r.Context(), w)
	})

	r.Get("/maps", func(w http.ResponseWriter, r *http.Request) {
		geoJSON, err := convertGPXToGeoJSON()
		if err != nil {
			http.Error(w, "Error converting GPX to GeoJSON", http.StatusInternalServerError)
			return
		}

		geoJSONString, err := json.Marshal(geoJSON)
		if err != nil {
			http.Error(w, "Error marshaling GeoJSON", http.StatusInternalServerError)
			return
		}

		templates.Map("Place fell", string(geoJSONString)).Render(r.Context(), w)
	})

	http.ListenAndServe("localhost:3000", r)
}

func convertGPXToGeoJSON() (*geojson.FeatureCollection, error) {
	gpxDir := "./static/gpx/"
	files, err := ioutil.ReadDir(gpxDir)
	if err != nil {
		return nil, err
	}

	fc := geojson.NewFeatureCollection()

	for _, file := range files {
		if filepath.Ext(file.Name()) == ".gpx" {
			gpxFile, err := gpx.ParseFile(filepath.Join(gpxDir, file.Name()))
			if err != nil {
				return nil, err
			}

			for _, track := range gpxFile.Tracks {
				for _, segment := range track.Segments {
					var coordinates [][]float64
					for _, point := range segment.Points {
						coordinates = append(coordinates, []float64{point.Longitude, point.Latitude})
					}

					lineString := geojson.NewLineStringFeature(coordinates)
					lineString.SetProperty("name", track.Name)
					fc.AddFeature(lineString)
				}
			}
		}
	}

	return fc, nil
}
