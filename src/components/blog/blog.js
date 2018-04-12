import React from "react";
import styled from "styled-components";
import "normalize.css";
import { Button, Icon, Label } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import Comment from "../comment/commentBox";
import Sidebar from "./sidebar";

const urlCheckAuth = "http://127.0.0.1:3030/api/loggedin";
const Title = styled.h2`
  text-align: center;
  color: black;
`;

const Div = styled.div`
  position: relative;
  background: #fff;
  padding: 50px;
  width: 800px;
  margin: 0 auto 0 auto;
  box-shadow: 0 20px 40px rgba(100, 100, 100, 0.1);
`;

const Date = styled.div`
  color: #9e9e9e;
  font-size: 14px;
`;

const Content = styled.div`
  color: rgba(0, 0, 0, 0.84);

  font-style: normal;
  font-size: 20px;
  line-height: 1.58;
  font-weight: 400;
`;

const P = styled.div`
  white-space: pre-wrap;
  ::selection {
    background: #007486;
    color: white;
  }
`;

const Abstract = styled.div`
  margin-top: 8px;
  color: #9e9e9e;
  font-size: 14px;
  text-align: justify;
`;

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { author: { username: "" } },
      authenticated: false,
      loaded: false
    };
    this.goBack = this.goBack.bind(this);
    this.addLike = this.addLike.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.loadArticleFromServer = this.loadArticleFromServer.bind(this);
    this.addBookmark = this.addBookmark.bind(this);
  }

  authenticate = () => {
    axios.defaults.withCredentials = true;
    axios(urlCheckAuth, {
      method: "get",
      withCredentials: true
    }).then(res => {
      console.log("Blog Authentication", res.data);

      if (res.data) {
        if (res.data === "No authentication") {
          this.setState({ authenticated: false });
        } else {
          this.setState({ authenticated: true });
        }
      }
    });
  };

  loadArticleFromServer = () => {
    const id = this.props.match.params.id;
    console.log("ID", id);

    const url = `http://127.0.0.1:3030/api/article/${id}`;

    axios
      .get(url)
      .then(res => {
        console.log("Data", res.data);

        this.setState({ data: res.data, loaded: true });
      })
      .catch(err => {});
  };

  addView() {
    const id = this.props.match.params.id;
    const url = `http://127.0.0.1:3030/api/article/addView/${id}`;
    axios
      .put(url)
      .then(res => {
        console.log("VIEW", res.data);

        this.setState({ data: res.data });
      })
      .catch(err => {
        console.log("VIEW", err);
      });
  }

  addLike() {
    const id = this.props.match.params.id;
    const url = `http://127.0.0.1:3030/api/article/addLike/${id}`;
    axios
      .put(url)
      .then(res => {
        console.log("LIKE", res.data);
        this.setState({ data: res.data });
      })
      .catch(err => {
        console.log("LIKE", err);
      });
  }

  addBookmark() {
    const id = this.props.match.params.id;
    const url = `http://127.0.0.1:3030/api/user/addBookmark`;

    axios
      .put(url, { articleId: id })
      .then(res => {
        console.log("Bookmark", res.data);
      })
      .catch(err => {
        console.log("Bookmark", err);
      });
  }

  componentDidMount() {
    this.addView();
    this.authenticate();
    this.loadArticleFromServer();
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <Div>
        <Sidebar
          id={this.state.data._id}
          click={this.addLike}
          addBookmark={this.addBookmark}
        />
        <Button onClick={this.goBack}>Back</Button>
        <br />
        <Title>{this.state.data.headline}</Title>
        <br />
        {this.state.loaded && <i>{this.state.data.author.username}</i>}
        <Date>{this.state.data.date}</Date>
        <br />
        <br />
        <Abstract>{this.state.data.abstract}</Abstract>
        <br />
        <br />
        <Content>
          <P>{this.state.data.content} </P>
        </Content>
        <br />
        <br />
        <div>
          <Label>
            <Icon name="line chart" />
            {this.state.data.views}
            <Label.Detail>Views</Label.Detail>
          </Label>

          <Label>
            <Icon name="heart" />
            {this.state.data.likes}
            <Label.Detail>Likes</Label.Detail>
          </Label>
        </div>
        <br />
        <br />
        <Comment articleID={this.state.data._id} />
      </Div>
    );
  }
}
