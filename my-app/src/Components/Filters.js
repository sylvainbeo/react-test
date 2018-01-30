import React from 'react';

class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {coords: '45,3'};

        this.handleChange = this.handleChange.bind(this);
        this.centerMap = this.centerMap.bind(this);
    }

    centerMap(center) {
        //this.props.centerMap(this.state.coords);
		this.props.centerMap(this.props.center);
    }

    handleChange(event) {
        //this.setState({coords: event.target.value});
		// Update parent state
		this.props.action(event.target.value.split(","));
    }

    render() {
        return (
            <div className="filters">
                <input type="button" id="filter1" value="Center map" onClick={this.centerMap} />
                {/* <input type="button" id="filter2" value="Goto 0,0" onClick={()=>this.centerMap([0,0])}/> */}
                {/* <input type="text" value={this.state.coords} onChange={this.handleChange}/> */}
				<input type="text" value={this.props.center} onChange={this.handleChange}/>
            </div>
        );
    }
}

export default Filters;
