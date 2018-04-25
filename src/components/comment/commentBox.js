import React from "react";
import "normalize.css";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import CommentForm from "./commentForm.js";
import CommentList from "./commentList.js";
import styled from "styled-components";
import { Divider } from "semantic-ui-react";

const CommentFormStyled = styled(CommentForm)`
  margin-top: 10px;
`;

var url = "http://127.0.0.1:3030/api/comment?articleID=";
const urlCheckAuth = "http://127.0.0.1:3030/api/loggedin";

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], authenticated: false };
    this.authenticate = this.authenticate.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.pollInterval = null;
  }

  authenticate = () => {
    axios.defaults.withCredentials = true;
    axios(urlCheckAuth, {
      method: "get",
      withCredentials: true
    }).then(res => {
      console.log("CommentBox Authentication", res.data);

      if (res.data) {
        if (res.data === "No authentication") {
          this.setState({ authenticated: false });
        } else {
          this.setState({ authenticated: true });
        }
      }
    });
  };

  handleCommentSubmit(comment) {
    if (this.state.authenticated) {
      let comments = this.state.data;
      comment.id = Date.now();
      comment.articleID = this.props.articleID;

      axios
        .post(url, comment)
        .then(res => {
          let newComments = comments.concat([res.data]);
          this.setState({ data: newComments });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  loadCommentsFromServer = () => {
    if (this.props.articleID !== undefined) {
      var url2 = url + this.props.articleID;

      axios
        .get(url2)
        .then(res => {
          if (res.status) this.setState({ data: res.data });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  componentDidMount() {
    this.authenticate();
    this.loadCommentsFromServer();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.articleID !== this.props.articleID) {
      console.log("ID:" + this.props.articleID);
      this.authenticate();
      this.loadCommentsFromServer();
    }
  }

  render() {
    return (
      <div>
        <Divider horizontal>Comments</Divider>
        <CommentList data={this.state.data} />
        {this.state.authenticated && (
          <CommentFormStyled onCommentSubmit={this.handleCommentSubmit} />
        )}
      </div>
    );
  }
}
