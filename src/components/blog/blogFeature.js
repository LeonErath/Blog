import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Moment from "react-moment";

const urlFeatured = "http://127.0.0.1:3030/api/article/featured";

const Header = styled.div`
  border: black;
  display: block;
  box-sizing: border-box;
`;

const Header2 = styled.div`
  margin-top: 8px;
  display: inline-block;
  width: 100%;
`;
const Header3 = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: 25%;
`;
const Header4 = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: 50%;
`;
const Title = styled.div`
  margin-top: 8px;
  text-align: center;
  line-height: 0.9;
  font-size: 40px;
  font-family: "Courier New", Courier, monospace;
  letter-spacing: 10px;
  color: #292929;
`;

const Div = styled.div`
  position: relative;
  background: #fff;
  width: 1000px;
  margin: -50px auto 40px auto;
  box-shadow: 0 20px 40px rgba(100, 100, 100, 0.1);
`;

const Date = styled.div`
  padding: 8px;
  text-align: center;
  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
  color: #7f5959;
`;

const Author = styled.div`
  padding: 8px;
  text-align: center;
  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
  color: #7f5959;
`;

export default class BlogTrending extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: { author: { username: "" } } };
  }

  loadFeature = () => {
    axios.defaults.withCredentials = true;
    axios.get(urlFeatured, { withCredentials: true }).then(res => {
      if (res.data) {
        console.log("BlogFeature", res.data);
        this.setState({ data: res.data });
      }
    });
  };

  componentDidMount() {
    console.log("fired");

    this.loadFeature();
  }

  render() {
    return (
      <div>
        <h1>Featured</h1>
        <br />
        {this.state.data.author.username != "" && (
          <Link to={`blog/` + this.state.data._id}>
            <img
              style={{ width: "100%", objectFit: "cover", maxHeight: "300px" }}
              src={this.state.data.thumbnail}
              alt="image preview"
            />
            <br />

            <Header>
              <Header2>
                <Header3>
                  <Date>
                    <Moment fromNow>{this.state.data.date}</Moment>
                  </Date>
                </Header3>
                <Header4>
                  <Title>{this.state.data.headline}</Title>
                </Header4>
                <Header3>
                  <Author>{this.state.data.author.username}</Author>
                </Header3>
              </Header2>
            </Header>
          </Link>
        )}
      </div>
    );
  }
}
