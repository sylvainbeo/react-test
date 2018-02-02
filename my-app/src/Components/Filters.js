import React from 'react';

class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          centerText: props.center.join(','),
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('Filter will receive new props', nextProps);
        this.setState({ centerText: nextProps.center.join(',') });
    }

    render() {
        console.log('Filters is rendering');

        const handleChange = (e) => this.props.updateCenter(this.state.centerText.split(',') );

        const handleTextChange = (e) => this.setState({ centerText: e.target.value });

        return (
            <div className="filters">
                <input type="button" id="filter1" value="Center map" onClick={handleChange} />
                <input type="button" id="filter2" value="Goto 0,0" onClick={()=>this.props.updateCenter([0,0])}/>
                {/* <input type="text" value={this.state.coords} onChange={this.handleChange}/> */}
                <input type="text" value={this.state.centerText} onChange={handleTextChange}/>
            </div>
        );
    }
}

export default Filters;
