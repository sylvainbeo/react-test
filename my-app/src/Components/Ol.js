import React from 'react';
import ol from 'openlayers';

//import * as h from '../helper';

class Ol extends React.Component {

    componentDidMount() {
        // Init OL
        console.log('Ol mounted', this.props.parentApi.data.center, this.props.parentApi.data.zoom);
        const center = this.props.parentApi.data.center;
        const zoom = this.props.parentApi.data.zoom;
        const OSMSource = this.props.source;

        console.log('------------');
        console.log(OSMSource);
        this.osmLayer = new ol.layer.Tile({
                    source: new ol.source.OSM({url: OSMSource})
                });
        this.map = new ol.Map({
            layers: [
                this.osmLayer
            ],
            target: 'map',
            controls: ol.control.defaults({
                attributionOptions: {
                    collapsible: false
                }
            }),
            view: new ol.View({
                center: ol.proj.transform(center, 'EPSG:4326', 'EPSG:3857'),
                zoom: zoom
            })
        });

        this.map.on('moveend', e => {
            let map = e.map;
            let center = map.getView().getCenter();
            let coords = ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326');
            let zoom = map.getView().getZoom();
            console.log(coords);
            coords = coords.map(function(each_element){
                return Number(each_element.toFixed(2));
            });
            console.log('ol is updating the center');
            this.props.parentApi.callbacks.updateCenter(coords);
            this.props.parentApi.callbacks.updateZoom(zoom);
        })

        // Load JSON layer
        this.loadStations();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Ol has been updated, update the map itself');
        let tabCoords = this.props.parentApi.data.center;
        let zoom = this.props.parentApi.data.zoom;

        // Convert strings to float
        let coords = ol.proj.transform([parseFloat(tabCoords[0]), parseFloat(tabCoords[1])], 'EPSG:4326', 'EPSG:3857');

        // TODO
        console.log(prevProps.parentApi.data.center);
        console.log(tabCoords);
        console.log(">>>> Updating map center");
        this.map.getView().setCenter(coords);

        this.osmLayer.setSource(new ol.source.OSM({url: this.props.source}));
        
        if(prevProps.parentApi.data.zoom !== zoom) {
            console.log(">>>> Updating map zoom");
            this.map.getView().setZoom(zoom);
        }
    }

    // That way we can share info beetween parent and child
    render() {
        console.log('Ol is rendering');
        return ( <div className="map" id="map"></div>);
    }

    loadStations() {
        /*
        // In prod, fetch a real URL
        fetch('../data/items.json', { credentials: 'same-origin' }).then(response => response.json()).then(json => {
                if (!json.done) {
                  return;
                }
        });
        */
        // In localhost :
        const data = require('../data/items.json');
        this.setState({
            items: data
        });
        console.log(data);
        var vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(data)
        });
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: styleFunction
        });
        var geojsonFormat = new ol.format.GeoJSON();
        vectorSource.clear(true);
        vectorSource.addFeatures(geojsonFormat.readFeatures(data));
        this.map.addLayer(vectorLayer);
    }
}

export default Ol;



/*
 * OL styles
 */

var image = new ol.style.Circle({
        radius: 5,
        fill: new ol.style.Fill({
          color: 'rgba(0, 0, 255, 0.3)'
        }),
        stroke: new ol.style.Stroke({color: 'rgba(0, 0, 255, 0.7)', width: 2})
      });

var styles = {
'Point': new ol.style.Style({
  image: image
}),
'LineString': new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'green',
    width: 1
  })
}),
'MultiLineString': new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'green',
    width: 1
  })
}),
'MultiPoint': new ol.style.Style({
  image: image
}),
'MultiPolygon': new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'yellow',
    width: 1
  }),
  fill: new ol.style.Fill({
    color: 'rgba(255, 255, 0, 0.1)'
  })
}),
'Polygon': new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'blue',
    lineDash: [4],
    width: 3
  }),
  fill: new ol.style.Fill({
    color: 'rgba(0, 0, 255, 0.1)'
  })
}),
'Circle': new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'red',
    width: 2
  }),
  fill: new ol.style.Fill({
    color: 'rgba(255,0,0,0.2)'
  })
})
};

var styleFunction = function(feature) {
    return styles[feature.getGeometry().getType()];
};
