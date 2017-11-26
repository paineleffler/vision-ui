import React, { Component } from 'react';

export default class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: '-',
      images: '-',
      labels: '-'
    };
  }

  render() {
    return (
      <div className="center-content">
        <h1>Data Analytics</h1>
        <h3>Unique Usernames: { this.state.users }</h3>
        <h3>Unique Images: { this.state.images }</h3>
        <h3>Unique Labels: { this.state.labels }</h3>
        <div>
          <a href="/" className="roundButton">back</a>
        </div>
      </div>
    )
  }
}