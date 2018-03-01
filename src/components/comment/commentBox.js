import React from "react";
import "normalize.css";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import CommentForm from "./commentForm.js";
import CommentList from "./commentList.js";
import styled from "styled-components";

const CommentFormStyled = styled(CommentForm)`
  margin-top: 10px;
`;

const url = "http://127.0.0.1:3030/api/comments";

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.pollInterval = null;
  }

  handleCommentSubmit(comment) {
    let comments = this.state.data;
    comment.id = Date.now();
    let newComments = comments.concat([comment]);
    this.setState({ data: newComments });

    axios.post(url, comment).catch(err => {
      console.error(err);
    });
  }

  loadCommentsFromServer = () => {
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({ data: res.data });
    });
  };

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  render() {
    return (
      <div>
        <CommentList data={this.state.data} />
        <CommentFormStyled onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}
