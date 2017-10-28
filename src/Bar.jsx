import React, { Component } from 'react';

import Chart from 'chart.js';

export default class Bar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: this.props.labels,
            coordinates: this.props.coordinates
        };
    }
    render() {
        return (
            <canvas id="bar"></canvas>
        )
    }
    componentDidMount() {
        var ctx = document.getElementById("bar");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                datasets: [{
                    //data: this.state.coordinates,
                    data: [{x: 'hockey', y: 100},{x: 'ice', y: 50},{x: 'sports', y: 75},{x: 'arena', y: 10}],
                    backgroundColor: ['rgba(75, 192, 192, 1)'],
                    borderColor: ['#ffffff'],
                    //label: 'Google Vision Labels'
                }],
            },
            options: {
                responsive: true,
                legend: {
                    display: 'true',
                    position: 'top',
                    labels: { fontColor: '#ffffff' }
                },
                title: {
                    display: false,
                },
                defaultFontColor: 'white'
            }
        });
    }
}
