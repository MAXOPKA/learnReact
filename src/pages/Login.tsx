import React, { Component } from 'react';
import { Box, TextField, List, ListItem, Button } from '@material-ui/core';
import { Redirect, useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import loginStore from '../store/LoginStore';
import { validateEmail } from '../Utils';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

interface LoginProps {
  loginStore?: any;
}

interface LoginState {
  errorMessage?: string;
  email: string;
  password: string;
}

@inject("loginStore")
@observer
class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail = (event: any) => {
    this.setState({email: event.target.value, errorMessage: undefined});
  }

  handleChangePassword = (event: any) => {
    this.setState({password: event.target.value, errorMessage: undefined});
  }

  handleSubmit = (event: any) => {
    if(this.validate()) {
      this.props.loginStore.login(this.state.email, this.state.password);
    }
  }

  isLogin = () => (this.props.loginStore.token !== "");

  validate = (): boolean => {
    const { email, password } = this.state;

    if (!validateEmail(email)) {
      this.setState((prevState: LoginState) => {
        return({ ...prevState, error: true, errorMessage: "Email is not a valid" } as LoginState);
      })

      return false;
    }

    if (password === "") {
      this.setState((prevState: LoginState) => {
        return({ ...prevState, error: true, errorMessage: "Empty password" } as LoginState);
      })

      return false;
    }

    return true;
  }

  render() {
    if(this.isLogin()) {
      return(
        <Redirect to={{ pathname: '/' }} />
      );
    }

    return(
      <Box>
        <h2>Login</h2>
        <List component="nav">
          <ListItem>
            <TextField value={this.state.email} onChange={this.handleChangeEmail} id="email-field" label="Email" />
          </ListItem>
          <ListItem>
            <TextField value={this.state.password} onChange={this.handleChangePassword} id="password-field" label="Password" />
          </ListItem>
          <ListItem>
            <ErrorMessage
              isOpen={this.props.loginStore.error || this.state.errorMessage }
              message={this.state.errorMessage || this.props.loginStore.errorMessage}
            />
          </ListItem>
          <ListItem>
            <Button onClick={this.handleSubmit} variant="contained" color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            <Button href="/registration" variant="contained" color="secondary">
              Registration
            </Button>
          </ListItem>
        </List>
        <Loader isOpen={this.props.loginStore.isLoading} />
      </Box>
    );
  }
}

export default Login;
