import React, { Component } from 'react';
import axios from 'axios'

export default class Compare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user1LabelCount: '-',
      user2LabelCount: '-'
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:5000/labels/?id=${this.props.match.params.user1}`)
    .then((response) => {
      this.setState({
        user1Labels: response.data,
        user1LabelCount: Object.keys(response.data).length
      });
    })
    .catch((error) => {
      console.log("Error with user1 labels Requests", error);
    });
    axios.get(`http://localhost:5000/labels/?id=${this.props.match.params.user2}`)
    .then((response) => {
      this.setState({
        user2Labels: response.data,
        user2LabelCount: Object.keys(response.data).length
      });
    })
    .catch((error) => {
      console.log("Error with user2 labels Requests", error);
    });
  }
  render() {
    return (
      <div className="center-content">
        <h1>'{this.props.match.params.user1}' vs '{this.props.match.params.user2}'</h1>
        <div className="compare-flex-container">
          <div className="compare-flex-box">
            <h3>Label Count: {this.state.user1LabelCount}</h3>
          </div>
          <div className="compare-flex-box">
            <h3>Label Count: {this.state.user2LabelCount}</h3>
          </div>
        </div>
        <div>
          <a href="/" className="roundButton">back</a>
        </div>
      </div>
    )
  }
}