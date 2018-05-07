import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import { Div } from "../styledComponents";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import Dashboard from "./dashboard.js";
import { Header, Table, Button, Popup, Statistic } from "semantic-ui-react";
import styled from "styled-components";
var converter = require("number-to-words");

const urlCheckAuth = "http://127.0.0.1:3030/api/loggedin";
const urlGetProfile = "http://127.0.0.1:3030/api/user/getProfile";
const urlGetArticles = "http://127.0.0.1:3030/api/article/getAll";
const urlDeleteArticle = "http://127.0.0.1:3030/api/article/";

const DivButton = styled.div`
  display: flex;
`;

const ProfileDiv = styled.div`
  text-align: center;
  display: table;
  margin: 0 auto;
`;

const Background = styled.div`
  background-image: url("/images/concrete-texture.png");
  background-repeat: repeat;
`;
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      articleList: [],
      authenticated: false,
      totalViews: 0,
      totalArticle: 0,
      totalLikes: 0
    };
    this.authenticate = this.authenticate.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.articleDelete = this.articleDelete.bind(this);
    this.articleEdit = this.articleEdit.bind(this);
    this.pollInterval = null;
  }
  authenticate = () => {
    axios.defaults.withCredentials = true;
    axios(urlCheckAuth, {
      method: "get",
      withCredentials: true
    })
      .then(res => {
        console.log("Profile Authentication", res.data);

        if (res.data) {
          if (res.data === "No authentication") {
            this.setState({ authenticated: false });
            this.props.history.goBack();
          } else {
            this.setState({ authenticated: true });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  getProfile = () => {
    axios.defaults.withCredentials = true;
    axios(urlGetProfile, {
      method: "get",
      withCredentials: true
    })
      .then(res => {
        console.log("Profile", res.data);
        this.setState({ profile: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getArticle = () => {
    axios.defaults.withCredentials = true;
    axios(urlGetArticles, {
      method: "get",
      withCredentials: true
    })
      .then(res => {
        console.log("Articles", res.data);

        if (res.data !== undefined) {
          var likes = 0;
          var views = 0;
          var articleCount = 0;
          res.data.map(article => {
            likes += article.likes;
            views += article.views;
            articleCount += 1;
          });
          this.setState({
            articleList: res.data,
            totalLikes: likes,
            totalViews: views,
            totalArticle: articleCount
          });
          console.log(this.state);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  articleDelete(id) {
    axios.defaults.withCredentials = true;
    var urlDelete = urlDeleteArticle + id;
    axios(urlDelete, {
      method: "delete",
      withCredentials: true
    })
      .then(res => {
        this.setState({
          articleList: this.state.articleList.filter(
            article => article._id !== id
          )
        });
        console.log(this.state.articleList);
      })
      .catch(err => {
        console.log(err);
      });
  }

  articleEdit(e) {
    e.preventDefault();
    console.log("Edit");
  }

  componentDidMount() {
    this.authenticate();
    this.getProfile();
    this.getArticle();
  }

  render() {
    var section1;
    if (this.state.articleList !== undefined) {
      section1 = this.state.articleList.map(article => {
        return (
          <Table.Row>
            <Table.Cell singleLine>
              <Moment fromNow>{article.date}</Moment>
            </Table.Cell>
            <Table.Cell>
              <Link to={`blog/${article._id}`}>{article.headline}</Link>
            </Table.Cell>
            <Table.Cell> {article.topic}</Table.Cell>
            <Table.Cell>{article.views}</Table.Cell>
            <Table.Cell>{article.likes}</Table.Cell>
            <Table.Cell>
              <DivButton>
                <Popup
                  trigger={<Button color="red" circular icon="delete" />}
                  content={
                    <Button
                      color="green"
                      onClick={() => this.articleDelete(article._id)}
                      content="Are you sure?"
                    />
                  }
                  on="click"
                  position="top left"
                />

                <Button circular onClick={this.articleEdit} icon="edit" />
              </DivButton>
            </Table.Cell>
          </Table.Row>
        );
      });
    }

    return (
      <Background>
        <Div>
          <h1>Profile</h1>
          <div>
            <ProfileDiv>
              <Header as="h2" icon textAlign="center">
                <img
                  src={this.state.profile.profilePicture}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "50%"
                  }}
                  alt="profile"
                />
                <Header.Content
                  style={{
                    marginTop: "16px",
                    fontFamily: "Courier New, Courier, monospace"
                  }}
                >
                  {this.state.profile.username}
                </Header.Content>
              </Header>
              <h3
                style={{
                  marginTop: "-16px",
                  fontFamily: "Courier New, Courier, monospace"
                }}
              >
                {this.state.profile.email}
              </h3>
              <br />
              <br />
              <div>
                <Statistic.Group size="tiny">
                  <Statistic>
                    <Statistic.Value>{this.state.totalViews}</Statistic.Value>
                    <Statistic.Label>Views</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>
                      {converter.toWords(this.state.totalLikes)}
                    </Statistic.Value>
                    <Statistic.Label>Likes</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>{this.state.totalArticle}</Statistic.Value>
                    <Statistic.Label>Articles</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </div>
              <br />
            </ProfileDiv>
          </div>
          <Dashboard data={this.state.articleList} />
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="3">Articles</Table.HeaderCell>
                <Table.HeaderCell colSpan="1">Views</Table.HeaderCell>
                <Table.HeaderCell colSpan="1">Likes</Table.HeaderCell>
                <Table.HeaderCell colSpan="1">Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{section1}</Table.Body>
          </Table>
        </Div>
      </Background>
    );
  }
}
