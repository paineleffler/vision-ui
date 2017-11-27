import React, { Component } from 'react';

export default class CompareSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarText1: '',
      searchBarText2: '',
    };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }
  handleChange1(event) {
    this.setState({searchBarText1: event.target.value});
  }
  handleChange2(event) {
    this.setState({searchBarText2: event.target.value});
  }
  render() {
    return (
      <div className="center-content">
        <h1>Compare Users</h1>
        <div className="analytics-flex-container">
          <div className="analytics-flex-box">
            <h3>User 1</h3>
            <i className="fa fa-user fa-inverse fa-5x"></i>
            <div className="compare-searchbar-box">
              <input
                className="compare-search"
                id="compareSearch1" 
                type="text" 
                value={this.state.searchBarText1} 
                placeholder="search for a user" 
                onChange={this.handleChange1}
              />
            </div>
          </div>
          <div className="analytics-flex-box">
             <h3>User 2:</h3>
            <i className="fa fa-user-o fa-inverse fa-5x"></i>
            <div className="compare-searchbar-box">
              <input 
                className="compare-search"
                id="compareSearch2" 
                type="text" 
                value={this.state.searchBarText2} 
                placeholder="search for a user" 
                onChange={this.handleChange2}
              />
              </div>
          </div>
        </div>
        <div>
          <a href={`/compare/${this.state.searchBarText1}/${this.state.searchBarText2}`} className="roundButton">compare</a>
        </div>
      </div>
    )
  }
}