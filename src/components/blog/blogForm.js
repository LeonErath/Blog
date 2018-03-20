import React, { Component } from "react";
import {
  Button,
  Message,
  Checkbox,
  Form,
  Input,
  TextArea
} from "semantic-ui-react";
import { Div, HeadlineCenter } from "../styledComponents";
import styled from "styled-components";
import axios from "axios";

const url = "http://127.0.0.1:3030/api/article";

const FromStyled = styled(Form)`
  width: 100%;
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
      topic: "",
      message: "",
      header: "",
      loadingRequest: false,
      successRequest: false,
      failureRequest: false
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
    this.setState({ loadingRequest: true });

    let userID = this.state.userID.trim();
    let content = this.state.content.trim();
    let headline = this.state.headline.trim();
    let abstract = this.state.abstract.trim();
    let topic = this.state.topic.trim();
    if (!content || !userID || !abstract || !headline || !topic) {
      return;
    }
    var article = {
      userID: userID,
      content: content,
      headline: headline,
      abstract: abstract,
      topic: topic,
      date: new Date().toLocaleDateString()
    };
    console.log(article);

    axios
      .post(url, article)
      .then(response => {
        console.log(response);

        this.setState({
          userID: "",
          content: "",
          headline: "",
          abstract: "",
          topic: "",
          message: response.data.message,
          header: "Article successfully added",
          loadingRequest: false,
          failureRequest: false,
          successRequest: true
        });
      })
      .catch(err => {
        console.log(err.response);

        this.setState({
          message: err.response.statusText,
          header: "An Error occurred",
          loadingRequest: false,
          successRequest: false,
          failureRequest: true
        });
      });
  }

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <Div>
        <HeadlineCenter> Neuen Artikel erstellen </HeadlineCenter>

        <FromStyled
          loading={this.state.loadingRequest}
          success={this.state.successRequest}
          error={this.state.failureRequest}
          onSubmit={this.handleSubmit}
        >
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
          {this.state.successRequest ? (
            <Message
              success
              header={this.state.header}
              content={this.state.message}
            />
          ) : null}

          {this.state.failureRequest ? (
            <Message
              error
              header={this.state.header}
              content={this.state.message}
            />
          ) : null}
        </FromStyled>
      </Div>
    );
  }
}
