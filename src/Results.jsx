import React, { Component } from 'react';

import Donut from './Donut.jsx';
import axios from 'axios'
export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullResults: [],
      fullLabels: [],
      labelTally: {}
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
    for (var i in this.state.fullLabels) {
      for (var l in this.state.fullLabels[i]) {
        if(this.state.labelTally[this.state.fullLabels[i][l].description]) {
          var t = this.state.labelTally
          t[this.state.fullLabels[i][l].description]++;
          this.setState({labelTally : t})
        } else {
          var t = this.state.labelTally
          t[this.state.fullLabels[i][l].description] = 1;
          this.setState({labelTally : t})
        }
      }
    }
  }

  render() {
    return (
      <div className="center-content">
        <h1>results for '{this.props.match.params.username}'</h1>
        <Donut/>
        <a href="/" className="roundButton">back</a>
      </div>
    )
  }
}
