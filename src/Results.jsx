import React, { Component } from 'react';

import Donut from './Donut.jsx';
import axios from 'axios'
export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        console.log(response.data.results)
      })
      .catch((error) => {
        console.log("Error with GCPV requests", error)
      })
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
