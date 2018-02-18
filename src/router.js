import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./components/home.js";
import About from "./components/about.js";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <h1>Hallo</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}
