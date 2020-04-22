import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
import { Box, TextField, List, ListItem, Button } from '@material-ui/core';
import { validateEmail } from '../Utils';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

interface IRegistrationProps {
  loginStore?: any;
  registrationStore?: any;
  routerStore?: any;
}

interface IRegistrationState {
  name: string;
  email: string;
  password: string;
  retryPassword: string;
  errorMessage?: string;
}

@inject("loginStore", "registrationStore", "routerStore")
@observer
class Registration extends Component<IRegistrationProps, IRegistrationState> {
  constructor(props: IRegistrationProps) {
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
    const { registration } = this.props.registrationStore;
    const { name, email, password } = this.state;

    if(this.validate()) {
      registration(name, email, password);
    }
  }

  validate = (): boolean => {
    const { name, email, password, retryPassword } = this.state;

    if (name === "") {
      this.setState((prevState: IRegistrationState) => {
        return({ ...prevState, error: true, errorMessage: "Name is empty" } as IRegistrationState);
      })

      return false;
    }

    if (!validateEmail(email)) {
      this.setState((prevState: IRegistrationState) => {
        return({ ...prevState, error: true, errorMessage: "Email is not a valid" } as IRegistrationState);
      })

      return false;
    }

    if (password === "") {
      this.setState((prevState: IRegistrationState) => {
        return({ ...prevState, error: true, errorMessage: "Empty password" } as IRegistrationState);
      })

      return false;
    }

    if (password !== retryPassword) {
      this.setState((prevState: IRegistrationState) => {
        return({ ...prevState, error: true, errorMessage: "The entered passwords are not the same" } as IRegistrationState);
      })

      return false;
    }

    return true;
  };

  render() {
    const { loginStore, registrationStore, routerStore } = this.props;
    const { errorMessage, name, email, password, retryPassword } = this.state;

    if(loginStore.isLogin()) {
      routerStore.replace('/');

      return(<Redirect to={{ pathname: '/' }} />);
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
                value={name}
                onChange={this.handleChangeName}
              />
            </ListItem>
            <ListItem>
              <TextField
                id="email-field"
                label="Email"
                value={email}
                onChange={this.handleChangeEmail}
              />
            </ListItem>
            <ListItem>
              <TextField
                id="password-field"
                label="Password"
                type="password"
                value={password}
                onChange={this.handleChangePassword}
              />
            </ListItem>
            <ListItem>
              <TextField
                id="retry-password-field"
                label="Retype password"
                type="password"
                value={retryPassword}
                onChange={this.handleChangeRetryPassword}
              />
            </ListItem>
            <ListItem>
              <ErrorMessage
                isOpen={registrationStore.error || errorMessage}
                message={registrationStore.errorMessage || errorMessage}
              />
            </ListItem>
            <ListItem>
              <Button onClick={this.handleSubmit} variant="contained" color="primary">
                Sign up
              </Button>
            </ListItem>
            <ListItem>
              <Button href="/login" variant="contained" color="secondary">
                Login
              </Button>
            </ListItem>
          </List>
        </form>
        <Loader isOpen={registrationStore.isLoading} />
      </Box>
    );
  }
}

export default Registration;
