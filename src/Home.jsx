import React, { Component } from 'react';

import Search from './Search.jsx';

export default class Home extends Component {
  render() {
    return (
      <div className="center-content">
        <h1 id="homeTitle">how's my media</h1>
        <Search/>
        <a href="/results" className="roundButton">submit</a>
      </div>
    )
  }
}
