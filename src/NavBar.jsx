
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavigationBar extends Component {
  render() {
    return (
      <div className='nav-flex-container'>
        <div className='nav-flex-box'><NavLink className='nav-link' exact activeClassName='active' to='/'>Home</NavLink></div>
        <div className='nav-flex-box'><NavLink className='nav-link' activeClassName='active' to='/compare/user1/user2'>Compare</NavLink></div>
        <div className='nav-flex-box'><NavLink className='nav-link' activeClassName='active' to='/analytics'>Analytics</NavLink></div>
      </div>
    )
  }
}