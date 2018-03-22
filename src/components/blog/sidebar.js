import React from "react";
import styled from "styled-components";
import "normalize.css";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

const Div = styled.div`
  position: fixed;
  z-index: 1;
  top: 200px;
  left: 40px;
  text-align: center;
  overflow-x: hidden;
  padding: 8px 0;
`;

const ButtonStyled = styled(Button)`
  padding: 6px 8px 6px 16px;
  color: #2196f3;
  display: block;
`;

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.click = this.click.bind(this);
  }

  click(e) {
    e.preventDefault();
    this.props.click();
  }

  render() {
    return (
      <Div>
        <Button circular icon="heart" size="huge" onClick={this.click} />
        <br />
        <br />
        <Button circular icon="bookmark" />
        <br />
        <br />
        <Button circular icon="twitter" />
        <br />
        <br />
        <Button circular icon="facebook" />
        <br />
      </Div>
    );
  }
}
