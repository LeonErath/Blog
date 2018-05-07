import React from "react";
import styled from "styled-components";
import "normalize.css";
import { Button, Transition, Label, Popup } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon
} from "react-share";

const urlCheckAuth = "http://127.0.0.1:3030/api/loggedin";

const Div = styled.div`
  position: fixed;
  z-index: 1;
  top: 200px;
  left: 50px;
  text-align: center;
  overflow-x: hidden;
  padding: 8px 0;
`;

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      animation: "pulse",
      duration: 500,
      visible: true,
      animation2: "fade",
      duration2: 500,
      visible2: false,
      bookmarkColor: "teal",
      bookmarkPressed: false,
      popupMessage: "Loading..",
      counter: 0
    };
    this.clickLike = this.clickLike.bind(this);
    this.clickBookmark = this.clickBookmark.bind(this);
    this.clickTwitter = this.clickTwitter.bind(this);
    this.clickFacebook = this.clickFacebook.bind(this);
    this.checkBookmarks = this.checkBookmarks.bind(this);

    this.authenticate = this.authenticate.bind(this);
  }

  authenticate = () => {
    axios.defaults.withCredentials = true;
    axios(urlCheckAuth, {
      method: "get",
      withCredentials: true
    })
      .then(res => {
        console.log("Sidebar Authentication", res.data);

        if (res.data) {
          if (res.data === "No authentication") {
            this.setState({ authenticated: false });
          } else {
            this.setState({ authenticated: true });
            this.checkBookmarks(res.data.bookmarks);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  checkBookmarks(bookmarks) {
    console.log("Check Bookmark", bookmarks, this.props.id);

    bookmarks.array.forEach(bookmarkID => {
      if (bookmarkID === this.props.id) {
        this.setState({ bookmarkColor: "gray", bookmarkPressed: true });
      }
    });
  }

  clickLike(e) {
    e.preventDefault();
    if (this.state.counter < 15) {
      this.setState({
        visible2: true,
        visible: !this.state.visible,
        counter: this.state.counter + 1
      });

      this.props.click();

      setTimeout(
        function() {
          this.setState({ visible2: false });
        }.bind(this),
        1000
      );
    } else {
    }
  }
  clickBookmark(e) {
    e.preventDefault();
    if (this.state.authenticated) {
      this.setState({
        bookmarkColor: "gray",
        bookmarkPressed: true,
        popupMessage: "Added to bookmarks."
      });
      this.props.addBookmark();
    } else {
      this.setState({ popupMessage: "You need to be logged in." });
    }
  }
  clickFacebook(e) {
    e.preventDefault();
  }
  clickTwitter(e) {
    e.preventDefault();
  }

  componentDidMount() {
    this.authenticate();
  }

  render() {
    return (
      <Div>
        <Transition
          animation={this.state.animation2}
          duration={this.state.duration2}
          visible={this.state.visible2}
        >
          <Label style={{ marginBottom: "10px" }}>
            +{this.state.counter} Like
          </Label>
        </Transition>
        <br />
        <Transition
          animation={this.state.animation}
          duration={this.state.duration}
          visible={this.state.visible}
        >
          <Button
            circular
            icon="heart"
            size="huge"
            color="red"
            onClick={this.clickLike}
          />
        </Transition>
        <br />
        <br />
        <Popup
          trigger={
            <Button
              circular
              disabled={this.state.bookmarkPressed}
              icon="bookmark"
              color={this.state.bookmarkColor}
              onClick={this.clickBookmark}
            />
          }
          on="click"
          content={this.state.popupMessage}
          hideOnScroll
          position="top right"
        />

        <br />
        <br />
        <TwitterShareButton
          url={window.location.href}
          title={this.props.title}
          style={{
            display: "table",
            margin: "0 auto",
            cursor: "pointer"
          }}
        >
          <TwitterIcon size={36} round />
        </TwitterShareButton>
        <br />

        <FacebookShareButton
          url={window.location.href}
          quote={this.props.title}
          style={{
            display: "table",
            margin: "0 auto",
            cursor: "pointer"
          }}
        >
          <FacebookIcon size={36} round />
        </FacebookShareButton>
        <br />
      </Div>
    );
  }
}
