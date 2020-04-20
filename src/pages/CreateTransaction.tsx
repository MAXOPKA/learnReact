import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
import { Box, TextField, List, ListItem, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import UserType from '../types/UserType';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

interface CreateTransactionProps {
  createTransactionStore?: any;
  loginStore?: any;
  userInfoStore?: any;
  getUsersStore?: any;
}

interface CreateTransactionState {
  errorMessage?: string;
  amount: number;
  name: string;
  selectedUser?: UserType;
}

@inject("createTransactionStore", "loginStore", "userInfoStore", "getUsersStore")
@observer
class CreateTransaction extends Component<CreateTransactionProps, CreateTransactionState> {
  constructor(props: CreateTransactionProps) {
    super(props);

    this.state = {
      amount: 0,
      name: ''
    };

    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleUserNameInputChange = this.handleUserNameInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeAmount = (event: any) => {
    const amountValue = parseFloat(event.target.value);
    if (!isNaN(amountValue) || event.target.value === "") {
      this.setState((prevState: CreateTransactionState) => {
        return({
          ...prevState,
          amount: isNaN(amountValue) ? "" : amountValue,
          errorMessage: undefined
        } as CreateTransactionState);
      });
    }
  }

  handleUserNameInputChange = (event: any, value: string) => {
    this.setState((prevState: CreateTransactionState) => {
      return({ ...prevState, name: value } as CreateTransactionState);
    });
    if (value !== "") {
      this.props.getUsersStore.getUsers(value);
    }
  }

  handleUserChange = (event: any, value?: any) => {
    this.setState((prevState: CreateTransactionState) => {
      return({ ...prevState, selectedUser: { ...value }} as CreateTransactionState);
    });
  }

  handleSubmit = (event: any) => {
    console.log(this.state);

    if(this.validate()) {
      this.props.createTransactionStore.createTransaction(this.state.selectedUser?.name || "", this.state.amount);
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
    if(!this.isLogin()) {
      return(<Redirect to={{ pathname: '/login' }} />);
    }

    if(this.props.createTransactionStore.isCreated) {
      return(<Redirect to={{ pathname: '/' }} />);
    }

    return(
      <Box>
        <h2>Send PW</h2>
        <form noValidate autoComplete="off">
          <List component="nav">
            <ListItem>
              <Autocomplete
                onChange={this.handleUserChange}
                onInputChange={this.handleUserNameInputChange}
                inputValue={this.state.name}
                id="user-combo-box"
                options={this.props.getUsersStore.users}
                getOptionLabel={(option: UserType) => `${option.name} (id: ${option.id})`}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select user" variant="outlined" />}
              />
            </ListItem>
            <ListItem>
              <TextField
                id="create-transaction-amount"
                label="Amount"
                value={this.state.amount}
                onChange={this.handleChangeAmount}
              />
            </ListItem>
            <ListItem>
              <ErrorMessage
                isOpen={this.props.createTransactionStore.error || this.state.errorMessage}
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
