import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2'
import axios from 'axios'

export default class Compare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      u1Total: '-',
      u2Total: '-',
      u1Counts: [],
      u2Counts: [],
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/labels/?id=${this.props.match.params.user1}`)
    .then((response) => {
      this.setState({
        u1Object: response.data,
        u1Total: Object.keys(response.data).length
      });
      axios.get(`http://localhost:5000/labels/?id=${this.props.match.params.user2}`)
      .then((response) => {
        this.setState({
          u2Object: response.data,
          u2Total: Object.keys(response.data).length
        });
        this.getLabels()
      })
      .catch((error) => {
        console.log("Error with user2 labels Requests", error);
      });
    })
    .catch((error) => {
      console.log("Error with user1 labels Requests", error);
    });
    
  }
  getLabels() {
    let labels = []
    let u1c = []
    let u2c = []
    if (this.state.u1Object !== undefined && this.state.u2Object !== undefined) {
      Object.keys(this.state.u1Object).forEach((key,index) => {
        if (this.state.u2Object[key] !== undefined) {
          labels.push(key)
          u1c.push(this.state.u1Object[key])
          u2c.push(this.state.u2Object[key])
        }
      });
      this.setState({labels: labels, u1Counts: u1c, u2Counts: u2c})
    }
    return labels
  }

  renderBarChart() {
    const config = {
      labels: this.state.labels,
      datasets: [
        { 
          label: this.props.match.params.user1,
          backgroundColor: '#29434e',
          borderColor: '#1b3039',
          borderWidth: 1,
          hoverBackgroundColor: '#78909c',
          hoverBorderColor: '#e2f1f8',
          data: this.state.u1Counts,
          labels: { fontColor: '#ffffff'}
        },
        { 
          label: this.props.match.params.user2,
          backgroundColor: '#ffffff',
          borderColor: '#ffffff',
          borderWidth: 1,
          hoverBackgroundColor: '#ffffff',
          hoverBorderColor: '#e2f1f8',
          data: this.state.u2Counts,
          labels: { fontColor: '#ffffff'}
        },

      ]
    };
    const o = {
      responsive: true,
      legend: {
          display: 'false',
          position: 'right',
          labels: { fontColor: '#ffffff' }
      },
      title: {
          display: false,
      },
      defaultFontColor: 'white',
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Picture Count',
            fontColor: '#eceff1',
            fontSize: 12
          },
          ticks: {
            fontColor: "#eceff1",
            fontSize: 12,
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            autoSkip: true,
            fontColor: "#eceff1",
            fontSize: 12,
            stepSize: 1,
            beginAtZero: true
          }
        }]
    }
    }
    return <Bar data={config} options={o}/>
  }

  render() {
    return (
      <div className="center-content">
        <h1>'{this.props.match.params.user1}' vs '{this.props.match.params.user2}'</h1>
        <div className="compare-flex-container">
          <div className="compare-flex-box">
            <h3>Label Total: {this.state.u1Total}</h3>
          </div>
          <div className="compare-flex-box">
            <h3>Label Total: {this.state.u2Total}</h3>
          </div>
        </div>
        { this.renderBarChart() }
        <div>
          <a href="/" className="roundButton">back</a>
        </div>
      </div>
    )
  }
}