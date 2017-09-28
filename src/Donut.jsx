import React, { Component } from 'react';

import Chart from 'chart.js';

export default class Donut extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [50,30,10,5,5],
        };
    }
    render() {
        return (
            <canvas id="donut"></canvas>
        )
    }
    componentDidMount() {
        var ctx = document.getElementById("donut");
        var myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: this.state.data,
                    backgroundColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: ['#ffffff'],
                    label: 'Dataset 1'
                }],
                labels: [
                    "Red",
                    "Orange",
                    "Yellow",
                    "Green",
                    "Blue"
                ]
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
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                defaultFontColor: 'white'
            }
        });
    }
}
