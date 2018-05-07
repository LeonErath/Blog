import React from "react";
import styled from "styled-components";
import "normalize.css";
import { Statistic } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import Comment from "../comment/commentBox";
import Sidebar from "./sidebar";
import Moment from "react-moment";
var converter = require("number-to-words");

const urlCheckAuth = "http://127.0.0.1:3030/api/loggedin";

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
  font-size: 40px;
  line-height: 1;
  font-family: "Courier New", Courier, monospace;
  letter-spacing: 10px;
  color: #292929;
`;

const Div = styled.div`
  position: relative;
  background: #fff;
  width: 1000px;
  margin: -54px auto 0 auto;
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

const Content = styled.div`
  color: rgba(0, 0, 0, 0.84);

  font-style: normal;
  font-size: 20px;
  line-height: 1.58;
  font-weight: 400;
`;

const P = styled.div`
  font-family: "Courier New", Courier, monospace;
  white-space: pre-wrap;
  font-size: 20px;
  text-align: justify;
  text-justify: inter-word;
`;

const DivMargin = styled.div`
  margin: 0px 60px 10px 60px;
`;

const Abstract = styled.div`
  color: #3d2b2b;
  font-size: 26px;
  line-height: 1.2;
  text-align: center;
  font-family: "Courier New", Courier, monospace;
`;
const StatisticDiv = styled.div`
  text-align: center;
  display: table;
  margin: 0 auto;
`;
const Background = styled.div`
  background-image: url("/images/concrete-texture.png");
  background-repeat: repeat;
`;

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { author: { username: "" }, likes: 0, views: 0 },
      authenticated: false,
      loaded: false
    };
    this.goBack = this.goBack.bind(this);
    this.addLike = this.addLike.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.loadArticleFromServer = this.loadArticleFromServer.bind(this);
    this.addBookmark = this.addBookmark.bind(this);
  }

  authenticate = () => {
    axios.defaults.withCredentials = true;
    axios(urlCheckAuth, {
      method: "get",
      withCredentials: true
    }).then(res => {
      console.log("Blog Authentication", res.data);

      if (res.data) {
        if (res.data === "No authentication") {
          this.setState({ authenticated: false });
        } else {
          this.setState({ authenticated: true });
        }
      }
    });
  };

  loadArticleFromServer = () => {
    const id = this.props.match.params.id;
    console.log("ID", id);

    const url = `http://127.0.0.1:3030/api/article/${id}`;

    axios
      .get(url)
      .then(res => {
        console.log("Data", res.data);

        this.setState({ data: res.data, loaded: true });
      })
      .catch(err => {});
  };

  addView() {
    const id = this.props.match.params.id;
    const url = `http://127.0.0.1:3030/api/article/addView/${id}`;
    axios
      .put(url)
      .then(res => {
        console.log("VIEW", res.data);

        this.setState({ data: res.data });
      })
      .catch(err => {
        console.log("VIEW", err);
      });
  }

  addLike() {
    const id = this.props.match.params.id;
    const url = `http://127.0.0.1:3030/api/article/addLike/${id}`;
    axios
      .put(url)
      .then(res => {
        console.log("LIKE", res.data);
        this.setState({ data: res.data });
      })
      .catch(err => {
        console.log("LIKE", err);
      });
  }

  addBookmark() {
    const id = this.props.match.params.id;
    const url = `http://127.0.0.1:3030/api/user/addBookmark`;

    axios
      .put(url, { articleId: id })
      .then(res => {
        console.log("Bookmark ", res.data);
      })
      .catch(err => {
        console.log("Bookmark", err);
      });
  }

  componentDidMount() {
    this.addView();
    this.authenticate();
    this.loadArticleFromServer();
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <Background>
        <Div>
          <Sidebar
            id={this.props.match.params.id}
            title={this.state.data.headline}
            click={this.addLike}
            addBookmark={this.addBookmark}
          />

          <img
            style={{ width: "100%", objectFit: "cover", maxHeight: "500px" }}
            src={this.state.data.thumbnail}
            alt="preview"
          />

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
                <Author>
                  {" "}
                  {this.state.loaded && (
                    <i>{this.state.data.author.username}</i>
                  )}
                </Author>
              </Header3>
            </Header2>
          </Header>
          <br />
          <DivMargin>
            <br />
            <br />
            <Abstract>{this.state.data.abstract}</Abstract>
            <br />
            <br />
            <Content>
              <P>{this.state.data.content} </P>
            </Content>
            <br />
            <br />

            <StatisticDiv>
              <Statistic.Group size="tiny">
                <Statistic>
                  <Statistic.Value>
                    {converter.toWords(this.state.data.views)}
                  </Statistic.Value>
                  <Statistic.Label>Views</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>
                    {converter.toWords(this.state.data.likes)}
                  </Statistic.Value>
                  <Statistic.Label>Likes</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </StatisticDiv>

            <br />
            <br />
            <Comment articleID={this.state.data._id} />
            <br />
            <br />
          </DivMargin>
        </Div>
        <br />
        <br />
      </Background>
    );
  }
}
