import React from "react";
import "normalize.css";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import CommentForm from "./commentForm.js";
import CommentList from "./commentList.js";
import styled from "styled-components";
import { Segment, Button, Divider } from "semantic-ui-react";

const CommentFormStyled = styled(CommentForm)`
  margin-top: 10px;
`;

var url = "http://127.0.0.1:3030/api/comment?articleID=";

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
    comment.articleID = this.props.articleID;
    let newComments = comments.concat([comment]);
    this.setState({ data: newComments });

    axios.post(url, comment).catch(err => {
      console.error(err);
    });
  }

  loadCommentsFromServer = () => {
    if (this.props.articleID != undefined) {
      var url2 = url + this.props.articleID;

      axios
        .get(url2)
        .then(res => {
          if (res.status) this.setState({ data: res.data });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  componentDidMount() {
    this.loadCommentsFromServer();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.articleID != this.props.articleID) {
      console.log("ID:" + this.props.articleID);

      this.loadCommentsFromServer();
    }
  }

  render() {
    return (
      <div>
        <Divider horizontal>Comments</Divider>
        <CommentList data={this.state.data} />
        <CommentFormStyled onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}
