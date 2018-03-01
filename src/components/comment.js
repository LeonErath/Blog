import React, { Component } from "react";
import { Comment } from "semantic-ui-react";

export default class CommentObj extends Component {
  render() {
    return (
      <Comment>
        <Comment.Content>
          <Comment.Author as="a">{this.props.author}</Comment.Author>
          <Comment.Metadata>
            <div>{this.props.date}</div>
          </Comment.Metadata>
          <Comment.Text>{this.props.text}</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  }
}
