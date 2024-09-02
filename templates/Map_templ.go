// Code generated by templ - DO NOT EDIT.

// templ: version: v0.2.663
package templates

//lint:file-ignore SA4006 This context is only used if a nested component is present.

import "github.com/a-h/templ"
import "context"
import "io"
import "bytes"

func Map(title string, tripsData string) templ.Component {
	return templ.ComponentFunc(func(ctx context.Context, templ_7745c5c3_W io.Writer) (templ_7745c5c3_Err error) {
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templ_7745c5c3_W.(*bytes.Buffer)
		if !templ_7745c5c3_IsBuffer {
			templ_7745c5c3_Buffer = templ.GetBuffer()
			defer templ.ReleaseBuffer(templ_7745c5c3_Buffer)
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var1 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var1 == nil {
			templ_7745c5c3_Var1 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		templ_7745c5c3_Err = templ.JSONScript("jsonData", tripsData).Render(ctx, templ_7745c5c3_Buffer)
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("<html><head><meta charset=\"utf-8\"><title>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		var templ_7745c5c3_Var2 string
		templ_7745c5c3_Var2, templ_7745c5c3_Err = templ.JoinStringErrs(title)
		if templ_7745c5c3_Err != nil {
			return templ.Error{Err: templ_7745c5c3_Err, FileName: `templates/Map.templ`, Line: 8, Col: 17}
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString(templ.EscapeString(templ_7745c5c3_Var2))
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\"><script src=\"https://api.mapbox.com/mapbox-gl-js/v3.5.2/mapbox-gl.js\"></script><link href=\"https://api.mapbox.com/mapbox-gl-js/v3.5.2/mapbox-gl.css\" rel=\"stylesheet\"><script src=\"https://cdn.jsdelivr.net/npm/chart.js\"></script><style>\n    body {\n      margin: 0;\n      padding: 0;\n    }\n\n    #map {\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      width: 100%;\n    }\n\n    #layer-switcher {\n      position: absolute;\n      top: 10px;\n      left: 10px;\n      background: white;\n      padding: 10px;\n      border-radius: 3px;\n    }\n\n    #trip-selector {\n      position: absolute;\n      top: 10px;\n      right: 10px;\n      background: white;\n      padding: 10px;\n      border-radius: 3px;\n    }\n\n    #elevation-graph {\n      position: absolute;\n      bottom: 10px;\n      left: 10px;\n      right: 10px;\n      background: rgba(255, 255, 255, 0.8);\n      padding: 10px;\n      border-radius: 3px;\n      height: 200px;\n    }\n  </style></head><body><div id=\"map\"></div><div id=\"layer-switcher\"><button id=\"map-button\">Map</button> <button id=\"satellite-button\">Satellite</button></div><div id=\"trip-selector\"><select id=\"trip-select\"></select></div><div id=\"elevation-graph\"><canvas id=\"elevation-chart\"></canvas></div><script>\n\n    const trips = JSON.parse(JSON.parse(document.getElementById('jsonData').textContent));\n    let currentTripIndex = 0;\n    let currentTrip = trips[currentTripIndex];\n    let map, elevationChart;\n\n    mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpdmVyYnV0bGVyIiwiYSI6ImNsZ3NpZmlvazAxb2Mzc281dXJvb20weGgifQ.yov1u2Efo_v7ImCH2o9pGg';\n\n    let markers = [];\n\n    const trailColors = [\n      '#8B0000', // Dark red\n      '#B22222', // Firebrick\n      '#DC143C', // Crimson\n      '#FF0000', // Red\n      '#FF4500', // OrangeRed\n      '#FF6347', // Tomato\n      '#FFD700', // Gold\n      '#FFA500', // Orange\n      '#FF8C00', // DarkOrange\n      '#DAA520'  // GoldenRod\n    ];\n\n    mapboxgl.config.ENABLE_EVENT_LOGGING = false;\n\n    map = new mapboxgl.Map({\n      container: 'map',\n      style: 'mapbox://styles/oliverbutler/cllz4ea1c00n701pbbqah10qo',\n      center: [-2.9263, 54.5441],\n      zoom: 12,\n      pitch: 60,\n      bearing: 30,\n      trackUserLocation: false,\n      collectResourceTiming: false\n    });\n\n    function initializeTripSelector() {\n      const select = document.getElementById('trip-select');\n      trips.forEach((trip, index) => {\n        const option = document.createElement('option');\n        option.value = index;\n        option.textContent = trip.name;\n        select.appendChild(option);\n      });\n      select.addEventListener('change', (e) => {\n        currentTripIndex = parseInt(e.target.value);\n        currentTrip = trips[currentTripIndex];\n        updateMap();\n        updateElevationChart();\n      });\n    }\n\n\n    function getMostProminentTrip() {\n      const bounds = map.getBounds();\n      const visibleTrips = trips.map((trip, index) => {\n        let visiblePoints = 0;\n        trip.events.forEach(event => {\n          if (event.type === \"hike\") {\n            event.trackPointsLowRes.forEach(point => {\n              if (bounds.contains([point.lon, point.lat])) {\n                visiblePoints++;\n              }\n            });\n          }\n        });\n        return {index, visiblePoints};\n      });\n\n      visibleTrips.sort((a, b) => b.visiblePoints - a.visiblePoints);\n      return visibleTrips[0].index;\n    }\n\n\n    function updateCurrentTrip() {\n      const newTripIndex = getMostProminentTrip();\n      if (newTripIndex !== currentTripIndex) {\n        currentTripIndex = newTripIndex;\n        currentTrip = trips[currentTripIndex];\n        document.getElementById('trip-select').value = currentTripIndex;\n        updateMap(false);\n        updateElevationChart();\n      }\n    }\n\n    function updateMap(fitBounds = true) {\n      // Clear existing layers and sources\n      for (let i = 0; i < trips.length; i++) {\n        if (map.getLayer(`hike-tracks-${i}`)) map.removeLayer(`hike-tracks-${i}`);\n        if (map.getSource(`hike-tracks-${i}`)) map.removeSource(`hike-tracks-${i}`);\n      }\n      if (map.getLayer('camp-locations')) map.removeLayer('camp-locations');\n      if (map.getSource('camp-locations')) map.removeSource('camp-locations');\n\n      // Remove existing markers\n      markers.forEach(marker => marker.remove());\n      markers = [];\n\n      // Add all hike tracks\n      trips.forEach((trip, tripIndex) => {\n        const hikeFeatures = trip.events\n          .filter(event => event.type === \"hike\")\n          .map(hike => {\n            const isCurrentTrip = tripIndex === currentTripIndex;\n            const trackPoints = isCurrentTrip ? hike.trackPoints : hike.trackPointsLowRes;\n\n            return {\n              type: 'Feature',\n              properties: {},\n              geometry: {\n                type: 'LineString',\n                coordinates: trackPoints.map(point => [point.lon, point.lat, point.ele])\n              }\n            }\n          });\n\n        map.addSource(`hike-tracks-${tripIndex}`, {\n          type: 'geojson',\n          data: {\n            type: 'FeatureCollection',\n            features: hikeFeatures\n          }\n        });\n\n        map.addLayer({\n          id: `hike-tracks-${tripIndex}`,\n          type: 'line',\n          source: `hike-tracks-${tripIndex}`,\n          layout: {\n            'line-join': 'round',\n            'line-cap': 'round'\n          },\n          paint: {\n            'line-color': trailColors[tripIndex % trailColors.length],\n            'line-width': tripIndex === currentTripIndex ? 3 : 2,\n            'line-opacity': tripIndex === currentTripIndex ? 1 : 0.7\n          }\n        });\n      });\n\n      // Add all camp locations\n      const allCampFeatures = trips.flatMap((trip, tripIndex) =>\n        trip.events\n          .filter(event => event.type === \"camp\")\n          .map(camp => ({\n            type: 'Feature',\n            properties: {name: camp.name, tripIndex: tripIndex},\n            geometry: {\n              type: 'Point',\n              coordinates: [camp.lon, camp.lat]\n            }\n          }))\n      );\n\n      map.addSource('camp-locations', {\n        type: 'geojson',\n        data: {\n          type: 'FeatureCollection',\n          features: allCampFeatures\n        }\n      });\n\n      map.addLayer({\n        id: 'camp-locations',\n        type: 'circle',\n        source: 'camp-locations',\n        paint: {\n          'circle-radius': 6,\n          'circle-color': '#4CAF50'\n        }\n      });\n\n      if (fitBounds) {\n        // Fit map to bounds of current trip\n        const bounds = new mapboxgl.LngLatBounds();\n        currentTrip.events.forEach(event => {\n          if (event.type === \"hike\") {\n            event.trackPointsLowRes.forEach(point => {\n              bounds.extend([point.lon, point.lat]);\n            });\n          } else if (event.type === \"camp\") {\n            bounds.extend([event.lon, event.lat]);\n          }\n        });\n\n        map.fitBounds(bounds, {\n          padding: 50,\n          pitch: 60,\n          bearing: 30,\n          duration: 2000\n        });\n      }\n\n      // Add markers for current trip\n      const start = currentTrip.events.find(event => event.type === \"hike\").trackPoints[0];\n      markers.push(new mapboxgl.Marker({color: '#008000'})\n        .setLngLat([start.lon, start.lat])\n        .addTo(map));\n\n      const lastHike = currentTrip.events.filter(event => event.type === \"hike\").pop();\n      const end = lastHike.trackPoints[lastHike.trackPoints.length - 1];\n      markers.push(new mapboxgl.Marker({color: '#FF0000'})\n        .setLngLat([end.lon, end.lat])\n        .addTo(map));\n\n      // Add markers for all camps\n      allCampFeatures.forEach(camp => {\n        const marker = new mapboxgl.Marker({color: '#0000FF'})\n          .setLngLat(camp.geometry.coordinates)\n          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${camp.properties.name}</h3>`))\n          .addTo(map);\n\n        marker.getElement().addEventListener('click', () => {\n          currentTripIndex = camp.properties.tripIndex;\n          currentTrip = trips[currentTripIndex];\n          document.getElementById('trip-select').value = currentTripIndex;\n          updateMap();\n          updateElevationChart();\n        });\n\n        markers.push(marker);\n      });\n    }\n\n    function updateElevationChart() {\n      const ctx = document.getElementById('elevation-chart').getContext('2d');\n\n      let allPoints = [];\n      let cumulativeDistance = 0;\n\n      currentTrip.events.forEach((event, index) => {\n        if (event.type === \"hike\") {\n          event.trackPointsLowRes.forEach((point, i) => {\n            const prevPoint = i > 0 ? event.trackPointsLowRes[i - 1] : null;\n            let grade = 0;\n            if (prevPoint) {\n              const elevationChange = point.ele - prevPoint.ele; // in meters\n              const distance = (point.cumDistance - prevPoint.cumDistance) * 1000; // convert km to meters\n              grade = distance > 0 ? elevationChange / distance : 0;\n            }\n            allPoints.push({\n              x: cumulativeDistance + point.cumDistance,\n              y: point.ele,\n              lon: point.lon,\n              lat: point.lat,\n              grade: grade\n            });\n          });\n          cumulativeDistance += event.trackPoints[event.trackPoints.length - 1].cumDistance;\n        } else if (event.type === \"camp\") {\n          allPoints.push({\n            x: cumulativeDistance,\n            y: event.alt,\n            lon: event.lon,\n            lat: event.lat,\n            isCamp: true,\n            name: event.name,\n            grade: 0\n          });\n        }\n      });\n\n      const maxDistance = Math.ceil(cumulativeDistance);\n      const labels = Array.from({length: maxDistance + 1}, (_, i) => i);\n\n      if (elevationChart) {\n        elevationChart.destroy();\n      }\n\n      const GRADE_STEEP = 0.10;\n      const GRADE_MODERATE = 0.05;\n\n      elevationChart = new Chart(ctx, {\n        type: 'line',\n        data: {\n          labels: labels,\n          datasets: [\n            {\n              label: 'Grade - Steep',\n              data: allPoints.map(point => ({x: point.x, y: point.grade > GRADE_STEEP ? point.y : null})),\n              backgroundColor: 'rgba(255, 0, 0, 0.3)',\n              borderWidth: 0,\n              fill: true,\n              tension: 0,\n              pointRadius: 0\n            },\n            {\n              label: 'Grade - Moderate',\n              data: allPoints.map(point => ({x: point.x, y: point.grade > GRADE_MODERATE && point.grade <= GRADE_STEEP ? point.y : null})),\n              backgroundColor: 'rgba(255, 255, 0, 0.3)',\n              borderWidth: 0,\n              fill: true,\n              tension: 0,\n              pointRadius: 0\n            },\n            {\n              label: 'Elevation',\n              data: allPoints.map(point => ({x: point.x, y: point.y})),\n              borderColor: 'rgba(0, 0, 0, 0.5)',\n              borderWidth: 2,\n              fill: false,\n              tension: 0.1,\n              pointRadius: 0\n            },\n            {\n              label: 'Camps',\n              data: allPoints.filter(point => point.isCamp).map(point => ({x: point.x, y: point.y})),\n              backgroundColor: '#4CAF50',\n              borderColor: '#4CAF50',\n              borderWidth: 2,\n              pointRadius: 5,\n              type: 'scatter'\n            }\n          ]\n        },\n        options: {\n          responsive: true,\n          maintainAspectRatio: false,\n          scales: {\n            x: {\n              type: 'linear',\n              title: {\n                display: true,\n                text: 'Distance (km)'\n              },\n              ticks: {\n                stepSize: 1,\n                callback: function (value, index, values) {\n                  return value.toFixed(0);\n                }\n              },\n              min: 0,\n              max: maxDistance\n            },\n            y: {\n              title: {\n                display: true,\n                text: 'Elevation (m)'\n              }\n            }\n          },\n          plugins: {\n            tooltip: {\n              callbacks: {\n                title: function (context) {\n                  const point = allPoints[context[0].dataIndex];\n                  if (point.isCamp) {\n                    return `Camp: ${point.name}`;\n                  }\n                  return `Distance: ${point.x.toFixed(2)} km`;\n                },\n                label: function (context) {\n                  const point = allPoints[context.dataIndex];\n                  let label = `Elevation: ${point.y.toFixed(0)} m`;\n                  if (!point.isCamp) {\n                    label += `\\nGrade: ${(point.grade * 100).toFixed(1)}%`;\n                  }\n                  return label;\n                }\n              }\n            },\n            legend: {\n              display: false\n            }\n          },\n          onClick: (event, elements) => {\n            if (elements.length > 0) {\n              const index = elements[0].index;\n              const point = allPoints[index];\n              map.flyTo({\n                center: [point.lon, point.lat],\n                zoom: 14,\n                pitch: 60,\n                bearing: 30,\n                duration: 1000\n              });\n            }\n          }\n        }\n      });\n    }\n\n    map.on('load', () => {\n      initializeTripSelector();\n      updateMap();\n      updateElevationChart();\n\n      // Layer switcher functionality\n      document.getElementById('map-button').addEventListener('click', () => {\n        map.setStyle('mapbox://styles/oliverbutler/cllz4ea1c00n701pbbqah10qo');\n      });\n\n      document.getElementById('satellite-button').addEventListener('click', () => {\n        map.setStyle('mapbox://styles/oliverbutler/cm0cp3xo200tc01qt51wieggw');\n      });\n\n      map.on('style.load', () => {\n        updateMap();\n      });\n    });\n\n\n    map.on('moveend', updateCurrentTrip);\n\n    // Add keyboard navigation\n    document.addEventListener('keydown', (e) => {\n      if (e.key === 'h') {\n        currentTripIndex = (currentTripIndex - 1 + trips.length) % trips.length;\n      } else if (e.key === 'l') {\n        currentTripIndex = (currentTripIndex + 1) % trips.length;\n      } else if (e.key === 'n') {\n        map.easeTo({bearing: 0});\n      } else if (e.key === 's') {\n        document.getElementById('satellite-button').click();\n      } else if (e.key === 'm') {\n        document.getElementById('map-button').click();\n      } else if (e.key === \"c\") {\n        // copy current lat/lon under cursor to clipboard, in the yaml format\n        const lat = map.getCenter().lat;\n        const lon = map.getCenter().lng;\n        const ele = map.queryRenderedFeatures({layers: ['hike-tracks-0']})[0].properties.ele;\n        const yaml = `  lat: ${lat}\\n  lon: ${lon}\\n  ele: ${ele}`;\n        navigator.clipboard.writeText(yaml);\n      } else {\n        return;\n      }\n      currentTrip = trips[currentTripIndex];\n      document.getElementById('trip-select').value = currentTripIndex;\n      updateMap();\n      updateElevationChart();\n    });\n  </script></body></html>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		if !templ_7745c5c3_IsBuffer {
			_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteTo(templ_7745c5c3_W)
		}
		return templ_7745c5c3_Err
	})
}
