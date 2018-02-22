import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.css";
import Home from "./components/home.js";
import About from "./components/about.js";
import Blog from "./components/blog.js";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <img src="./images/test_background.png" alt="me" />

          <Route exact path="/" component={Home} />
          <Route path="/blog" component={Blog} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
