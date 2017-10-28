import React, { Component } from 'react';

//import Bar from './Bar.jsx';
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
    axios.get(`http://localhost:5000/users?id=${this.props.match.params.username}`)
    .then((response) => {
      this.setState({
        numberImages: response.data.length,
        tweets: response.data
      });
      this.googleVisionAnalysis()
    })
    .catch((error) => {
      console.log("Error with Twitter Requests", error);
    });  
  }

  googleVisionAnalysis () {
    for (var t in this.state.tweets) {
      var params = new URLSearchParams();
      params.append('tweetID', this.state.tweets[t].tweetID)
      params.append('url', this.state.tweets[t].url)
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
        if(this.state.labelTally[this.state.fullLabels[i][l].description]) {
          temp = this.state.labelTally
          temp[this.state.fullLabels[i][l].description]++;
          this.setState({labelTally : temp})
        } else {
          temp = this.state.labelTally
          temp[this.state.fullLabels[i][l].description] = 1;
          this.setState({labelTally : temp})
        }
        this.incrementLabelInCoordinates(this.state.fullLabels[i][l].description)
      }
    }
  }

  incrementLabelInCoordinates(label) {
    var temp;
    for (var i in this.state.coordinates) {
      if (this.state.coordinates[i].x === label) {
        temp = this.state.coordinates
        temp[i].y++;
        this.setState({coordinates : temp})
        return
      }
    }
    // label not found
    temp = this.state.coordinates
    temp.push({ x: label, y: 1})
    return
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
            ticks: {
                fontColor: "white",
                fontSize: 10,
                beginAtZero: true
            }
        }],
        xAxes: [{
            ticks: {
                fontColor: "white",
                fontSize: 9,
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
    for (var i in this.state.coordinates) {
      counts.push(this.state.coordinates[i].y)
    }
    return counts
  }

  getLabelsArray() {
    var labels = []
    for (var i in this.state.coordinates) {
      labels.push(this.state.coordinates[i].x)
    }
    return labels
  }

  render() {
    return (
      <div className="center-content">
        <h1>results for '{this.props.match.params.username}'</h1>
        {/* <Bar labels={this.state.labelTally} coordinates={this.state.coordinates}/> */}
        { this.renderBarChart() }
        <a href="/" className="roundButton">back</a>
      </div>
    )
  }
}
