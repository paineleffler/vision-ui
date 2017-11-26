import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchBarText: '',
      platform: 'twitter',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({searchBarText: event.target.value});
  }
  renderSocialIcons() {
 
    return (
      <div className="social-container">
        {this.renderIcon('facebook')}
        {this.renderIcon('twitter')}
        {this.renderIcon('instagram')}
      </div>
    )
  }
  renderIcon(platform) {
    const active = this.state.platform === platform ? 'social-active' : 'social';
    const classes = `${active} fa fa-2x fa-inverse fa-${platform}`;
    return (
      <div id={platform} onClick={this.handleSocialChange} className="social-icon-box">
        <i id={platform} className={classes}></i>
      </div>
    )
  }
  handleSocialChange = (e) => {
    this.setState({ platform: e.target.id });
  }
  render() {
    return (
      <div className="flex-container">
        <div><h1>how's my media</h1></div>
          <div>
            <input 
              id="homeSearch" 
              type="text" 
              value={this.state.searchBarText} 
              placeholder="search for a user" 
              onChange={this.handleChange}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  window.location.href = `/results/${this.state.platform}/${this.state.searchBarText}`;
                }
              }}
            />
          </div>
          { this.renderSocialIcons() }
      </div>
    )
  }
}
