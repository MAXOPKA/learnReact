import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
import { Box, List } from '@material-ui/core';
import TransactionsItem from '../components/TransactionsItem';
import TransactionType from '../types/TransactionType';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

interface TransactionsProps {
  rootStore: any;
  transactionsStore: any;
}

interface TransactionsState {
  errorMessage?: string;
}

@inject("rootStore")
@observer
class Transactions extends Component<TransactionsProps, TransactionsState> {
  constructor(props: TransactionsProps) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.rootStore.transactionsStore.getTransactions()
  }

  renderTransactionsList = (transactions: TransactionType[]) => (
    <List component="nav">
      { transactions.map((transaction: TransactionType) => <TransactionsItem { ...{ transaction: transaction } } />) }
    </List>
  );

  renderEmptyTransactionsMessage = () => (
    <h3>No transactions</h3>
  );

  isLogin = () => (this.props.rootStore.loginStore.token !== "");

  render() {
    if(!this.isLogin()) {
      return(
        <Redirect to={{ pathname: '/login' }} />
      );
    }

    const { isLoading, transactions, error, errorMessage } = this.props.rootStore.transactionsStore;

    return(
      <Box>
        <h2>Transactions</h2>
        {(!isLoading && transactions.length === 0) && this.renderEmptyTransactionsMessage() }
        {(!isLoading && transactions.length !== 0) && this.renderTransactionsList(transactions) }
        <ErrorMessage
          isOpen={error}
          message={this.state.errorMessage || errorMessage}
        />
        <Loader isOpen={isLoading} />
      </Box>
    );
  }
}

export default Transactions
