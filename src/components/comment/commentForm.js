import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";
import styled from "styled-components";

const InputStyled = styled(Input)`
  margin-left: 10px;
`;

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: "", text: "", date: "" };
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
    let date = new Date().toLocaleDateString();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ author: author, text: text, date: date });

    this.setState({ author: "", text: "", date: "" });
  }
  render() {
    return (
      <form className={this.props.className} onSubmit={this.handleSubmit}>
        <Input
          type="text"
          placeholder="Author..."
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <InputStyled
          type="text"
          placeholder="Comment..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <Button type="submit" value="Post">
          Posten
        </Button>
      </form>
    );
  }
}
