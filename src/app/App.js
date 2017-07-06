import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from './components/notfound/NotFound';
import Header from './components/header/Header';
import Reddit from './pages/reddit/Reddit';
import Favorites from './pages/favorites/Favorites';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />

          <Switch>
            <Route exact path="/" component={Reddit} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
