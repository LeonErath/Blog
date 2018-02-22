import React, { Component } from "react";
import {
  Button,
  Segment,
  SegmentGroup,
  Input,
  Transition,
  TransitionGroup
} from "semantic-ui-react";

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: "", text: "" };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ author: author, text: text });

    this.setState({ author: "", text: "" });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          type="text"
          placeholder="Author..."
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <Input
          type="text"
          placeholder="Comment..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <Button type="submit" value="Post">
          Submit
        </Button>
      </form>
    );
  }
}
