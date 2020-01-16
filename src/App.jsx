import React, { Component } from 'react';
import SnakeGame from './components/SnakeGame';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App__title">Snake</h1>
        <SnakeGame />
      </div>
    );
  }
}

export default App;
