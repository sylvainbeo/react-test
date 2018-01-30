import React from 'react';
import ReactDOM from 'react-dom';

import Ol from './Components/Ol';
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

    return (
        <div className="main">
            <div className="navbar">Navbar</div>

            <Ol center={this.state.centerMap} />

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
