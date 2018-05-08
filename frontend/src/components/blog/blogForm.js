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
import Dropzone from "react-dropzone";

const url = "http://127.0.0.1:3030/api/article/create";
const urlEdit = "http://127.0.0.1:3030/api/article/";
const urlCheckAuth = "http://127.0.0.1:3030/api/loggedin";

const FromStyled = styled(Form)`
  width: 100%;
`;
const Background = styled.div`
  background-image: url("/images/concrete-texture.png");
  background-repeat: repeat;
`;
const DivDrop = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  width: 100%;
  border: 1px dashed #ccc !important;
  border-radius: 16px;
  height: 200px;
`;

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      abstract: "",
      content: "",
      date: "",
      topic: "",
      message: "",
      header: "",
      file: "",
      edit: false,
      data: { author: { username: "" }, likes: 0, views: 0 },
      loaded: false,
      loadingRequest: false,
      successRequest: false,
      failureRequest: false
    };

    this.handleHeadlineChange = this.handleHeadlineChange.bind(this);
    this.handleAbstractChange = this.handleAbstractChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDropRejected = this.handleDropRejected.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.loadArticleFromServer = this.loadArticleFromServer.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.createArticle = this.createArticle.bind(this);
  }

  authenticate = () => {
    axios.defaults.withCredentials = true;
    axios(urlCheckAuth, {
      method: "get",
      withCredentials: true
    })
      .then(res => {})
      .catch(err => {
        console.log("need to go back");

        this.props.history.goBack();
      });
  };

  handleHeadlineChange(e) {
    if (e.target.value.length < 50) {
      this.setState({ headline: e.target.value });
    }
  }
  handleAbstractChange(e) {
    if (e.target.value.length < 80) {
      this.setState({ abstract: e.target.value });
    }
  }
  handleContentChange(e) {
    this.setState({ content: e.target.value });
  }
  handleTopicChange(e) {
    this.setState({ topic: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loadingRequest: true });

    let content = this.state.content.trim();
    let headline = this.state.headline.trim();
    let abstract = this.state.abstract.trim();
    let topic = this.state.topic.trim();
    if (!content || !abstract || !headline || !topic) {
      console.log("some fields are empty");
      return;
    }
    let formData = new FormData();
    formData.append("thumbnail", this.state.file);
    formData.append("content", content);
    formData.append("headline", headline);
    formData.append("abstract", abstract);
    formData.append("topic", topic);
    formData.append("date", new Date());

    let article = {
      headline: headline,
      abstract: abstract,
      content: content,
      topic: topic,
      date: new Date()
    };

    if (this.state.edit) {
      this.updateArticle(article);
    } else {
      this.createArticle(formData);
    }
  }

  createArticle = formData => {
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(response);

        this.setState({
          content: "",
          headline: "",
          abstract: "",
          topic: "",
          file: "",
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
  };

  updateArticle = article => {
    var urlEdit2 = urlEdit + this.props.match.params.id;

    axios
      .put(urlEdit2, article)
      .then(response => {
        console.log(response);

        this.setState({
          content: "",
          headline: "",
          abstract: "",
          topic: "",
          file: "",
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
  };

  loadArticleFromServer = () => {
    const id = this.props.match.params.id;
    console.log("ID", id);

    const url = `http://127.0.0.1:3030/api/article/${id}`;

    axios
      .get(url)
      .then(res => {
        console.log("Data", res.data);

        this.setState({
          headline: res.data.headline,
          abstract: res.data.abstract,
          content: res.data.content,
          topic: res.data.topic,
          file: { preview: res.data.thumbnail }
        });
      })
      .catch(err => {});
  };

  componentDidMount() {
    this.authenticate();
    if (this.props.match.params.id != 0) {
      this.setState({ edit: true });
      this.loadArticleFromServer();
    } else {
      this.setState({ edit: false });
    }
  }
  handleDrop(acceptedFiles, rejectedFiles) {
    if (acceptedFiles.length === 1) {
      console.log(acceptedFiles[0]);

      this.setState({ file: acceptedFiles[0] });
    }
  }
  handleDropRejected(acceptedFiles, rejectedFiles) {}

  render() {
    return (
      <Background>
        <Div>
          <HeadlineCenter>
            {this.state.edit ? "Artikel bearbeiten" : "Neuen Artikel erstellen"}{" "}
          </HeadlineCenter>

          <FromStyled>
            <Form.Field required label="Thumbnail" placeholder="Thumbnail" />
          </FromStyled>
          <Dropzone
            maxSize={1000000}
            className="dragAndDropArea"
            onDrop={this.handleDrop}
            accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png"
            multiple={false}
            onDropRejected={this.handleDropRejected}
          >
            <DivDrop>
              {this.state.file === "" && (
                <center>
                  <br />
                  <br />
                  <br />
                  <h3>Drag 'n' Drop Thumbnail</h3>
                </center>
              )}

              {this.state.file !== "" && (
                <center>
                  <img
                    src={this.state.file.preview}
                    alt="preview"
                    height={200}
                  />
                </center>
              )}
            </DivDrop>
          </Dropzone>
          {this.state.file !== "" &&
            this.state.edit == false && (
              <center>
                <Button
                  basic
                  color="grey"
                  style={{ margin: "4px" }}
                  onClick={() => {
                    this.setState({ file: "" });
                  }}
                >
                  Delete
                </Button>
              </center>
            )}

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
            </Form.Group>
            <Form.Field
              required
              control={Checkbox}
              checked={this.state.edit}
              label="I agree to the Terms and Conditions"
            />
            <Form.Field basic color="grey" control={Button}>
              {this.state.edit ? "Save" : "Create"}
            </Form.Field>
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
      </Background>
    );
  }
}
