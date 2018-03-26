import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Home from "./components/home.js";
import About from "./components/about.js";
import BlogList from "./components/blog/blogList.js";
import Login from "./components/login.js";
import Blog from "./components/blog/blog.js";
import BlogForm from "./components/blog/blogForm.js";
import SearchStandard from "./components/search";
import "./index.css";
import axios from "axios";

const urlCheckAuth = "http://127.0.0.1:3030/api/loggedin";
const urlLogout = "http://127.0.0.1:3030/api/logout";

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

const DivSearch = styled.div`
  padding-top: 4px;
  padding-right: 16px;
  float: right;
  display: inline-block;
  height: 100%;
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

const Search = styled(SearchStandard)`
  display: inline-block;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  authenticate = () => {
    axios.get(urlCheckAuth).then(res => {
      console.log("BlogList Authentication", res.data);

      if (res.data) {
        if (res.data == "No authentication") {
          this.setState({ authenticated: false });
        } else {
          this.setState({ authenticated: true });
        }
      }
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
              <NavbarLink>
                <Link to="/login">Login</Link>
              </NavbarLink>
              <NavbarLink>
                <Link to="/about">About</Link>
              </NavbarLink>
              {this.state.authenticated && (
                <NavbarLink>
                  <Button onClick={this.handleSubmit}> Logout </Button>
                </NavbarLink>
              )}

              <Circle>
                <Center>
                  <Title>
                    <MainLink>
                      <Link to="/">Blog</Link>
                    </MainLink>
                  </Title>
                </Center>
              </Circle>
              <DivSearch>
                <Search />
              </DivSearch>
            </Rectangle>

            <Div>
              <Route exact path="/" component={BlogList} />
              <Switch>
                <Route exact path="/blog" component={BlogList} />
                <Route path="/blog/create" component={BlogForm} />
                <Route path="/blog/:id" component={Blog} />
              </Switch>
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
