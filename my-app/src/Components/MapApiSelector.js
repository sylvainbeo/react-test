import React from 'react';

//import * as h from '../helper';

class MapApiSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            api: props.parentApi.data.api
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('MapApiSelector will receive new props', nextProps);
        this.setState({
            api: nextProps.parentApi.data.api
        });
    }

    render() {
        console.log('MapApiSelector is rendering');

        const onMapApiChanged = (e) => this.props.parentApi.callbacks.updateApi(e.currentTarget.value );

        return (
            <div className="mapApiSelector">
                <input type="radio" name="ol"
                               value="ol"
                               checked={this.state.api === "ol"}
                               onChange={onMapApiChanged} />OpenLayers
                <input type="radio" name="ol-dark"
                               value="ol-dark"
                               checked={this.state.api === "ol-dark"}
                               onChange={onMapApiChanged} />OpenLayers dark
                <input type="radio" name="itowns"
                               value="itowns"
                               checked={this.state.api === "itowns"}
                               onChange={onMapApiChanged} />itowns
            </div>
        );
    }
}

export default MapApiSelector;
