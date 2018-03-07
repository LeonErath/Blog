import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import CommentObj from "./comment.js";
import { Comment } from "semantic-ui-react";

export default class CommentList extends React.Component {
  render() {
    let commentNodes = this.props.data.map(comment => {
      return (
        <Comment.Group>
          <CommentObj
            author={comment.author}
            key={comment.id}
            date={comment.date}
            text={comment.text}
          />
        </Comment.Group>
      );
    });
    return <div>{commentNodes}</div>;
  }
}
