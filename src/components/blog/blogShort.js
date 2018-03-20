import React, { Component } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const Date = styled.div`
  margin-top: 10px;
  color: #9e9e9e;
  font-size: 14px;
`;

const Div = styled.div`
  padding: 16px;
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
    console.log(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("pressed button");
  }

  render() {
    return (
      <Div>
        <Link to={`blog/${this.props.id}`}>
          <Headline>{this.props.headline}</Headline>

          <Date>{this.props.date}</Date>
        </Link>

        {this.props.author}
        <br />
        <Abstract>{this.props.abstract}</Abstract>
      </Div>
    );
  }
}
