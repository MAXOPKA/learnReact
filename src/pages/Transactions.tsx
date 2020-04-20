import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Redirect, useHistory } from "react-router-dom";
import { Box, List, Button } from '@material-ui/core';
import loginStore from '../store/LoginStore';
import transactionsStore from '../store/TransactionsStore';
import TransactionsItem from '../components/TransactionsItem';
import TransactionType from '../types/TransactionType';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

interface TransactionsProps {
  loginStore?: any;
  transactionsStore?: any;
}

interface TransactionsState {
  errorMessage?: string;
}

@inject("loginStore", "transactionsStore")
@observer
class Transactions extends Component<TransactionsProps, TransactionsState> {
  constructor(props: TransactionsProps) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.transactionsStore.getTransactions()
  }

  renderTransactionsList = (transactions: TransactionType[]) => (
    <List component="nav">
      { transactions.map((transaction: TransactionType) => <TransactionsItem { ...{ transaction: transaction } } />) }
    </List>
  );

  renderEmptyTransactionsMessage = () => (
    <h3>No transactions</h3>
  );

  isLogin = () => (this.props.loginStore.token !== "");

  render() {
    if(!this.isLogin()) {
      return(
        <Redirect to={{ pathname: '/login' }} />
      );
    }

    const { isLoading, transactions, error, errorMessage } = this.props.transactionsStore;

    return(
      <Box>
        <h2>Transactions</h2>
        {(!isLoading && transactions.length === 0) && this.renderEmptyTransactionsMessage() }
        {(!isLoading && transactions.length !== 0) && this.renderTransactionsList(transactions) }
        <ErrorMessage
          isOpen={error}
          message={this.state.errorMessage || errorMessage}
        />
        <Button href="/create-transaction" variant="contained" color="secondary">
          Send PW
        </Button>
        <Loader isOpen={isLoading} />
      </Box>
    );
  }
}

export default Transactions
