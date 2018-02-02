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
        centerMap: [45, 5],
    };
  }

  render() {
    console.log('Main is rendering');
    const updateCenter = center => {
      console.log('updateCenter');
      this.setState({ centerMap: center });
    };

    return (
        <div className="main">
            <div className="navbar">Navbar</div>
            <div className="map" >
                <Ol center={this.state.centerMap} updateCenter={updateCenter} />
                <Filters center={this.state.centerMap} updateCenter={updateCenter} />
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
