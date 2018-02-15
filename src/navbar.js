import React from "react";
import "./navbar.css";

export default class Navbar extends React.Component {
  render() {
    return (
      <div class="navbar">
        <ul>
          <li>
            <a class="active" href="default.asp">
              Home
            </a>
          </li>
          <li>
            <a href="news.asp">News</a>
          </li>
          <li>
            <a href="contact.asp">Contact</a>
          </li>
          <li>
            <li>
              <a href="#about">About</a>
            </li>
          </li>
        </ul>
      </div>
    );
  }
}
