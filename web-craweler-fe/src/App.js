import React, { Component } from "react";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Web Crawler</h1>
        <input placeholder="url" />
        <button>Submit</button>
      </div>
    );
  }
}

export default App;
