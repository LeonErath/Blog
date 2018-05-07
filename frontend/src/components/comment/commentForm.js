import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";
import styled from "styled-components";

const InputStyled = styled(Input)`
  width: 100%;
`;

const ParentDiv = styled.div`
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;

  align-items: center;
  width: 60%;
  margin: 0 auto;
`;
const Div = styled.div`
  flex: 1;
`;
const Div2 = styled.div`
  flex: 3;
`;
export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", date: "", user: { profile: "" } };
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
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.user !== this.state.user) {
      this.setState({ user: nextProps.user });
    }
  }

  render() {
    return (
      <form
        className={this.props.className}
        onSubmit={this.handleSubmit}
        style={{ width: "100%", textAlign: "center" }}
      >
        <ParentDiv>
          <Div>
            <img
              alt="Profile"
              src={this.state.user.profile}
              style={{
                margin: "8px",
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "50%"
              }}
            />
          </Div>
          <Div2>
            <InputStyled
              type="text"
              placeholder="Comment..."
              value={this.state.text}
              onChange={this.handleTextChange}
            />
          </Div2>
          <Div>
            <Button basic color="gray" type="submit" value="Post">
              Posten
            </Button>
          </Div>
        </ParentDiv>
      </form>
    );
  }
}
