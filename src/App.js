import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//components
import Home from './Home.jsx';
import Results from './Results.jsx';
import About from './About.jsx';
import Compare from './Compare.jsx';
import Analytics from './Analytics.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
          <NavBar />
            <Switch>
              <Route exact path='/about' component={About} />
              <Route path='/results/:platform/:username' component={Results} />
              <Route path='/compare/:user1/:user2' component={Compare} />
              <Route path='/analytics' component={Analytics} />
              <Route exact path='/' component={Home} />
              <Route render={function () {
                return <h1>Not Found</h1>
              }} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
