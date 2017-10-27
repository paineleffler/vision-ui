import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//components
import Home from './Home.jsx';
import Results from './Results.jsx';
import About from './About.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/about' component={About} />
            <Route path='/results/:username' component={Results} />
            <Route exact path='/' component={Home} />
            <Route render={function () {
              return <h1>Not Found</h1>
            }} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
