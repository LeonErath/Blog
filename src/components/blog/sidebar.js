import React from "react";
import styled from "styled-components";
import "normalize.css";
import { Button, Transition, Label } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

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
      counter: 0
    };
    this.clickLike = this.clickLike.bind(this);
    this.clickBookmark = this.clickBookmark.bind(this);
    this.clickTwitter = this.clickTwitter.bind(this);
    this.clickFacebook = this.clickFacebook.bind(this);

    this.authenticate = this.authenticate.bind(this);
  }

  authenticate = () => {
    axios.defaults.withCredentials = true;
    axios(urlCheckAuth, {
      method: "get",
      withCredentials: true
    }).then(res => {
      console.log("BlogList Authentication", res.data);

      if (res.data) {
        if (res.data === "No authentication") {
          this.setState({ authenticated: false });
        } else {
          this.setState({ authenticated: true });
        }
      }
    });
  };

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

    this.props.addBookmark();
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
        <Button
          circular
          icon="bookmark"
          color="teal"
          onClick={this.clickBookmark}
        />
        <br />
        <br />
        <Button
          circular
          icon="twitter"
          color="twitter"
          onClick={this.clickTwitter}
        />
        <br />
        <br />
        <Button
          circular
          icon="facebook"
          color="facebook"
          onClick={this.clickFacebook}
        />
        <br />
      </Div>
    );
  }
}
