import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon, Card } from "semantic-ui-react";
import Moment from "react-moment";

const DateDiv = styled.div`
  vertical-align: top;
  display: inline-block;
  font-family: "Courier New", Courier, monospace;
  color: #7f5959;
  text-align: right;
  width: 30%;
  font-size: 14px;
`;

const Image = styled.img`
  object-fit: cover;
  max-height: 170px;
  flex: 3;
  width: 100%;
  height: 100%;
  min-width: 0;
`;
const DivContent = styled.div`
  padding: 16px;
  flex: 7;
  display: inline-block;
`;

const Headline = styled.h2`
  vertical-align: top;
  font-family: "Courier New", Courier, monospace;
  display: inline-block;
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

const Stats = styled.div`
  color: rgba(0, 0, 0, 0.4);
  display: inline;
  padding-left: 6px;
  padding-right: 6px;
`;

const End = styled.div`
  margin: 8px;
  position: absolute;
  bottom: 0;
`;
const Div = styled.div`
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
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
      <Card style={{ width: "auto", marginBottom: "32px" }}>
        <Div>
          <Image src={this.props.thumbnail} />

          <DivContent>
            <Link to={`blog/${this.props.id}`}>
              <Headline>{this.props.headline}</Headline>
              <DateDiv>
                <Moment fromNow>{this.props.date}</Moment>
              </DateDiv>
              <Abstract>{this.props.abstract}</Abstract>
            </Link>
            <br />
            <End>
              <Icon
                name="line chart"
                color="grey"
                style={{ display: "inline" }}
              />
              <Stats>{this.props.views} Views</Stats>
              <Icon name="heart" color="grey" style={{ display: "inline" }} />
              <Stats>{this.props.likes} Likes</Stats>
            </End>
          </DivContent>
        </Div>
      </Card>
    );
  }
}
