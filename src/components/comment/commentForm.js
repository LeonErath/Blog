import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";
import styled from "styled-components";

const InputStyled = styled(Input)`
  width: 300px;
`;

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", date: "" };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(e) {
    if (e.target.value.length < 100) {
      this.setState({ text: e.target.value });
    }
  }
  handleSubmit(e) {
    e.preventDefault();

    let text = this.state.text.trim();
    let date = new Date();
    if (!text) {
      return;
    }

    this.props.onCommentSubmit({ text: text, date: date });

    this.setState({ text: "", date: "" });
  }
  render() {
    return (
      <form
        className={this.props.className}
        onSubmit={this.handleSubmit}
        style={{ width: "100%", textAlign: "center" }}
      >
        <InputStyled
          type="text"
          placeholder="Comment..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <Button
          basic
          color="gray"
          type="submit"
          value="Post"
          style={{ margin: "8px" }}
        >
          Posten
        </Button>
      </form>
    );
  }
}
