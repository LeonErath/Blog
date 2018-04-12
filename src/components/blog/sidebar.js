import React from "react";
import styled from "styled-components";
import "normalize.css";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

const urlCheckAuth = "http://127.0.0.1:3030/api/loggedin";

const Div = styled.div`
  position: fixed;
  z-index: 1;
  top: 200px;
  left: 40px;
  text-align: center;
  overflow-x: hidden;
  padding: 8px 0;
`;

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
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
    this.props.click();
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
        <Button circular icon="heart" size="huge" onClick={this.clickLike} />
        <br />
        <br />
        <Button circular icon="bookmark" onClick={this.clickBookmark} />
        <br />
        <br />
        <Button circular icon="twitter" onClick={this.clickTwitter} />
        <br />
        <br />
        <Button circular icon="facebook" onClick={this.clickFacebook} />
        <br />
      </Div>
    );
  }
}
