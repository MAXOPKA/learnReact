import React, { Component } from 'react';
import { Box, TextField, List, ListItem, Button } from '@material-ui/core';
import { Redirect, useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { validateEmail } from '../Utils';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

interface LoginProps {
  rootStore: any;
  loginStore: any;
}

interface LoginState {
  errorMessage?: string;
  email: string;
  password: string;
}

@inject("rootStore")
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
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  handleChangeEmail = (event: any) => {
    this.setState({email: event.target.value, errorMessage: undefined});
  }

  handleChangePassword = (event: any) => {
    this.setState({password: event.target.value, errorMessage: undefined});
  }

  handleSubmit = (event: any) => {
    if(this.validate()) {
      this.props.rootStore.loginStore.login(this.state.email, this.state.password);
    }
  }

  handleRegistration = (event: any) => {
    const history = useHistory();

    history.push("/registration");
  }

  isLogin = () => (this.props.rootStore.loginStore.token !== "");

  validate = (): boolean => {
    const { email, password } = this.state;

    if (email === "") {
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
              isOpen={this.props.rootStore.loginStore.error || this.state.errorMessage }
              message={this.state.errorMessage || this.props.rootStore.loginStore.errorMessage}
            />
          </ListItem>
          <ListItem>
            <Button onClick={this.handleSubmit} variant="contained" color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            <Button onClick={this.handleRegistration} variant="contained" color="secondary">
              Registration
            </Button>
          </ListItem>
        </List>
        <Loader isOpen={this.props.rootStore.loginStore.isLoading} />
      </Box>
    );
  }
}

export default Login;
