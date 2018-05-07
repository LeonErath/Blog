import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import BlogShort from "./blogShort.js";
import { Card } from "semantic-ui-react";
import axios from "axios";
import styled from "styled-components";

const urlNewest = "http://127.0.0.1:3030/api/article/newest";

const Title = styled.h1`
  display: inline-block;
  color: black;
`;
const amount = 6;

export default class BlogNewest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.pollInterval = null;
  }
  loadNewestFromServer = () => {
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
    this.loadNewestFromServer();
  }

  render() {
    var section1;
    if (this.state.data !== "No authentication") {
      section1 = this.state.data.slice(0, amount).map(article => {
        return (
          <BlogShort
            thumbnail={article.thumbnail}
            headline={article.headline}
            key={article._id}
            id={article._id}
            author={article.author.username}
            likes={article.likes}
            views={article.views}
            abstract={article.abstract}
            date={article.date}
            topic={article.topic}
          />
        );
      });
    }

    return (
      <div>
        <Title>Newest</Title>
        <br />
        <br />
        <div>
          <Card.Group itemsPerRow={2}> {section1}</Card.Group>
        </div>
        <br /> <br />
        <hr />
      </div>
    );
  }
}
