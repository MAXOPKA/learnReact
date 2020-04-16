import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Box, List } from '@material-ui/core';
import TransactionsItem from '../components/TransactionsItem';
import TransactionType from '../types/TransactionType';
import Loader from '../components/Loader';

interface TransactionsProps {
  rootStore: any;
  transactionsStore: any;
}

@inject("rootStore")
@observer
class Transactions extends Component<TransactionsProps> {
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

  render() {
    const { isLoading, transactions } = this.props.rootStore.transactionsStore;

    return(
      <Box>
        <h2>Transactions</h2>
        {(!isLoading && transactions.length === 0) && this.renderEmptyTransactionsMessage() }
        {(!isLoading && transactions.length !== 0) && this.renderTransactionsList(transactions) }
        <Loader isOpen={isLoading} />
      </Box>
    );
  }
}

export default Transactions
