import React from "react";
import { Link } from "react-router";

export default class MainLayout extends React {
  render() {
    return (
      <div>
        <header className="primary-header" />
        <aside className="primary-aside">
          <ul>
            <li>
              <Link to="/" activeClassName="active">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" activeClassName="active">
                About
              </Link>
            </li>
          </ul>
        </aside>
        <main>{this.props.children}</main>
      </div>
    );
  }
}
