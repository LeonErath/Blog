import React from "react";
import styled from "styled-components";
import "normalize.css";
import { Button, Icon, Label } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import Comment from "../comment/commentBox";
import Sidebar from "./sidebar";

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
    this.state = { data: { author: {} } };
    this.goBack = this.goBack.bind(this);
    this.addLike = this.addLike.bind(this);
  }

  loadCommentFromServer = () => {
    const id = this.props.match.params.id;
    const url = `http://127.0.0.1:3030/api/article/${id}`;

    axios.get(url).then(res => {
      this.setState({ data: res.data });
    });
  };

  addView() {
    const id = this.props.match.params.id;
    const url = `http://127.0.0.1:3030/api/article/addView/${id}`;
    axios.put(url).then(res => {
      console.log(res.data);

      this.setState({ data: res.data });
    });
  }

  addLike() {
    const id = this.props.match.params.id;
    const url = `http://127.0.0.1:3030/api/article/addLike/${id}`;
    axios.put(url).then(res => {
      console.log(res.data);
      this.setState({ data: res.data });
    });
  }

  componentDidMount() {
    console.log("fired");
    this.addView();
    //this.loadCommentFromServer();
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <Div>
        <Sidebar id={this.state.data._id} click={this.addLike} />

        <Button onClick={this.goBack}>Back</Button>
        <br />
        <Title>{this.state.data.headline}</Title>

        <br />
        <i>{this.state.data.author.name}</i>
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
