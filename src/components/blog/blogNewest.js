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

const urlNewest = "http://127.0.0.1:3030/api/article/newest";

const Title = styled.h1`
  display: inline-block;
  color: black;
`;
const ButtonStyled = styled(Button)`
  float: right;
`;

var amount = 6;

export default class BlogNewest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.pollInterval = null;
  }
  loadCommentsFromServer = () => {
    axios.defaults.withCredentials = true;
    axios.get(urlNewest, { withCredentials: true }).then(res => {
      //console.log(res);

      if (res.data) {
        console.log("BlogNewest", res.data);

        this.setState({ data: res.data });
      }
    });
  };

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  render() {
    var section1;
    if (this.state.data != "No authentication") {
      section1 = this.state.data.slice(0, amount).map(article => {
        return (
          <Grid.Column>
            <BlogShort
              headline={article.headline}
              author={article.author.name}
              key={article._id}
              id={article._id}
              abstract={article.abstract}
              date={article.date}
            />
          </Grid.Column>
        );
      });
    }

    return (
      <div>
        <Title>Newest</Title>
        <br />
        <br />
        <div>
          <Grid columns={2}>
            <Grid.Row>{section1}</Grid.Row>
          </Grid>
        </div>
        <br /> <br />
        <hr />
      </div>
    );
  }
}
