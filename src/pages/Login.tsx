import React, { Component } from 'react';
import { Box, TextField, List, ListItem, Button } from '@material-ui/core';
import { observer, inject } from "mobx-react";
import Loader from '../components/Loader';

interface LoginProps {
  rootStore: any;
  loginStore: any;
}

interface LoginState {
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
  }

  handleChangeEmail = (event: any) => {
    this.setState({email: event.target.value});
  }

  handleChangePassword = (event: any) => {
    this.setState({password: event.target.value});
  }

  handleSubmit = (event: any) => {
    console.log('submit');
    this.props.rootStore.loginStore.login(this.state.email, this.state.password);
  }

  render() {
    console.log('login render');

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
            <Button onClick={this.handleSubmit} variant="contained" color="primary">
              Login
            </Button>
          </ListItem>
        </List>
        <Loader isOpen={this.props.rootStore.loginStore.isLoading} />
      </Box>
    );
  }
}

export default Login;
