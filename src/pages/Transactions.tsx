import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
import { Box, List, Button } from '@material-ui/core';
import TransactionsItem from '../components/TransactionsItem';
import ITransaction from '../interfaces/ITransaction';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

interface ITransactionsProps {
  loginStore?: any;
  transactionsStore?: any;
  routerStore?: any;
}

@inject("loginStore", "transactionsStore", "routerStore")
@observer
class Transactions extends Component<ITransactionsProps> {
  componentDidMount() {
    const { getTransactions } = this.props.transactionsStore;

    getTransactions()
  }

  renderTransactionsList = (transactions: ITransaction[]) => (
    <List component="nav">
      { transactions.map((transaction: ITransaction) =>
        <TransactionsItem
          key={transaction.id}
          { ...{ transaction: transaction } }
        />
      )}
    </List>
  );

  renderEmptyTransactionsMessage = () => (
    <h3>No transactions</h3>
  );

  render() {
    const { loginStore, routerStore } = this.props;
    const { isLoading, transactions, error, errorMessage } = this.props.transactionsStore;

    if(!loginStore.isLogin()) {
      routerStore.replace('/login');

      return(<Redirect to={{ pathname: '/login' }} />);
    }

    return(
      <Box>
        <h2>Transactions</h2>
        {(!isLoading && transactions.length === 0) && this.renderEmptyTransactionsMessage() }
        {(!isLoading && transactions.length !== 0) && this.renderTransactionsList(transactions) }
        <ErrorMessage
          isOpen={error}
          message={errorMessage}
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
