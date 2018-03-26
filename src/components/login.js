import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Input, Checkbox } from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";

const url = "http://127.0.0.1:3030/api/register";
const url2 = "http://127.0.0.1:3030/api/login";

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
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      conf_password: "",
      registration: false
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsermameChange = this.handleUsermameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfPasswordChange = this.handleConfPasswordChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleCheckboxChange(e) {
    this.setState({ registration: !this.state.registration });
  }

  handleUsermameChange(e) {
    this.setState({ username: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handleConfPasswordChange(e) {
    this.setState({ conf_password: e.target.value });
  }

  register(e) {
    e.preventDefault();

    if (this.state.registration) {
      console.log("Registration");

      let email = this.state.email.trim();
      let username = this.state.username.trim();
      let password = this.state.password.trim();
      let conf_password = this.state.conf_password.trim();

      if (!email || !username || !password || !conf_password) {
        console.log("some fields are empty");
        return;
      }

      var user = {
        email: email,
        username: username,
        password: password,
        passwordConf: conf_password
      };

      console.log(user);
      axios.defaults.withCredentials = true;
      axios(url, {
        method: "post",
        data: user,
        withCredentials: true
      })
        .then(response => {
          this.setState({
            email: "",
            username: "",
            password: "",
            conf_password: ""
          });
        })
        .catch(err => {
          console.log(err.response);

          this.setState({});
        });
    } else {
      console.log("Login");

      let email = this.state.email.trim();
      let password = this.state.password.trim();

      if (!email || !password) {
        console.log("some fields are empty");
        return;
      }

      var user = {
        email: email,
        password: password
      };

      console.log(user);
      axios.defaults.withCredentials = true;
      axios(url2, {
        method: "post",
        data: user,
        withCredentials: true
      })
        .then(response => {
          console.log(response);
          this.setState({
            email: "",
            username: "",
            password: "",
            conf_password: ""
          });
        })
        .catch(err => {
          console.log(err.response);

          this.setState({});
        });
    }
  }

  login() {
    axios
      .get(url2)
      .then(response => {
        console.log("login", response);
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  render() {
    return (
      <Div>
        <LoginDiv>
          <Title>Login</Title>

          <InputStyled
            type="email"
            placeholder="Email..."
            onChange={this.handleEmailChange}
          />
          {this.state.registration ? (
            <InputStyled
              type="text"
              placeholder="Username..."
              onChange={this.handleUsermameChange}
            />
          ) : null}
          <InputStyled
            type="password"
            placeholder="Password..."
            onChange={this.handlePasswordChange}
          />
          {this.state.registration ? (
            <InputStyled
              type="password"
              placeholder="Confirm Password..."
              onChange={this.handleConfPasswordChange}
            />
          ) : null}

          <Checkbox
            label="Register User"
            onChange={this.handleCheckboxChange}
          />
          <ButtonStyled>
            <Button type="submit" value="Post" onClick={this.register}>
              Login
            </Button>
          </ButtonStyled>
        </LoginDiv>
      </Div>
    );
  }
}
