import React from "react";
import "./navbar.css";

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <ul>
          {this.props.items.map(item => (
            <li key={item.id}>
              <a href={"/" + item.text + ".js".toLocaleLowerCase}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
