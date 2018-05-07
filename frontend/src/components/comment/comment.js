import React, { Component } from "react";
import Moment from "react-moment";
import styled from "styled-components";
import { Button } from "semantic-ui-react";

const Image = styled.div`
  display: inline-block;
  height: 60px;
  width: 60px;
`;

const Div = styled.div`
  padding-left: 16px;
  vertical-align: top;
  display: inline-block;
  height: 60px;
  width: 500px;
`;

const Author = styled.div`
  display: inline;
  font-size: 12px;
  line-height: 1;
  font-family: "Courier New", Courier, monospace;
  color: #292929;
`;
const Date = styled.div`
  font-style: italic;
  padding-left: 8px;
  display: inline;
  font-size: 12px;
  font-family: "Courier New", Courier, monospace;
  color: #7f5959;
`;
const Content = styled.div`
  font-size: 14px;
  word-wrap: break-word;
  width: 100%;
  max-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #292929;
  font-family: "Courier New", Courier, monospace;
`;

export default class CommentObj extends Component {
  render() {
    return (
      <div>
        <Image>
          <img
            alt="Profile"
            src={this.props.profile}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%"
            }}
          />
        </Image>
        <Div>
          <Author>{this.props.author}</Author>
          <Date>
            <Moment fromNow>{this.props.date}</Moment>
          </Date>
          <Content>{this.props.text}</Content>
        </Div>
        {this.props.currentUser.userId === this.props.userId && (
          <Div>
            <Button
              style={{ width: "160px", marginTop: "20px" }}
              basic
              color="gray"
              onClick={e => this.props.handleDelete(this.props.id)}
            >
              Delete
            </Button>
          </Div>
        )}
      </div>
    );
  }
}
