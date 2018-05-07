import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Input, Checkbox, Form, Message } from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";
import Dropzone from "react-dropzone";

const url = "http://127.0.0.1:3030/api/register";
const url2 = "http://127.0.0.1:3030/api/login";

const DivDrop = styled.div`
  width: 100%;
  border: 1px dashed #ccc !important;
  border-radius: 16px;
  height: 200px;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const LoginDiv = styled.div`
  border-radius: 2px 2px 5px 5px;
  padding: 10px 10px 20px 10px;
  width: 24%;
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
      file: "",
      header: "error",
      message: "Something went wrong. Please try Againg.",
      failureRequest: false,
      registration: false
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsermameChange = this.handleUsermameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfPasswordChange = this.handleConfPasswordChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.register = this.register.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDropRejected = this.handleDropRejected.bind(this);
    this.login = this.login.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleCheckboxChange(e) {
    this.setState({
      registration: !this.state.registration,
      email: "",
      username: "",
      password: "",
      conf_password: "",
      file: ""
    });
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

      let formData = new FormData();
      formData.append("profile", this.state.file);
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("passwordConf", conf_password);
      window.URL.revokeObjectURL(this.state.file.preview);
      axios.defaults.withCredentials = true;
      axios(url, {
        method: "post",
        data: formData,
        processData: false,
        contentType: false,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(response => {
          this.setState({
            file: "",
            email: "",
            username: "",
            password: "",
            conf_password: ""
          });
          window.location.pathname = "/";
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.login();
    }
  }

  login() {
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

        window.location.pathname = "/";
        this.setState({
          email: "",
          username: "",
          password: "",
          conf_password: ""
        });
      })
      .catch(err => {
        console.log(err.response);
        this.setState({
          failureRequest: true,
          message: err.response.data.message,
          header: err.response.data.header
        });
      });
  }

  handleDrop(acceptedFiles, rejectedFiles) {
    if (acceptedFiles.length == 1) {
      console.log(this.state);

      this.setState({ file: acceptedFiles[0] });
    }
  }
  handleDropRejected(acceptedFiles, rejectedFiles) {}

  render() {
    return (
      <Div>
        <LoginDiv>
          <Title> {this.state.registration ? "Registration" : "Login"}</Title>

          {this.state.registration ? (
            <Dropzone
              style={{
                width: "100%",
                paddingLeft: "48px",
                paddingRight: "48px"
              }}
              className="dragAndDropArea"
              maxSize={500000}
              onDrop={this.handleDrop}
              accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png"
              multiple={false}
              onDropRejected={this.handleDropRejected}
            >
              <DivDrop>
                {this.state.file == "" && (
                  <center>
                    <br />
                    <br />
                    <br />
                    <h3>
                      Drag 'n' Drop <br />Profile Picutre
                    </h3>
                  </center>
                )}

                {this.state.file != "" && (
                  <center>
                    <img
                      src={this.state.file.preview}
                      alt="image preview"
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        height: "200px",
                        borderRadius: "16px"
                      }}
                    />
                  </center>
                )}
              </DivDrop>
            </Dropzone>
          ) : null}
          <InputStyled
            style={{
              width: "240px",
              marginTop: "20px"
            }}
            type="email"
            placeholder="Email..."
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          {this.state.registration ? (
            <InputStyled
              style={{
                width: "240px",
                marginTop: "20px"
              }}
              value={this.state.username}
              type="text"
              placeholder="Username..."
              onChange={this.handleUsermameChange}
            />
          ) : null}
          <InputStyled
            style={{
              width: "240px",
              marginTop: "20px"
            }}
            value={this.state.password}
            type="password"
            placeholder="Password..."
            onChange={this.handlePasswordChange}
          />
          {this.state.registration ? (
            <InputStyled
              style={{
                width: "240px",
                marginTop: "20px"
              }}
              value={this.state.conf_password}
              type="password"
              placeholder="Confirm Password..."
              onChange={this.handleConfPasswordChange}
            />
          ) : null}
          <Checkbox
            style={{
              width: "240px",
              marginTop: "20px"
            }}
            style={{ marginTop: "16px" }}
            label="Register User"
            onChange={this.handleCheckboxChange}
          />

          <Button
            style={{ width: "160px", marginTop: "20px" }}
            basic
            color="gray"
            onClick={this.register}
          >
            {this.state.registration ? "Register" : "Login"}
          </Button>
          {this.state.failureRequest ? (
            <Message negative>
              <Message.Header>{this.state.header}</Message.Header>
              <p>{this.state.message}</p>
            </Message>
          ) : null}
        </LoginDiv>
      </Div>
    );
  }
}
