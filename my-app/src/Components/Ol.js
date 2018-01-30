import React from 'react';
import ol from 'openlayers';

import Filters from './Filters';

class Ol extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            center: this.props.center
        };
        this.centerMap = this.centerMap.bind(this);
        this.centerHandler = this.centerHandler.bind(this);

    }
    componentDidMount() {
        // Init OL
        //console.log(this.props);
        this.loadStations();

        this.map = new ol.Map({
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                target: 'map',
                controls: ol.control.defaults({
                    attributionOptions: {
                        collapsible: false
                    }
                }),
                view: new ol.View({
                center: this.props.center, //[0, 0],
                zoom: 2
            })
        });

        this.map.on('moveend', e => {
            let map = e.map;
            let center = map.getView().getCenter();
            let coords = ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326');
            coords = coords.map(function(each_element){
                return Number(each_element.toFixed(2));
            });
            this.setState({center: coords});
        })
        /*this.map.on('moveend', function (e) {
            //let map = e.map;
            //let center = map.getView().getCenter();
            //this.setState({center: center});
            // TODO
        });
        */
    }

    // This method will be sent to the child component
    centerHandler(center) {
        this.setState({
            center: center
        });
    }
    loadStations() {
        /*
        fetch("data/items.json")
            .then(
                res => res.json()
            )
            .then(
                (data) => {
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
                },
                (error) => {
                    this.setState({
                        error
                    });
                    console.log(error);
                }
            )
        */
    }


    centerMap(center) {
        let tabCoords = center;

        // Convert strings to float
        let coords = ol.proj.transform([parseFloat(tabCoords[0]), parseFloat(tabCoords[1])], 'EPSG:4326', 'EPSG:3857');

        this.map.getView().setCenter(coords);
        this.map.getView().setZoom(10);
    }

    // TODO make filters as a child of Ol
    // That way we can share info beetween parent and child
    render() {
        return (
            <div className="map" >
                <div className="map" id="map"></div>
                <Filters centerMap={this.centerMap} center={this.state.center} action={this.centerHandler} />
            </div>
        );
    }
}

export default Ol;



var image = new ol.style.Circle({
        radius: 5,
        fill: null,
        stroke: new ol.style.Stroke({color: 'red', width: 1})
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
'GeometryCollection': new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'magenta',
    width: 2
  }),
  fill: new ol.style.Fill({
    color: 'magenta'
  }),
  image: new ol.style.Circle({
    radius: 10,
    fill: null,
    stroke: new ol.style.Stroke({
      color: 'magenta'
    })
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
