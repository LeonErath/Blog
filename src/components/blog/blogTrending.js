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

const urlNewest = "http://127.0.0.1:3030/api/article/trending";

const Title = styled.h1`
  display: inline-block;
  color: black;
`;
const ButtonStyled = styled(Button)`
  float: right;
`;

export default class BlogTrending extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.pollInterval = null;
  }
  loadCommentsFromServer = () => {
    axios.get(urlNewest).then(res => {
      console.log(res.data);
      this.setState({ data: res.data });
    });
  };

  componentDidMount() {
    console.log("fired");

    this.loadCommentsFromServer();
  }

  render() {
    let section1 = this.state.data.slice(0, 6).map(article => {
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

    return (
      <div>
        <br />
        <br />
        <Title>Trending</Title>
        <br />
        <br />
        <div>
          <Grid columns={1}>
            <Grid.Row>{section1}</Grid.Row>
          </Grid>
        </div>
        <br /> <br />
        <hr />
      </div>
    );
  }
}
