import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";
import styled from "styled-components";

const InputStyled = styled(Input)`
  margin-left: 10px;
`;

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", date: "" };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();

    let text = this.state.text.trim();
    let date = new Date().toLocaleDateString();
    if (!text) {
      return;
    }

    this.props.onCommentSubmit({ text: text, date: date });

    this.setState({ text: "", date: "" });
  }
  render() {
    return (
      <form className={this.props.className} onSubmit={this.handleSubmit}>
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
