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

type ProcessedGPX struct {
	HighResolution []TrackPoint
	LowResolution  []TrackPoint
}

func processGPXFile(filePath string) (*ProcessedGPX, error) {
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

func processGPX(gpx *GPX) *ProcessedGPX {
	var highResTrackPoints []TrackPoint
	cumulativeDistance := 0.0

	for _, track := range gpx.Tracks {
		for _, segment := range track.Segments {
			var prevPoint *Point
			for _, point := range segment.Points {
				if prevPoint != nil {
					distance := haversine(prevPoint.Latitude, prevPoint.Longitude, point.Latitude, point.Longitude)
					cumulativeDistance += distance
				}

				highResTrackPoints = append(highResTrackPoints, TrackPoint{
					Latitude:           point.Latitude,
					Longitude:          point.Longitude,
					Elevation:          point.Elevation,
					CumulativeDistance: cumulativeDistance,
				})

				prevPoint = &point
			}
		}
	}

	lowResTrackPoints := simplifyTrack(highResTrackPoints, 0.00005) // Adjust the epsilon value as needed

	return &ProcessedGPX{
		HighResolution: highResTrackPoints,
		LowResolution:  lowResTrackPoints,
	}
}

func simplifyTrack(points []TrackPoint, epsilon float64) []TrackPoint {
	if len(points) <= 2 {
		return points
	}

	// Find the point with the maximum distance
	dmax := 0.0
	index := 0
	for i := 1; i < len(points)-1; i++ {
		d := pointLineDistance(points[i], points[0], points[len(points)-1])
		if d > dmax {
			index = i
			dmax = d
		}
	}

	// If max distance is greater than epsilon, recursively simplify
	if dmax > epsilon {
		// Recursive call
		recResults1 := simplifyTrack(points[:index+1], epsilon)
		recResults2 := simplifyTrack(points[index:], epsilon)

		// Build the result list
		result := append(recResults1[:len(recResults1)-1], recResults2...)
		return result
	} else {
		return []TrackPoint{points[0], points[len(points)-1]}
	}
}

func pointLineDistance(p, start, end TrackPoint) float64 {
	if start == end {
		return haversine(p.Latitude, p.Longitude, start.Latitude, start.Longitude)
	}

	n := math.Abs((end.Longitude-start.Longitude)*p.Latitude - (end.Latitude-start.Latitude)*p.Longitude + end.Latitude*start.Longitude - end.Longitude*start.Latitude)
	d := math.Sqrt(math.Pow(end.Longitude-start.Longitude, 2) + math.Pow(end.Latitude-start.Latitude, 2))

	return n / d
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
