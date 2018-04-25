import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import CommentObj from "./comment.js";
import { Comment } from "semantic-ui-react";

export default class CommentList extends React.Component {
  render() {
    var commentNodes;

    console.log("Comments ", this.props.data);

    commentNodes = this.props.data.map(comment => {
      return (
        <Comment.Group size="large">
          <CommentObj
            userid={comment.author._id}
            profile={comment.author.profilePicture}
            author={comment.author.username}
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
