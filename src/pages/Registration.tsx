import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Box, TextField, List, ListItem, Button } from '@material-ui/core';
import Loader from '../components/Loader';

interface RegistrationProps {
  rootStore: any;
  registrationStore: any;
}

interface RegistrationState {
  name: string;
  email: string;
  password: string;
  retryPassword: string;
}

@inject("rootStore")
@observer
class Registration extends Component<RegistrationProps, RegistrationState> {
  constructor(props: RegistrationProps) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      retryPassword: ''
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeRetryPassword = this.handleChangeRetryPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName = (event: any) => {
    this.setState({name: event.target.value});
  }

  handleChangeEmail = (event: any) => {
    this.setState({email: event.target.value});
  }

  handleChangePassword = (event: any) => {
    this.setState({password: event.target.value});
  }

  handleChangeRetryPassword = (event: any) => {
    this.setState({retryPassword: event.target.value});
  }

  handleSubmit = (event: any) => {
    console.log('submit');
    this.props.rootStore.registrationStore.registration(this.state.name, this.state.email, this.state.password);
  }

  render() {
    return(
      <Box>
        <h2>Registration</h2>
        <form noValidate autoComplete="off">
          <List component="nav">
            <ListItem>
              <TextField
                id="name-field"
                label="Name"
                value={this.state.name}
                onChange={this.handleChangeName}
              />
            </ListItem>
            <ListItem>
              <TextField
                id="email-field"
                label="Email"
                value={this.state.email}
                onChange={this.handleChangeEmail}
              />
            </ListItem>
            <ListItem>
              <TextField
                id="password-field"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleChangePassword}
              />
            </ListItem>
            <ListItem>
              <TextField
                id="retry-password-field"
                label="Retype password"
                type="password"
                value={this.state.retryPassword}
                onChange={this.handleChangeRetryPassword}
              />
            </ListItem>
            <ListItem>
              <Button variant="contained" color="primary">
                Sign up
              </Button>
            </ListItem>
          </List>
        </form>
        <Loader isOpen={this.props.rootStore.registrationStore.isLoading} />
      </Box>
    );
  }
}

export default Registration;
