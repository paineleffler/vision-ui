import React, { Component } from 'react';

import axios from 'axios'
import { Bar } from 'react-chartjs-2'

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullResults: [],
      fullLabels: [],
      labelTally: {},
      coordinates: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.googleVisionAnalysis = this.googleVisionAnalysis.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/twitter/users?id=${this.props.match.params.username}`)
    .then((response) => {
      this.setState({
        numberImages: response.data.length,
        media: response.data
      });
      this.googleVisionAnalysis()
    })
    .catch((error) => {
      console.log("Error with Twitter Requests", error);
    });  
  }

  googleVisionAnalysis () {
    for (var m in this.state.media) {
      var params = new URLSearchParams();
      params.append('username', this.props.match.params.username)
      params.append('platform', this.state.media.platform)
      params.append('url', this.state.media[m].url)
      axios.post(`http://localhost:5000/results`, params)
      .then((response) => {
        let tempResults = []
        let tempLabels = []
        tempResults = this.state.fullResults;
        tempResults.push(response.data.results[0])

        tempLabels = this.state.fullLabels;
        tempLabels.push(response.data.results[0].labelAnnotations)

        this.setState({
          fullResults: tempResults,
          fullLabels: tempLabels
        })

        this.condenseLabels()
      })
      .catch((error) => {
        console.log("Error with GCPV requests", error)
      })
    }
  }

  condenseLabels() {
    var temp;
    for (var i in this.state.fullLabels) {
      for (var l in this.state.fullLabels[i]) {
        if (this.state.fullLabels[i][l].description.toLowerCase().search(/(product|professional|profession|official|entrepreneur|businessperson|fun|event|snapshot|room|logo|brand|fiction|graphics|audio|circle|purple|photo caption|number|line|angle|color|white|red|yellow|blue|black|screenshot|text|label|girl|woman|man|boy|mammal|animal|material|font|area|advertising|advertisment)/) !== -1) {
          continue; //skip this
        }
        if(this.state.labelTally[this.state.fullLabels[i][l].description]) {
          temp = this.state.labelTally
          temp[this.state.fullLabels[i][l].description]++;
          this.setState({labelTally : temp})
        } else {
          temp = this.state.labelTally
          temp[this.state.fullLabels[i][l].description] = 1;
          this.setState({labelTally : temp})
        }
      }
    }
  }

  renderBarChart() {
    const config = {
      labels: this.getLabelsArray(),
      datasets: [
        { 
          label: 'Google Vision Labels',
          backgroundColor: '#29434e',
          borderColor: '#1b3039',
          borderWidth: 1,
          hoverBackgroundColor: '#78909c',
          hoverBorderColor: '#e2f1f8',
          data: this.getLabelCountsArray(),
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

  getLabelCountsArray() {
    var counts = []
    for (var i in this.state.labelTally) {
      counts.push(this.state.labelTally[i])
    }
    return counts
  }

  getLabelsArray() {
    var labels = []
    var keys = Object.keys(this.state.labelTally)
    for (var i in keys) {
      labels.push(keys[i])
    }
    return labels
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
