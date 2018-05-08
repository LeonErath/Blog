import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Div } from "../styledComponents";
import styled from "styled-components";
import BlogNewest from "./blogNewest";
import BlogTrending from "./blogTrending";
import BlogFeature from "./blogFeature";

const urlCheckAuth = "http://127.0.0.1:3030/api/loggedin";

const ButtonStyled = styled(Button)`
  float: right;
`;

const Background = styled.div`
  background-image: url("/images/concrete-texture.png");
  background-repeat: repeat;
`;

export default class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
    this.pollInterval = null;
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

  componentDidMount() {
    this.authenticate();
  }

  render() {
    return (
      <Background>
        <Div>
          {this.state.authenticated && (
            <Link to={`blog/create/0`}>
              <ButtonStyled basic color="gray" type="submit">
                Neuen Artikel schreiben
              </ButtonStyled>
            </Link>
          )}
          <BlogFeature />
          <br />
          <br />
          <BlogNewest />
          <BlogTrending />
        </Div>
      </Background>
    );
  }
}
