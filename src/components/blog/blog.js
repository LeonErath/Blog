import React from "react";
import styled from "styled-components";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

const Title = styled.h2`
  text-align: center;
  color: black;
`;

const Div = styled.div`
  position: relative;
  background: #fff;
  padding: 50px;
  width: 600px;
  margin: 0 auto 0 auto;
  box-shadow: 0 20px 40px rgba(100, 100, 100, 0.1);
`;

const Date = styled.div`
  color: #9e9e9e;
  font-size: 14px;
`;

const Content = styled.div`
  font-size: 14px;
  text-align: justify;
`;
export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: { author: {} } };
  }

  loadCommentsFromServer = () => {
    const id = this.props.match.params.id;
    console.log(id);

    const url = `http://127.0.0.1:3030/api/article/${id}`;

    axios.get(url).then(res => {
      this.setState({ data: res.data });
      console.log(this.state.data);
    });
  };

  componentDidMount() {
    console.log("fired");

    this.loadCommentsFromServer();
  }

  render() {
    return (
      <Div>
        <br />
        <Title>{this.state.data.headline}</Title>

        <br />
        <i>{this.state.data.author.name}</i>
        <Date>{this.state.data.date}</Date>
        <br />
        <br />
        <Abstract>{this.state.data.abstract}</Abstract>
        <br />
        <br />
        <Content>
          {String(this.state.data.content)
            .split("\n")
            .map(function(item) {
              return (
                <span>
                  {item}
                  <br />
                </span>
              );
            })}
        </Content>
      </Div>
    );
  }
}
