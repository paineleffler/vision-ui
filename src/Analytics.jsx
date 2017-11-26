import React, { Component } from 'react';
import axios from 'axios'

export default class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: '-',
      images: '-',
      labels: '-'
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:5000/analytics/urls`)
    .then((response) => {
      this.setState({
        images: response.data.numUrls
      });
    })
    .catch((error) => {
      console.log("Error with analytics/urls Requests", error);
    });
    axios.get(`http://localhost:5000/analytics/labels`)
    .then((response) => {
      this.setState({
        labels: response.data.numLabels
      });
    })
    .catch((error) => {
      console.log("Error with analytics/labels Requests", error);
    });  
    axios.get(`http://localhost:5000/analytics/users`)
    .then((response) => {
      this.setState({
        users: response.data.numUsers
      });
    })
    .catch((error) => {
      console.log("Error with analytics/users Requests", error);
    });  
  }
  render() {
    return (
      <div className="center-content">
        <h1>Analytics</h1>
        <h3>Users: { this.state.users }</h3>
        <h3>Images: { this.state.images }</h3>
        <h3>Labels: { this.state.labels }</h3>
        <div>
          <a href="/" className="roundButton">back</a>
        </div>
      </div>
    )
  }
}