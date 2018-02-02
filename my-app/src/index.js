import React from 'react';
import ReactDOM from 'react-dom';

import Ol from './Components/Ol';
import Filters from './Components/Filters';
import '../node_modules/openlayers/dist/ol.css';
import './index.css';

/*
* Main component
*/
class Main extends React.Component {

 constructor(props) {
    super(props);
    this.title = "Kouac"
    this.state = {
        title: "Board game",
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
    console.log('Main is rendering');
    const updateCenter = center => {
      console.log('updateCenter');
      this.setState({ centerMap: center });
    };
    const updateZoom = zoom => {
      console.log('updateZoom');
      this.setState({ zoomMap: zoom });
    };

    return (
        <div className="main">
            <div className="navbar">Navbar</div>
            <div className="map" >
                <Ol center={this.state.centerMap} zoom={this.state.zoomMap} updateCenter={updateCenter} updateZoom={updateZoom} />
                <Filters center={this.state.centerMap} zoom={this.state.zoomMap} updateCenter={updateCenter} updateZoom={updateZoom} />
            </div>
            <div className="widget">
            </div>
        </div>
    );
  }

}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
