import React, { Component } from 'react';

import axios from 'axios'
import { Bar } from 'react-chartjs-2'

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberImages: 0,
      currentResults: 0,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.googleVisionAnalysis = this.googleVisionAnalysis.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/${this.props.match.params.platform}/images?id=${this.props.match.params.username}`)
    .then((response) => {
      this.setState({
        numberImages: response.data.length,
        media: response.data
      });
      this.googleVisionAnalysis()
    })
    .catch((error) => {
      console.log("Error with User Requests", error);
    });  
  }

  googleVisionAnalysis () {
    for (var m in this.state.media) {
      var params = new URLSearchParams();
      params.append('username', this.props.match.params.username)
      params.append('platform', this.props.match.params.platform)
      params.append('url', this.state.media[m].url)
      axios.post(`http://localhost:5000/results`, params)
      .then((response) => {
        this.setState({ currentResults: this.state.currentResults + 1})
      })
      .catch((error) => {
        console.log("Error with GCPV requests", error)
      })
    }
    this.getLabels()
  }

  getLabels() {
    axios.get(`http://localhost:5000/labels?id=${this.props.match.params.username}&platform=${this.props.match.params.platform}`)
    .then((response) => {
      let keys = []
      let vals = []
      Object.keys(response.data).forEach(function(key,index) {
        keys.push(key)
        vals.push(response.data[key])
      });
      this.setState({
        labels: keys,
        values: vals
      })
    })
    .catch((error) => {
      console.log("Error with GCPV requests", error)
    })
  }

  renderBarChart() {
    const config = {
      labels: this.state.labels,
      datasets: [
        { 
          label: 'Google Vision Labels',
          backgroundColor: '#29434e',
          borderColor: '#1b3039',
          borderWidth: 1,
          hoverBackgroundColor: '#78909c',
          hoverBorderColor: '#e2f1f8',
          data: this.state.values,
          labels: { fontColor: '#ffffff'}
        }
      ]
    };
    const o = {
      responsive: true,
      legend: {
          display: 'false',
          position: 'top',
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
            autoSkip: false,
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
        <h1>{this.state.numberImages} image results for '{this.props.match.params.username}'</h1>
        { this.renderBarChart() }
        <a href="/" className="roundButton">back</a>
      </div>
    )
  }
}