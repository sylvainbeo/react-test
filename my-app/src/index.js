import React from 'react';
import ReactDOM from 'react-dom';

import Ol from './Components/Ol';
import Filters from './Components/Filters';

import config from './settings.js';
import '../node_modules/openlayers/dist/ol.css';
import './index.css';

/*
* Main component
*/
class Main extends React.Component {

 constructor(props) {
    super(props);
    this.title = "SocioEco"
    this.state = {
        title: "SocioEco",
        history: [{
            squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
        centerMap: [5, 45],
        zoomMap: 5,
    };
  }

  render() {
    config.DEBUG ? console.log('Main is rendering'): null;
    const updateCenter = center => {
      config.DEBUG ? console.log('updateCenter'): null;;
      this.setState({ centerMap: center });
    };
    const updateZoom = zoom => {
      config.DEBUG ? console.log('updateZoom'): null;;
      this.setState({ zoomMap: zoom });
    };

    const api = {
        data: {center: this.state.centerMap, zoom: this.state.zoomMap},
        callbacks: {updateZoom, updateCenter}
    };

    return (
        <div className="main">
            <div className="navbar">Navbar</div>
            <div className="map" >
                <Ol parentApi={api} />
                <Filters parentApi={api} />
            </div>
        </div>
    );
  }

}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
