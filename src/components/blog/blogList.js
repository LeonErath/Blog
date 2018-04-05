import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import BlogShort from "./blogShort.js";
import { Button, Grid } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import { Div } from "../styledComponents";
import styled from "styled-components";
import Blog from "./blog.js";
import BlogNewest from "./blogNewest";
import BlogTrending from "./blogTrending";

const urlCheckAuth = "http://127.0.0.1:3030/api/loggedin";

const Title = styled.h1`
  display: inline-block;
  color: black;
`;
const ButtonStyled = styled(Button)`
  float: right;
`;

export default class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
    this.pollInterval = null;
  }
  loadCommentsFromServer = () => {
    axios.defaults.withCredentials = true;
    axios(urlCheckAuth, {
      method: "get",
      withCredentials: true
    }).then(res => {
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

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  render() {
    return (
      <Div>
        <Title>Featured</Title>
        {this.state.authenticated && (
          <Link to={`blog/create`}>
            <ButtonStyled type="submit">Neuen Artikel schreiben</ButtonStyled>
          </Link>
        )}
        <br />
        <br />
        <BlogNewest />
        <BlogTrending />
      </Div>
    );
  }
}
