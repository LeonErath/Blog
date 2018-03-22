import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import BlogShort from "./blogShort.js";
import { Button, Grid, Dropdown, Menu } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import { Div } from "../styledComponents";
import styled from "styled-components";
import Blog from "./blog.js";

const timeOptions = [
  { key: 1, text: "Today", value: 1 },
  { key: 2, text: "This Week", value: 2 },
  { key: 3, text: "This Month", value: 3 }
];
const tagOptions = [
  {
    label: { color: "red", empty: true, circular: true },
    text: "Politics",
    value: 1
  },
  {
    label: { color: "blue", empty: true, circular: true },
    text: "Life",
    value: 2
  },
  {
    label: { color: "black", empty: true, circular: true },
    text: "Test",
    value: 3
  }
];

const Title = styled.h1`
  display: inline-block;
  color: black;
`;
const ButtonStyled = styled(Button)`
  float: right;
`;

const MenuStyled = styled(Menu)`
  float: right;
`;

var date = "";
var topic = "";

export default class BlogTrending extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.pollInterval = null;
    this.filterByTime = this.filterByTime.bind(this);
    this.filterByTag = this.filterByTag.bind(this);
  }

  filterByTime = (e, { value }) => {
    switch (value) {
      case 1:
        date = this.getDateMinusDays(1);
        console.log("Todayy", date);
        break;
      case 2:
        date = this.getDateMinusDays(7);
        console.log("Todayy", date);
        break;
      case 3:
        date = this.getDateMinusDays(31);
        console.log("Todayy", date);
        break;
      default:
        date = this.getDateMinusDays(1);
        break;
    }

    this.loadTrendingFromServer(date, topic);
  };

  getDateMinusDays(days) {
    var last = new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000);
    return last;
  }

  filterByTag = (e, { value }) => {
    this.loadTrendingFromServer(date, value);
  };

  loadTrendingFromServer = (time, topic) => {
    var dateQuery = "date";
    var topicQuery = "topic";
    if (time != "") {
      var dateQuery = "date=" + time;
    }
    if (topic != "") {
      var topicQuery = "topic" + topic;
    }
    const urlTrending =
      `http://127.0.0.1:3030/api/article/trending?` +
      dateQuery +
      "&" +
      topicQuery;

    axios.get(urlTrending).then(res => {
      console.log("Trending", res.data);
      this.setState({ data: res.data });
    });
  };

  componentDidMount() {
    console.log("fired");

    this.loadTrendingFromServer("", "");
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
        <div>
          <Title>Trending</Title>
          <MenuStyled compact>
            <Dropdown
              placeholder="Today"
              options={timeOptions}
              onChange={this.filterByTime}
              simple
              item
            />
            <Dropdown
              placeholder="Topics"
              options={tagOptions}
              onChange={this.filterByTag}
              simple
              item
            />
          </MenuStyled>
        </div>
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
