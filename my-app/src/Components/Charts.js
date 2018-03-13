import React from 'react';

import {Pie} from 'react-chartjs-2';

class Charts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            centerText: props.parentApi.data.center.join(','),
            zoom: props.parentApi.data.zoom,
            zone: props.parentApi.data.zone
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('Charts will receive new props', nextProps);
        /*this.setState({
            centerText: nextProps.parentApi.data.center.join(',') ,
            zoom: nextProps.parentApi.data.zoom,
            zone: nextProps.parentApi.data.zone
        });*/
    }

    render() {
        console.log('Filters is rendering');
        // Demo data
        var data = {
            labels: ['Red', 'Green', 'Yellow'],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        };
        const options = {
            maintainAspectRatio: false,
            responsive: false,
            legend: {
                position: 'left',
                labels: {
                boxWidth: 10
                }
            }
        }
        return (
            <div className="charts">
                <Pie ref='chart' width={500} height={150} options={options} data={data} />
            </div>
        );
    }
}

export default Charts;
