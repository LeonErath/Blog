import React from "react";
import ReactDOM from "react-dom";
import "./about.css";

export default class About extends React.Component {
  render() {
    return (
      <div>
        <center>
          <div className="grid-container">
            <div className="grid-item1">
              <img src="./images/leon_sqaure.png" alt="me" />
            </div>
            <div className="grid-item2">
              Hi, my name is Leon Erath. I am 18 years old, living in Mannheim
              Germany. I'm young Guy, who wants to share my ideas and concepts.
              I love developing Apps and want to take you with me, on my way to
              become a Developer. I know it is hard to learn something new and
              get successful with it, but I will try it. Hope you are having a
              great day and share my enthusiasm for creating something new. If
              so please join my Blog.
            </div>
          </div>
        </center>
      </div>
    );
  }
}
