import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import Home from "./components/home.js";
import About from "./components/about.js";
import BlogList from "./components/blog/blogList.js";
import Login from "./components/login.js";
import Blog from "./components/blog/blog.js";
import BlogForm from "./components/blog/blogForm.js";
import Profile from "./components/profile/profile.js";
import Search from "./components/search";
import BookmarkList from "./components/bookmark/bookmarkList.js";

import "./index.css";
import axios from "axios";

const urlCheckAuth = "http://127.0.0.1:3030/api/loggedin";
const urlLogout = "http://127.0.0.1:3030/api/logout";

const Background = styled.div`
  background-image: url("/images/concrete-texture.png");
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

const RightSection = styled.div`
  float: right;
`;

const Padding = styled.div`
  padding-top: 6px;
  padding-right: 16px;
`;

const Padding2 = styled.div`
  padding: 6px;
`;

const Rectangle = styled.div`
  z-index: 100;
  list-style-type: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  background: #007486;
  position: fixed;
`;
const Center = styled.div`
  position: relative;
  bottom: -50%;
`;

const MainLink = styled.li`
  a {
    color: white;

    text-decoration: none;
    :hover {
      color: #fff;
    }
  }
`;

const Title = styled.h1`
  color: #000;
  outline: none;
`;

const Div = styled.div`
  padding-top: 100px;
  height: 100vh;
  background-image: url("/images/background_pattern.png");
  background-repeat: repeat;
`;

const Circle = styled.div`
  position: absolute;
  bottom: -15px;
  left: 0;
  right: 0;
  width: 200px;
  height: 100px;
  margin-right: auto;
  text-align: center;
  margin-left: auto;
  background: #007486;
  border-radius: 50%;
  -webkit-transition: height 0.8s; /* For Safari 3.1 to 6.0 */
  transition: height 0.8s;

  :hover {
    height: 120px;
  }
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  authenticate = () => {
    axios.defaults.withCredentials = true;
    axios(urlCheckAuth, {
      method: "get",
      withCredentials: true
    })
      .then(res => {
        this.setState({ authenticated: true, user: res.data });
      })
      .catch(err => {
        this.setState({ authenticated: false });
      });
  };

  handleSubmit(e) {
    e.preventDefault();

    axios.get(urlLogout).then(res => {
      window.location.reload();
    });
  }

  componentDidMount() {
    this.authenticate();
  }

  render() {
    return (
      <Background>
        <Router>
          <div>
            <Rectangle>
              <NavbarLink>
                <Link to="/welcome">Welcome</Link>
              </NavbarLink>
              {!this.state.authenticated && (
                <NavbarLink>
                  <Link to="/login">Login</Link>
                </NavbarLink>
              )}
              <NavbarLink>
                <Link to="/about">About</Link>
              </NavbarLink>

              <Circle>
                <Center>
                  <Title>
                    <MainLink>
                      <Link to="/">Blog</Link>
                    </MainLink>
                  </Title>
                </Center>
              </Circle>

              <RightSection>
                <Padding>
                  <Search />
                </Padding>
              </RightSection>

              <RightSection>
                <Padding2>
                  {this.state.authenticated && (
                    <NavbarLink>
                      <Button
                        inverted
                        color="white"
                        onClick={this.handleSubmit}
                      >
                        {" "}
                        Logout{" "}
                      </Button>
                    </NavbarLink>
                  )}
                </Padding2>
              </RightSection>

              <RightSection>
                {this.state.authenticated && (
                  <NavbarLink>
                    <Link to={`/profile/${this.state.user.userId}`}>
                      Profile
                    </Link>
                  </NavbarLink>
                )}
              </RightSection>

              <RightSection>
                {this.state.authenticated && (
                  <NavbarLink>
                    <Link to="/bookmarks">
                      <Icon name="bookmark outline" size="large" />
                    </Link>
                  </NavbarLink>
                )}
              </RightSection>
            </Rectangle>

            <Div>
              <Switch>
                <Route exact path="/" component={BlogList} />
                <Route path="/blog/create" component={BlogForm} />
                <Route path="/blog/:id" component={Blog} />
              </Switch>

              <Switch>
                <Route exact path="/bookmarks" component={BookmarkList} />
              </Switch>
              <Route path="/profile/:id" component={Profile} />
              <Route path="/welcome" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/about" component={About} />
            </Div>
          </div>
        </Router>
      </Background>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
