import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
import { Box, TextField, List, ListItem, Button } from '@material-ui/core';
import SelectUser from '../components/SelectUser';
import UserType from '../types/UserType';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

interface CreateTransactionProps {
  createTransactionStore?: any;
  loginStore?: any;
  userInfoStore?: any;
}

interface CreateTransactionState {
  errorMessage?: string;
  amount: number;
  name: string;
  selectedUser?: UserType;
}

@inject("createTransactionStore", "loginStore")
@observer
class CreateTransaction extends Component<CreateTransactionProps, CreateTransactionState> {
  constructor(props: CreateTransactionProps) {
    super(props);

    this.state = {
      amount: 0,
      name: ''
    };

    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeAmount = (event: any) => {
    this.setState({amount: event.target.value, errorMessage: undefined});
  }

  handleSubmit = (event: any) => {
    if(this.validate()) {
      this.props.loginStore.createTransaction(this.state.selectedUser?.name || "", this.state.amount);
    }
  }

  isLogin = () => (this.props.loginStore.token !== "");

  validate = (): boolean => {
    const { selectedUser, amount } = this.state;

    if (!selectedUser) {
      this.setState((prevState: CreateTransactionState) => {
        return({ ...prevState, error: true, errorMessage: "User not selected" } as CreateTransactionState);
      })

      return false;
    }

    if (selectedUser.id === this.props.userInfoStore.userInfo.name) {
      this.setState((prevState: CreateTransactionState) => {
        return({ ...prevState, error: true, errorMessage: "You can not send yourself" } as CreateTransactionState);
      })

      return false;
    }

    if (amount <= 0) {
      this.setState((prevState: CreateTransactionState) => {
        return({ ...prevState, error: true, errorMessage: "Invalid amount value" } as CreateTransactionState);
      })

      return false;
    }

    if (amount > this.props.userInfoStore.userInfo.balance) {
      this.setState((prevState: CreateTransactionState) => {
        return({ ...prevState, error: true, errorMessage: "Not enough money" } as CreateTransactionState);
      })

      return false;
    }

    return true;
  }

  render() {
    console.log(this.props);


    if(!this.isLogin()) {
      return(
        <Redirect to={{ pathname: '/login' }} />
      );
    }

    return(
      <Box>
        <h2>Send PW</h2>
        <form noValidate autoComplete="off">
          <List component="nav">
            <ListItem>
              <SelectUser />
            </ListItem>
            <ListItem>
              <TextField
                id="create-transaction-amount"
                label="Amount"
              />
            </ListItem>
            <ListItem>
              <ErrorMessage
                isOpen={this.props.createTransactionStore.error}
                message={this.state.errorMessage || this.props.createTransactionStore.errorMessage}
              />
            </ListItem>
            <ListItem>
              <Button onClick={this.handleSubmit} variant="contained" color="primary">
                Send
              </Button>
            </ListItem>
          </List>
        </form>
        <Loader isOpen={this.props.createTransactionStore.isLoading} />
      </Box>
    );
  }
}

export default CreateTransaction;
