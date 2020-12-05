import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import Home from './components/Home/Home';
import My404Component from './components/My404Component/My404Component';
import WaitingRoom from './components/WaitingRoom/WaitingRoom';
import GamePlay from './components/GamePlay/GamePlay';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="galaxyBackground">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/waitingroom" component={WaitingRoom} />
          <Route exact path="/game-play" component={GamePlay} />
          <Route exact path="*" component={My404Component} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
