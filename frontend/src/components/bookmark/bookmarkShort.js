import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon, Card, Image, Button } from "semantic-ui-react";
import Moment from "react-moment";

const ImageContainter = styled.div`
  position: relative;
  width: 100%;
`;

const ButtonStyled = styled(Button)`
  position: absolute;
  top: 9%;
  left: 95%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);

  cursor: pointer;

  &:hover {
  }
`;

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
        <ImageContainter>
          <Image
            style={{ objectFit: "cover", height: "240px", width: "100%" }}
            src={this.props.thumbnail}
            alt="image preview"
          />
          <ButtonStyled
            basic
            inverted
            circular
            icon="delete"
            onClick={e => {
              this.props.handleBookmarkDelete(this.props.id);
            }}
          />
        </ImageContainter>
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
