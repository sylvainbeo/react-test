import React from 'react';
import ReactDOM from 'react-dom';

import Ol from './Components/Ol';
import '../node_modules/openlayers/dist/ol.css';
import './index.css';

/*
* Main component
*/
class SocioEco extends React.Component {

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

    return (
        <div className="socioeco">
            <div className="navbar">Navbar</div>

            <Ol center={this.state.centerMap} />

            <div className="widget">
            </div>
        </div>
    );
  }

}

// TODO comment appeler une fonction d'un component qui n'est ni le parent, ni le fils

ReactDOM.render(
  <SocioEco />,
  document.getElementById('root')
);
