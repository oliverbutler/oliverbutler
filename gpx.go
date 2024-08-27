package main

import (
	"encoding/xml"
	"math"
	"os"
)

type GPX struct {
	XMLName xml.Name `xml:"gpx"`
	Tracks  []Track  `xml:"trk"`
}

type Track struct {
	Name     string    `xml:"name"`
	Segments []Segment `xml:"trkseg"`
}

type Segment struct {
	Points []Point `xml:"trkpt"`
}

type Point struct {
	Latitude  float64 `xml:"lat,attr"`
	Longitude float64 `xml:"lon,attr"`
	Elevation float64 `xml:"ele"`
}

type TrackPoint struct {
	Latitude           float64 `json:"lat"`
	Longitude          float64 `json:"lon"`
	Elevation          float64 `json:"ele"`
	CumulativeDistance float64 `json:"cumDistance"`
}

func processGPXFile(filePath string) ([]TrackPoint, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	var gpx GPX
	err = xml.Unmarshal(data, &gpx)
	if err != nil {
		return nil, err
	}

	return processGPX(&gpx), nil
}

func processGPX(gpx *GPX) []TrackPoint {
	var trackPoints []TrackPoint
	cumulativeDistance := 0.0

	for _, track := range gpx.Tracks {
		for _, segment := range track.Segments {
			var prevPoint *Point
			for _, point := range segment.Points {
				if prevPoint != nil {
					distance := haversine(prevPoint.Latitude, prevPoint.Longitude, point.Latitude, point.Longitude)
					cumulativeDistance += distance
				}

				trackPoints = append(trackPoints, TrackPoint{
					Latitude:           point.Latitude,
					Longitude:          point.Longitude,
					Elevation:          point.Elevation,
					CumulativeDistance: cumulativeDistance,
				})

				prevPoint = &point
			}
		}
	}

	return trackPoints
}

func haversine(lat1, lon1, lat2, lon2 float64) float64 {
	const R = 6371 // Earth's radius in kilometers

	dLat := (lat2 - lat1) * math.Pi / 180
	dLon := (lon2 - lon1) * math.Pi / 180
	a := math.Sin(dLat/2)*math.Sin(dLat/2) +
		math.Cos(lat1*math.Pi/180)*math.Cos(lat2*math.Pi/180)*
			math.Sin(dLon/2)*math.Sin(dLon/2)
	c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))
	return R * c
}
