import React, { Component } from 'react';

import Donut from './Donut.jsx';

export default class Results extends Component {
  render() {
    return (
      <div className="center-content">
        <h1>Results</h1>
        <Donut/>
        <a href="/" className="roundButton">back</a>
      </div>
    )
  }
}
