import React from 'react';

class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            centerText: props.center.join(','),
            zoom: props.zoom,
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('Filter will receive new props', nextProps);
        this.setState({
                centerText: nextProps.center.join(',') ,
                zoom: nextProps.zoom
        });
    }

    render() {
        console.log('Filters is rendering');

        const handleChange = (e) => this.props.updateCenter(this.state.centerText.split(',') );

        const handleTextChange = (e) => this.setState({ centerText: e.target.value });

        const handleButtonZoom = (e) => this.props.updateZoom(this.state.zoom );

        const handleZoomChange = (e) => this.setState({ zoom: e.target.value });

        return (
            <div className="filters">
                <input type="button" id="filter1" value="Center map" onClick={handleChange} />
                <input type="button" id="filter2" value="Goto 0,0" onClick={()=>this.props.updateCenter([0,0])}/>
                <input type="text" value={this.state.centerText} onChange={handleTextChange}/>
                <br/>
                <input type="button" id="filter3" value="Zoom to" onClick={handleButtonZoom} />
                <input type="text" value={this.state.zoom} onChange={handleZoomChange}/>
            </div>
        );
    }
}

export default Filters;
