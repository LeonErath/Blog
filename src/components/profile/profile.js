import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import { Div } from "../styledComponents";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import Dashboard from "./dashboard.js";

var moment = require("moment");

const urlCheckAuth = "http://127.0.0.1:3030/api/loggedin";
const urlGetProfile = "http://127.0.0.1:3030/api/user/getProfile";
const urlGetArticles = "http://127.0.0.1:3030/api/article/getAll";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      articleList: [],
      authenticated: false,
      totalViews: 0,
      totalLikes: 0
    };
    this.authenticate = this.authenticate.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getArticle = this.getArticle.bind(this);
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

        this.setState({ articleList: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.authenticate();
    this.getProfile();
    this.getArticle();
  }

  render() {
    var section1;
    if (this.state.articleList !== undefined) {
      section1 = this.state.articleList.map(article => {
        this.state.totalViews += article.views;
        this.state.totalLikes += article.likes;
        return (
          <div>
            <Link to={`blog/${article._id}`}>Headline: {article.headline}</Link>
            <br />
            Topic: {article.topic}
            <br />
            Date: <Moment format="HH:mm DD.MM.YYYY" date={article.date} />
            <br />
            Views: {article.views}
            <br />
            Likes: {article.likes}
            <hr />
          </div>
        );
      });
    }

    return (
      <Div>
        <h1>Profile</h1>
        Username: {this.state.profile.username}
        <br />
        E-Mail: {this.state.profile.email}
        <br />
        Permissions: {this.state.profile.permission}
        <br />
        Total Views: {this.state.totalViews}
        <br />
        Total Like: {this.state.totalLikes}
        <br />
        <Dashboard data={this.state.articleList} />
        <h1>Articles</h1>
        {section1}
      </Div>
    );
  }
}
