import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

const urlCheckAuth = "http://127.0.0.1:3030/api/bookmarks";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
    this.pollInterval = null;
  }
  loadCommentsFromServer = () => {
    axios.defaults.withCredentials = true;
    axios(urlCheckAuth, {
      method: "get",
      withCredentials: true
    }).then(res => {
      console.log("BlogList Authentication", res.data);

      if (res.data) {
        if (res.data === "No authentication") {
          this.setState({ authenticated: false });
        } else {
          this.setState({ authenticated: true });
        }
      }
    });
  };

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
      </div>
    );
  }
}
