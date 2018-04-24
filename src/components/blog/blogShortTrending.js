import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon, Label } from "semantic-ui-react";
import Moment from "react-moment";

const DateDiv = styled.div`
  margin-top: 10px;
  color: #9e9e9e;
  font-size: 14px;
`;

const Div = styled.div`
  margin: 16px;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const Div1 = styled.div`
  width: 80%;
`;

const DivMargin = styled.div`
  margin: 10px;
`;

const Div2 = styled.div`
  position: absolute;
  width: 20%;
  height: 100%;

  text-align: right;
  float: left;
  height: 100%;
  right: 0;
  top: 0;
`;

const Headline = styled.h2`
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
      <Div>
        <Div1>
          <Link to={`blog/${this.props.id}`}>
            <Headline>{this.props.headline}</Headline>

            <DateDiv>
              {" "}
              <Moment fromNow>{this.props.date}</Moment>
            </DateDiv>
          </Link>

          {this.props.author}
          <br />
          <Abstract>{this.props.abstract}</Abstract>
        </Div1>
        <Div2>
          <DivMargin>
            <Label>
              <Icon name="heart" />
              {this.props.likes}
              <Label.Detail>Likes</Label.Detail>
            </Label>
          </DivMargin>
        </Div2>
      </Div>
    );
  }
}
