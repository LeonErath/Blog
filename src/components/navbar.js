import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <ul>
          {this.props.items.map(item => (
            <li key={item.id}>
              {/* TODO paste Route Link here */}
              <Link to={"/" + item.text.toLocaleLowerCase}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
