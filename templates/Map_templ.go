// Code generated by templ - DO NOT EDIT.

// templ: version: v0.2.663
package templates

//lint:file-ignore SA4006 This context is only used if a nested component is present.

import "github.com/a-h/templ"
import "context"
import "io"
import "bytes"

func Map(title string, geoJSONData string) templ.Component {
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
		templ_7745c5c3_Err = templ.JSONScript("jsonData", geoJSONData).Render(ctx, templ_7745c5c3_Buffer)
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
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\"><script src=\"https://api.mapbox.com/mapbox-gl-js/v3.5.2/mapbox-gl.js\"></script><link href=\"https://api.mapbox.com/mapbox-gl-js/v3.5.2/mapbox-gl.css\" rel=\"stylesheet\"><script src=\"https://cdn.jsdelivr.net/npm/chart.js\"></script><style>\n    body {\n      margin: 0;\n      padding: 0;\n    }\n\n    #map {\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      width: 100%;\n    }\n\n    #layer-switcher {\n      position: absolute;\n      top: 10px;\n      left: 10px;\n      z-index: 1;\n      background: white;\n      padding: 10px;\n      border-radius: 3px;\n    }\n\n    #elevation-graph {\n      position: absolute;\n      bottom: 10px;\n      left: 10px;\n      right: 10px;\n      z-index: 1;\n      background: rgba(255, 255, 255, 0.8);\n      padding: 10px;\n      border-radius: 3px;\n      height: 200px;\n    }\n  </style></head><body><div id=\"map\"></div><div id=\"layer-switcher\"><button id=\"map-button\">Map</button> <button id=\"satellite-button\">Satellite</button></div><div id=\"elevation-graph\"><canvas id=\"elevation-chart\"></canvas></div><script>\n\n\n    const geoJSONData = JSON.parse(JSON.parse(document.getElementById('jsonData').textContent))\n    mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpdmVyYnV0bGVyIiwiYSI6ImNsZ3NpZmlvazAxb2Mzc281dXJvb20weGgifQ.yov1u2Efo_v7ImCH2o9pGg';\n\n    const map = new mapboxgl.Map({\n      container: 'map',\n      style: 'mapbox://styles/oliverbutler/cllz4ea1c00n701pbbqah10qo',\n      center: [-2.9263, 54.5441],\n      zoom: 12\n    });\n\n    map.on('load', () => {\n      map.addSource('gpx-tracks', {\n        type: 'geojson',\n        data: geoJSONData\n      });\n\n      map.addLayer({\n        id: 'gpx-tracks',\n        type: 'line',\n        source: 'gpx-tracks',\n        layout: {\n          'line-join': 'round',\n          'line-cap': 'round'\n        },\n        paint: {\n          'line-color': '#ff0000',\n          'line-width': 3\n        }\n      });\n\n      // Add start and end markers\n      const coordinates = geoJSONData.features[0].geometry.coordinates;\n      const start = coordinates[0];\n      const end = coordinates[coordinates.length - 1];\n\n      new mapboxgl.Marker({color: '#008000'})\n        .setLngLat(start)\n        .addTo(map);\n\n      new mapboxgl.Marker({color: '#FF0000'})\n        .setLngLat(end)\n        .addTo(map);\n\n      // Fit the map to the bounds of the GeoJSON data\n      const bounds = new mapboxgl.LngLatBounds();\n      geoJSONData.features.forEach((feature) => {\n        if (feature.geometry.type === 'LineString') {\n          feature.geometry.coordinates.forEach((coord) => {\n            bounds.extend(coord);\n          });\n        }\n      });\n      map.fitBounds(bounds, {padding: 50});\n\n      // Layer switcher functionality\n      document.getElementById('map-button').addEventListener('click', () => {\n        map.setStyle('mapbox://styles/oliverbutler/cllz4ea1c00n701pbbqah10qo');\n      });\n\n      document.getElementById('satellite-button').addEventListener('click', () => {\n        map.setStyle('mapbox://styles/mapbox/satellite-v9');\n      });\n\n      map.on('style.load', () => {\n        // Re-add the GPX track layer after style change\n        map.addSource('gpx-tracks', {\n          type: 'geojson',\n          data: geoJSONData\n        });\n\n        map.addLayer({\n          id: 'gpx-tracks',\n          type: 'line',\n          source: 'gpx-tracks',\n          layout: {\n            'line-join': 'round',\n            'line-cap': 'round'\n          },\n          paint: {\n            'line-color': '#ff0000',\n            'line-width': 3\n          }\n        });\n      });\n\n      const elevationData = coordinates.map((coord, index) => {\n\n\n        return {\n          distance: index,\n          elevation: coord[2],\n\n        }\n      });\n\n\n      // Create elevation chart\n      const ctx = document.getElementById('elevation-chart').getContext('2d');\n      new Chart(ctx, {\n        type: 'line',\n        data: {\n          labels: elevationData.map(d => d.distance.toFixed(0)),\n          datasets: [{\n            label: 'Elevation',\n            data: elevationData.map(d => d.elevation),\n            borderColor: 'rgb(75, 192, 192)',\n            tension: 0.1\n          }]\n        },\n        options: {\n          responsive: true,\n          maintainAspectRatio: false,\n          scales: {\n            x: {\n              title: {\n                display: true,\n                text: 'Distance (m)'\n              }\n            },\n            y: {\n              title: {\n                display: true,\n                text: 'Elevation (m)'\n              }\n            }\n          }\n        }\n      });\n    });\n  </script></body></html>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		if !templ_7745c5c3_IsBuffer {
			_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteTo(templ_7745c5c3_W)
		}
		return templ_7745c5c3_Err
	})
}
