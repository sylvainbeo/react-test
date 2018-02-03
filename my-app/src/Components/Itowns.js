import React from 'react';
import * as itowns from 'itowns';
import * as THREE from 'three';
import proj4 from 'proj4';

import * as h from '../helper';

class Itowns extends React.Component {

    componentDidMount() {
        // Init OL
        console.log('Itowns mounted', this.props.parentApi.data.center, this.props.parentApi.data.zoom);

        const center = this.props.parentApi.data.center;
        const zoom = this.props.parentApi.data.zoom;

        var renderer; var exports = {};
        //var proj4 = itowns.proj4;

        var extent;
        var viewerDiv;
        var view;

        // Define projection that we will use (taken from https://epsg.io/3946, Proj4js section)
        proj4.defs('EPSG:3946',
            '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

        // Define geographic extent: CRS, min/max X, min/max Y
        extent = new itowns.Extent(
            'EPSG:3946',
            1837816.94334, 1847692.32501,
            5170036.4587, 5178412.82698);

        // `viewerDiv` will contain iTowns' rendering area (`<canvas>`)
        viewerDiv = document.getElementById('map');

        // Instanciate PlanarView*
        view = new itowns.PlanarView(viewerDiv, extent, { renderer: renderer });
        view.tileLayer.disableSkirt = true;

        // Add an WMS imagery layer (see WMS_Provider* for valid options)
        view.addLayer({
            url: 'https://download.data.grandlyon.com/wms/grandlyon',
            networkOptions: { crossOrigin: 'anonymous' },
            type: 'color',
            protocol: 'wms',
            version: '1.3.0',
            id: 'wms_imagery',
            name: 'Ortho2009_vue_ensemble_16cm_CC46',
            projection: 'EPSG:3946',
            options: {
                mimetype: 'image/jpeg',
            },
            updateStrategy: {
                type: itowns.STRATEGY_DICHOTOMY,
                options: {},
            },
        });

        // Add an WMS elevation layer (see WMS_Provider* for valid options)
        view.addLayer({
            url: 'https://download.data.grandlyon.com/wms/grandlyon',
            type: 'elevation',
            protocol: 'wms',
            networkOptions: { crossOrigin: 'anonymous' },
            id: 'wms_elevation',
            name: 'MNT2012_Altitude_10m_CC46',
            projection: 'EPSG:3946',
            heightMapWidth: 256,
            options: {
                mimetype: 'image/jpeg',
            },
        });
        // Since the elevation layer use color textures, specify min/max z
        view.tileLayer.materialOptions = {
            useColorTextureElevation: true,
            colorTextureElevationMinZ: 37,
            colorTextureElevationMaxZ: 240,
        };

        view.camera.setPosition(new itowns.Coordinates('EPSG:3946', extent.west(), extent.south(), 2000));
        // Then look at extent's center
        view.camera.camera3D.lookAt(extent.center().xyz());

        // instanciate controls
        // eslint-disable-next-line no-new
        new itowns.PlanarControls(view, {});

        // Request redraw
        view.notifyChange(true);

        exports.view = view;
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Ol has been updated, update the map itself');
        let tabCoords = this.props.parentApi.data.center;
        let zoom = this.props.parentApi.data.zoom;

        // Convert strings to float
        //let coords = ol.proj.transform([parseFloat(tabCoords[0]), parseFloat(tabCoords[1])], 'EPSG:4326', 'EPSG:3857');

        // TODO
        console.log(prevProps.parentApi.data.center);
        console.log(tabCoords);
        console.log(">>>> Updating map center");
        //this.map.getView().setCenter(coords);

        if(prevProps.parentApi.data.zoom !== zoom) {
            console.log(">>>> Updating map zoom");
            //this.map.getView().setZoom(zoom);
        }
    }

    // That way we can share info beetween parent and child
    render() {
        console.log('Itowns is rendering');
        return ( <div className="map" id="map"></div>);
    }

}

export default Itowns;
