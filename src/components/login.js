import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Input } from "semantic-ui-react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
`;

const LoginDiv = styled.div`
  border-radius: 2px 2px 5px 5px;
  padding: 10px 20px 20px 20px;
  width: 90%;
  max-width: 320px;
  background: #ffffff;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
`;
const InputStyled = styled(Input)`
  margin-top: 10px;
`;

const ButtonStyled = styled.div`
  margin-top: 10px;
`;

const Title = styled.h1`
  color: #444;
  font-size: 1.2em;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

export default class Login extends React.Component {
  render() {
    return (
      <Div>
        <LoginDiv>
          <Title>Login</Title>
          <InputStyled type="text" placeholder="Username..." />
          <InputStyled type="password" placeholder="Password..." />
          <ButtonStyled>
            <Button type="submit" value="Post">
              Login
            </Button>
          </ButtonStyled>
        </LoginDiv>
      </Div>
    );
  }
}
