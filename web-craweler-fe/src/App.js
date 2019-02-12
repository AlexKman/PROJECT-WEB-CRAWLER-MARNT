import React, { Component } from "react";
import * as api from "./api";
import "./App.css";

class App extends Component {
  state = {
    url: ""
  };
  render() {
    console.log(this.state.url);
    const { url } = this.state;
    return (
      <div className="App">
        <h1>Web Crawler</h1>
        <input onChange={this.changeURL} placeholder="url" />
        <button onClick={this.submitLink(url)}>Submit URL</button>
      </div>
    );
  }
  changeURL = event => {
    const url = event.target.value;
    this.setState({ url });
  };
  submitLink = url => {
    api.sendURL(url);
  };
}

export default App;
