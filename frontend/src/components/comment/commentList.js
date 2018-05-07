import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import CommentObj from "./comment.js";

export default class CommentList extends React.Component {
  render() {
    var commentNodes;

    console.log("Comments ", this.props.data);

    commentNodes = this.props.data.map(comment => {
      return (
        <div>
          <CommentObj
            handleDelete={this.props.onDeleteComment}
            id={comment._id}
            userId={comment.author._id}
            profile={comment.author.profilePicture}
            author={comment.author.username}
            key={comment.id}
            date={comment.date}
            text={comment.text}
            currentUser={this.props.user}
          />
        </div>
      );
    });

    return <div>{commentNodes}</div>;
  }
}
