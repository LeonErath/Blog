import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import CommentForm from "./commentForm.js";
import {
  Button,
  Segment,
  SegmentGroup,
  Input,
  Transition,
  TransitionGroup
} from "semantic-ui-react";

const url = "http://127.0.0.1:3030/api/comments";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.pollInterval = null;
  }

  handleCommentSubmit(comment) {
    comment.id = Date.now();

    axios.post(url, comment).catch(err => {
      console.error(err);
    });

    axios.get(url).then(res => {
      console.log(res.data);
    });
  }

  render() {
    return (
      <div>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}
