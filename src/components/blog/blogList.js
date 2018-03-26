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

const urlTrending = "http://127.0.0.1:3030/api/article/";

const Title = styled.h1`
  display: inline-block;
  color: black;
`;
const ButtonStyled = styled(Button)`
  float: right;
`;
var amount = 0;
export default class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.pollInterval = null;
  }
  loadCommentsFromServer = () => {
    axios.get(urlTrending).then(res => {
      if (res.data) {
        this.setState({ data: res.data });
      }
      console.log("res.data", res.data);
    });
  };

  componentDidMount() {
    console.log("fired");

    //this.loadCommentsFromServer();
  }

  render() {
    let section2 = this.state.data
      .slice(6, this.state.data.length)
      .map(article => {
        return (
          <Grid.Column>
            <BlogShort
              headline={article.headline}
              author={article.author.username}
              key={article._id}
              id={article._id}
              abstract={article.abstract}
              date={article.date}
            />
          </Grid.Column>
        );
      });

    return (
      <Div>
        <Title>Featured</Title>
        <Link to={`blog/create`}>
          <ButtonStyled type="submit">Neuen Artikel schreiben</ButtonStyled>
        </Link>
        <br />
        <br />
        <BlogNewest />
        <BlogTrending />
      </Div>
    );
  }
}
