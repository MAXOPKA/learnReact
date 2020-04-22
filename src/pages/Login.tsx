import React, { Component } from 'react';
import { Box, TextField, List, ListItem, Button } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { validateEmail } from '../Utils';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

interface ILoginProps {
  loginStore?: any;
  routerStore?: any;
}

interface ILoginState {
  errorMessage?: string;
  email: string;
  password: string;
}

@inject("loginStore", "routerStore")
@observer
class Login extends Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
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
    const { login } = this.props.loginStore;
    const { email, password } = this.state;

    if(this.validate()) {
      login(email, password);
    }
  }

  validate = (): boolean => {
    const { email, password } = this.state;

    if (!validateEmail(email)) {
      this.setState((prevState: ILoginState) => {
        return({ ...prevState, error: true, errorMessage: "Email is not a valid" } as ILoginState);
      })

      return false;
    }

    if (password === "") {
      this.setState((prevState: ILoginState) => {
        return({ ...prevState, error: true, errorMessage: "Empty password" } as ILoginState);
      })

      return false;
    }

    return true;
  }

  render() {
    const { loginStore, routerStore } = this.props;
    const { errorMessage, email, password } = this.state;

    if(loginStore.isLogin()) {
      routerStore.replace('/');

      return(<Redirect to={{ pathname: '/' }} />);
    }

    return(
      <Box>
        <h2>Login</h2>
        <List component="nav">
          <ListItem>
            <TextField value={email} onChange={this.handleChangeEmail} id="email-field" label="Email" />
          </ListItem>
          <ListItem>
            <TextField value={password} onChange={this.handleChangePassword} id="password-field" label="Password" />
          </ListItem>
          <ListItem>
            <ErrorMessage
              isOpen={loginStore.error || errorMessage }
              message={loginStore.errorMessage || errorMessage}
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
        <Loader isOpen={loginStore.isLoading} />
      </Box>
    );
  }
}

export default Login;
