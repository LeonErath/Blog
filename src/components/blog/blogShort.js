import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Icon, Card, Button, Image, Segment, Label } from "semantic-ui-react";

const DateDiv = styled.div`
  margin-top: 10px;
  color: #9e9e9e;
  font-size: 14px;
`;

const Div = styled.div`
  text-align: center;
`;

const DivMargin = styled.div`
  display: inline-block;
  padding: 4px;
`;

const Headline = styled.h2`
  padding-top: 16px;
  text-align: left;
  color: black;
`;

const Abstract = styled.div`
  margin-top: 8px;
  color: #9e9e9e;
  font-size: 14px;
  text-align: justify;
`;
export default class BlogShort extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("pressed button");
  }

  render() {
    return (
      <Card>
        <Card.Content header>
          <Label as="a" color="red" attached="top right">
            {this.props.topic}
          </Label>
          <Link to={`blog/${this.props.id}`}>
            <Headline>{this.props.headline}</Headline>

            <DateDiv>
              {" "}
              <Moment fromNow>{this.props.date}</Moment>
            </DateDiv>
          </Link>
          {this.props.author}
        </Card.Content>
        <Card.Content description={this.props.abstract} />

        <Card.Content extra>
          <Div>
            <DivMargin>
              <Icon name="line chart" />
              {this.props.views} Views
            </DivMargin>
            <DivMargin>
              <Icon name="heart" />
              {this.props.likes} Likes
            </DivMargin>
          </Div>
        </Card.Content>
      </Card>
    );
  }
}
