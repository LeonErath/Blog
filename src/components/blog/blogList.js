import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import BlogShort from "./blogShort.js";
import { Button } from "semantic-ui-react";

import axios from "axios";
import styled from "styled-components";
import Blog from "./blog.js";

const url = "http://127.0.0.1:3030/api/article";

const Div = styled.div`
  position: relative;
  background: #fff;
  padding: 50px;
  width: 600px;
  margin: 0 auto 0 auto;
  box-shadow: 0 20px 40px rgba(100, 100, 100, 0.1);
`;

export default class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.pollInterval = null;
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    console.log("pressed button");
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
        <h1>Blog</h1>
        <form onSubmit={this.handleSubmit}>
          <Button type="submit">Aktualisieren</Button>
        </form>
        <div>{data}</div>
      </Div>
    );
  }
}
