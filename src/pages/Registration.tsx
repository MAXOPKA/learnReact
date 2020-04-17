import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Redirect, useHistory } from "react-router-dom";
import { Box, TextField, List, ListItem, Button } from '@material-ui/core';
import { validateEmail } from '../Utils';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

interface RegistrationProps {
  rootStore: any;
  registrationStore: any;
}

interface RegistrationState {
  name: string;
  email: string;
  password: string;
  retryPassword: string;
  errorMessage?: string;
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
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChangeName = (event: any) => {
    this.setState({name: event.target.value, errorMessage: undefined});
  }

  handleChangeEmail = (event: any) => {
    this.setState({email: event.target.value, errorMessage: undefined});
  }

  handleChangePassword = (event: any) => {
    this.setState({password: event.target.value, errorMessage: undefined});
  }

  handleChangeRetryPassword = (event: any) => {
    this.setState({retryPassword: event.target.value, errorMessage: undefined});
  }

  handleSubmit = (event: any) => {
    if(this.validate()) {
      this.props.rootStore.registrationStore.registration(this.state.name, this.state.email, this.state.password);
    }
  }

  handleLogin = (event: any) => {
    const history = useHistory();

    history.push("/login");
  }

  isLogin = () => (this.props.rootStore.loginStore.token !== "");

  validate = (): boolean => {
    const { name, email, password, retryPassword } = this.state;

    if (name === "") {
      this.setState((prevState: RegistrationState) => {
        return({ ...prevState, error: true, errorMessage: "Name is empty" } as RegistrationState);
      })

      return false;
    }

    if (!validateEmail(email)) {
      this.setState((prevState: RegistrationState) => {
        return({ ...prevState, error: true, errorMessage: "Email is not a valid" } as RegistrationState);
      })

      return false;
    }

    if (password === "") {
      this.setState((prevState: RegistrationState) => {
        return({ ...prevState, error: true, errorMessage: "Empty password" } as RegistrationState);
      })

      return false;
    }

    if (password !== retryPassword) {
      this.setState((prevState: RegistrationState) => {
        return({ ...prevState, error: true, errorMessage: "The entered passwords are not the same" } as RegistrationState);
      })

      return false;
    }

    return true;
  };

  render() {
    if(this.isLogin()) {
      return(
        <Redirect to={{ pathname: '/' }} />
      );
    }

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
              <ErrorMessage
                isOpen={this.props.rootStore.registrationStore.error || this.state.errorMessage}
                message={this.state.errorMessage || this.props.rootStore.registrationStore.errorMessage}
              />
            </ListItem>
            <ListItem>
              <Button onClick={this.handleSubmit} variant="contained" color="primary">
                Sign up
              </Button>
            </ListItem>
            <ListItem>
              <Button onClick={this.handleLogin} variant="contained" color="secondary">
                Login
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
