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
        <div className="analytics-flex-container">
          <div className="analytics-flex-box">
            <i className="fa fa-users fa-inverse fa-5x"></i>
            <h3>Users: { this.state.users }</h3>
          </div>
          <div className="analytics-flex-box">
            <i className="fa fa-image fa-inverse fa-5x"></i>
            <h3>Images: { this.state.images }</h3>
          </div>
          <div className="analytics-flex-box">
            <i className="fa fa-tags fa-inverse fa-5x"></i>
            <h3>Labels: { this.state.labels }</h3>
          </div>
        </div>
        <div>
          <a href="/" className="roundButton">back</a>
        </div>
      </div>
    )
  }
}