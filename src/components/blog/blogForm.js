import React, { Component } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea
} from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";

const url = "http://127.0.0.1:3030/api/article";

const Div = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
`;

const FromStyled = styled(Form)`
  width: 100%;
`;

const ArticleDiv = styled.div`
  border-radius: 2px 2px 5px 5px;
  padding: 10px 20px 20px 20px;
  max-width: 800px;
  width: 90%;
  background: #ffffff;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  color: #444;
  font-size: 1.2em;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const ButtonStyled = styled.div`
  margin-top: 10px;
`;

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      abstract: "",
      userID: "",
      content: "",
      date: "",
      topic: ""
    };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleHeadlineChange = this.handleHeadlineChange.bind(this);
    this.handleAbstractChange = this.handleAbstractChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleHeadlineChange(e) {
    this.setState({ headline: e.target.value });
  }
  handleAbstractChange(e) {
    this.setState({ abstract: e.target.value });
  }
  handleContentChange(e) {
    this.setState({ content: e.target.value });
  }
  handleAuthorChange(e) {
    this.setState({ userID: e.target.value });
  }
  handleTopicChange(e) {
    this.setState({ topic: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let userID = this.state.userID.trim();
    let content = this.state.content.trim();
    let headline = this.state.headline.trim();
    let abstract = this.state.abstract.trim();
    let topic = this.state.topic.trim();
    let date = new Date().toLocaleDateString();
    if (!content || !userID || !abstract || !headline || !topic) {
      return;
    }
    this.state.date = date;
    console.log(this.state);

    axios.post(url, this.state).catch(err => {
      console.error(err);
    });

    this.setState({
      author: "",
      content: "",
      date: "",
      headline: "",
      abstract: "",
      topic: ""
    });

    this.props.history.goBack();
  }
  render() {
    return (
      <Div>
        <ArticleDiv>
          <Title> Neuen Artikel erstellen </Title>

          <FromStyled onSubmit={this.handleSubmit}>
            <Form.Field
              required
              control={Input}
              label="Headline"
              placeholder="Headline"
              value={this.state.headline}
              onChange={this.handleHeadlineChange}
            />
            <Form.Field
              required
              control={Input}
              label="Abstract"
              placeholder="Abstract"
              value={this.state.abstract}
              onChange={this.handleAbstractChange}
            />
            <Form.Field
              required
              control={TextArea}
              style={{ minHeight: 400 }}
              label="Content"
              placeholder="Tell us your story..."
              value={this.state.content}
              onChange={this.handleContentChange}
            />

            <Form.Group>
              <Form.Field
                required
                width={8}
                control={Input}
                label="Topic"
                placeholder="Topic"
                value={this.state.topic}
                onChange={this.handleTopicChange}
              />
              <Form.Field
                required
                width={8}
                control={Input}
                label="Author"
                placeholder="Author"
                value={this.state.author}
                onChange={this.handleAuthorChange}
              />
            </Form.Group>
            <Form.Field
              required
              control={Checkbox}
              label="I agree to the Terms and Conditions"
            />
            <Form.Field control={Button}>Submit</Form.Field>
          </FromStyled>
        </ArticleDiv>
      </Div>
    );
  }
}
