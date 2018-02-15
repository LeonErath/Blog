import React from "react";
import ReactDOM from "react-dom";
import "./about.css";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";

class About extends React.Component {
  render() {
    return <h1>About me</h1>;
  }
}

ReactDOM.render(<App name="Leon" />, document.getElementById("app"));
