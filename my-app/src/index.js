import React from 'react';
import ReactDOM from 'react-dom';

import Ol from './Components/Ol';
import Itowns from './Components/Itowns';
import Filters from './Components/Filters';
import MapApiSelector from './Components/MapApiSelector';

//import * as h from './helper';

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
        mapApi: "ol",
    };
  }

  render() {
    console.log('Main is rendering');
    const updateCenter = center => {
      console.log('updateCenter');
      this.setState({ centerMap: center });
    };
    const updateZoom = zoom => {
      console.log('updateZoom');
      this.setState({ zoomMap: zoom });
    };
    const updateApi = api => {
      console.log('updateApi : ', api);
      this.setState({ mapApi: api });
    };

    const api = {
        data: {center: this.state.centerMap, zoom: this.state.zoomMap, api: this.state.mapApi},
        callbacks: {updateZoom, updateCenter, updateApi}
    };

    let chosenMapApi = null;
    if (this.state.mapApi === "ol") {
      chosenMapApi = <Ol parentApi={api} />;
    } else {
      chosenMapApi = <Itowns parentApi={api} />;
    }

    return (
        <div className="main">
            <div className="navbar">
                <MapApiSelector parentApi={api} />
            </div>
            <div className="map" >
                {/*<Ol parentApi={api} />*/}
                {chosenMapApi}

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
