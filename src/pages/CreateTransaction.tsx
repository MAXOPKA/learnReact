import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
import { Box, TextField, List, ListItem, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IUser from '../interfaces/IUser';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

interface ICreateTransactionProps {
  createTransactionStore?: any;
  loginStore?: any;
  userInfoStore?: any;
  getUsersStore?: any;
  routerStore?: any;
}

interface ICreateTransactionState {
  errorMessage?: string;
  amount: number;
  name: string;
  selectedUser?: IUser;
}

@inject("createTransactionStore", "loginStore", "userInfoStore", "getUsersStore", "routerStore")
@observer
class CreateTransaction extends Component<ICreateTransactionProps, ICreateTransactionState> {
  constructor(props: ICreateTransactionProps) {
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
      this.setState((prevState: ICreateTransactionState) => {
        return({
          ...prevState,
          amount: isNaN(amountValue) ? "" : amountValue,
          errorMessage: undefined
        } as ICreateTransactionState);
      });
    }
  }

  handleUserNameInputChange = (event: any, value: string) => {
    const { getUsers } = this.props.getUsersStore;

    this.setState((prevState: ICreateTransactionState) => {
      return({ ...prevState, name: value } as ICreateTransactionState);
    });
    if (value !== "") {
      getUsers(value);
    }
  }

  handleUserChange = (event: any, value?: any) => {
    this.setState((prevState: ICreateTransactionState) => {
      return({ ...prevState, selectedUser: { ...value }} as ICreateTransactionState);
    });
  }

  handleSubmit = (event: any) => {
    const { createTransactionStore } = this.props;
    const { selectedUser, amount } = this.state;

    if(this.validate()) {
      createTransactionStore.createTransaction(selectedUser?.name || "", amount);
    }
  }

  validate = (): boolean => {
    const { selectedUser, amount } = this.state;
    const { userInfoStore } = this.props;

    if (!selectedUser) {
      this.setState((prevState: ICreateTransactionState) => {
        return({ ...prevState, error: true, errorMessage: "User not selected" } as ICreateTransactionState);
      })

      return false;
    }

    if (selectedUser.id === userInfoStore.userInfo.name) {
      this.setState((prevState: ICreateTransactionState) => {
        return({ ...prevState, error: true, errorMessage: "You can not send yourself" } as ICreateTransactionState);
      })

      return false;
    }

    if (amount <= 0) {
      this.setState((prevState: ICreateTransactionState) => {
        return({ ...prevState, error: true, errorMessage: "Invalid amount value" } as ICreateTransactionState);
      })

      return false;
    }

    if (amount > userInfoStore.userInfo.balance) {
      this.setState((prevState: ICreateTransactionState) => {
        return({ ...prevState, error: true, errorMessage: "Not enough money" } as ICreateTransactionState);
      })

      return false;
    }

    return true;
  }

  render() {
    const { errorMessage, name, amount } = this.state;
    const { loginStore, getUsersStore, createTransactionStore, routerStore } = this.props;

    if(!loginStore.isLogin()) {
      routerStore.replace('/login');

      return(<Redirect to={{ pathname: '/login' }} />);
    }

    if(createTransactionStore.isCreated) {
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
                inputValue={name}
                id="user-combo-box"
                options={getUsersStore.users}
                getOptionLabel={(option: IUser) => `${option.name} (id: ${option.id})`}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select user" variant="outlined" />}
              />
            </ListItem>
            <ListItem>
              <TextField
                id="create-transaction-amount"
                label="Amount"
                value={amount}
                onChange={this.handleChangeAmount}
              />
            </ListItem>
            <ListItem>
              <ErrorMessage
                isOpen={createTransactionStore.error || errorMessage}
                message={createTransactionStore.errorMessage || errorMessage}
              />
            </ListItem>
            <ListItem>
              <Button onClick={this.handleSubmit} variant="contained" color="primary">
                Send
              </Button>
            </ListItem>
          </List>
        </form>
        <Loader isOpen={createTransactionStore.isLoading} />
      </Box>
    );
  }
}

export default CreateTransaction;
