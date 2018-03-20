import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import BlogShort from "./blogShort.js";
import { Button } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import { Div } from "../styledComponents";
import styled from "styled-components";
import Blog from "./blog.js";

const url = "http://127.0.0.1:3030/api/article";

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
    this.state = { data: [] };
    this.pollInterval = null;
  }
  loadCommentsFromServer = () => {
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({ data: res.data });
    });
  };

  componentDidMount() {
    console.log("fired");

    this.loadCommentsFromServer();
  }

  render() {
    let data = this.state.data.map(article => {
      return (
        <BlogShort
          headline={article.headline}
          author={article.author.name}
          key={article._id}
          id={article._id}
          abstract={article.abstract}
          date={article.date}
        />
      );
    });

    return (
      <Div>
        <Title>Blog</Title>

        <Link to={`blog/create`}>
          <ButtonStyled type="submit">Neuen Artikel schreiben</ButtonStyled>
        </Link>
        <br />
        <br />
        <br />

        <div> {data}</div>
      </Div>
    );
  }
}
