import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./components/home.js";
import About from "./components/about.js";
import BlogList from "./components/blog/blogList.js";
import Login from "./components/login.js";
import Blog from "./components/blog/blog.js";
import BlogForm from "./components/blog/blogForm.js";

const Background = styled.div`
  background-image: url("/images/background_pattern.png");
  background-repeat: repeat;
`;

const NavbarLink = styled.li`
  float: left;
  :last-child {
    float: right;
  }
  a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    :hover {
      background-color: #111;
    }
  }
`;

const NavbarList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
`;

export default class App extends React.Component {
  render() {
    return (
      <Background>
        <Router>
          <div>
            <NavbarList>
              <NavbarLink>
                <Link to="/">Home</Link>
              </NavbarLink>
              <NavbarLink>
                <Link to="/blog">Blog</Link>
              </NavbarLink>
              <NavbarLink>
                <Link to="/login">Login</Link>
              </NavbarLink>
              <NavbarLink>
                <Link to="/about">About</Link>
              </NavbarLink>
            </NavbarList>

            <Route exact path="/" component={Home} />
            <Switch>
              <Route exact path="/blog" component={BlogList} />
              <Route path="/blog/create" component={BlogForm} />
              <Route path="/blog/:id" component={Blog} />
            </Switch>

            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
          </div>
        </Router>
      </Background>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
