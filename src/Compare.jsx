import React, { Component } from 'react';

export default class Compare extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="center-content">
        <h1>{this.props.match.params.user1} vs {this.props.match.params.user2} on {this.props.match.params.platform}</h1>
        { this.renderBarChart() }
        <a href="/" className="roundButton">back</a>
      </div>
    )
  }
}