import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon, Card, Button, Image, Segment, Label } from "semantic-ui-react";
import axios from "axios";
import Moment from "react-moment";

const DateDiv = styled.div`
  text-align: right;
  display: inline-block;
  width: 30%;
  margin-top: -8px;
  font-family: "Courier New", Courier, monospace;
  color: #7f5959;
  font-size: 14px;
`;

const Headline = styled.h2`
  display: inline-block;
  font-family: "Courier New", Courier, monospace;
  width: 70%;
  text-align: left;
  color: #292929;
`;

const Abstract = styled.div`
  font-family: "Courier New", Courier, monospace;
  color: #292929;
  font-size: 14px;
  max-height: 3.6em;
  line-height: 1.8em;
  text-align: justify;
`;
export default class BookmarkShort extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.deleteBookmark(this.props.id);
  }

  render() {
    return (
      <Card>
        <Image
          style={{ objectFit: "cover", height: "240px" }}
          src={this.props.thumbnail}
          alt="image preview"
        />
        <Card.Content header>
          <Link to={`blog/${this.props.id}`}>
            <Headline>{this.props.headline}</Headline>
            <DateDiv>
              <Moment fromNow>{this.props.date}</Moment>
            </DateDiv>
          </Link>

          <Abstract>{this.props.abstract}</Abstract>
        </Card.Content>

        <Card.Content extra>
          <div
            style={{
              display: "inline-block",
              width: "50%",
              textAlign: "center"
            }}
          >
            <Icon name="line chart" />
            {this.props.views} Views
          </div>
          <div
            style={{
              display: "inline-block",
              width: "50%",
              textAlign: "center"
            }}
          >
            <Icon name="heart" />
            {this.props.likes} Likes
          </div>
        </Card.Content>
      </Card>
    );
  }
}
