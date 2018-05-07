import React, { Component } from "react";
import Moment from "react-moment";
import styled from "styled-components";
import { Button } from "semantic-ui-react";

const Image = styled.div`
  display: inline-block;
  height: 60px;
  width: 60px;
`;

const DivImage = styled.div`
  padding-left: 16px;
  vertical-align: top;

  height: 60px;
  flex: 1;
  display: inline-block;
`;

const DivButton = styled.div`
  text-align: right;
  flex: 2;
  display: inline-block;
  height: 60px;
`;
const DivContent = styled.div`
  padding-left: 16px;
  vertical-align: top;
  height: 60px;
  flex: 12;
  display: inline-block;
`;

const Div = styled.div`
  margin-top: 16px;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
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
      <Div>
        <DivImage>
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
        </DivImage>
        <DivContent>
          <Author>{this.props.author}</Author>
          <Date>
            <Moment fromNow>{this.props.date}</Moment>
          </Date>
          <Content>{this.props.text}</Content>
        </DivContent>
        {this.props.currentUser.userId === this.props.userId && (
          <DivButton>
            <Button
              style={{ marginTop: "8px" }}
              basic
              color="gray"
              onClick={e => this.props.handleDelete(this.props.id)}
            >
              Delete
            </Button>
          </DivButton>
        )}
      </Div>
    );
  }
}
