import React, { Component } from 'react';
import { Box, List } from '@material-ui/core';
import TransactionsItem from '../components/TransactionsItem';

let data = [
  { id: 12331, date: "date", username: "Username", amount: 1.23, balance: 476.77 },
  { id: 12331, date: "date", username: "Username", amount: 1.23, balance: 476.77 },
  { id: 12331, date: "date", username: "Username", amount: 1.23, balance: 476.77 },
  { id: 12331, date: "date", username: "Username", amount: 1.23, balance: 476.77 },
  { id: 12331, date: "date", username: "Username", amount: 1.23, balance: 476.77 },
  { id: 12331, date: "date", username: "Username", amount: 1.23, balance: 476.77 },
  { id: 12331, date: "date", username: "Username", amount: 1.23, balance: 476.77 },
  { id: 12331, date: "date", username: "Username", amount: 1.23, balance: 476.77 },
  { id: 12331, date: "date", username: "Username", amount: 1.23, balance: 476.77 },
  { id: 12331, date: "date", username: "Username", amount: 1.23, balance: 476.77 },
  { id: 12331, date: "date", username: "Username", amount: 1.23, balance: 476.77 },
  { id: 12331, date: "date", username: "Username", amount: 1.23, balance: 476.77 },
  { id: 12331, date: "date", username: "Username", amount: 1.23, balance: 476.77 },
  { id: 12331, date: "date", username: "Username", amount: 1.23, balance: 476.77 },
  { id: 12331, date: "date", username: "Username", amount: 1.23, balance: 476.77 },
  { id: 12331, date: "date", username: "Username", amount: 1.23, balance: 476.77 }
];

class Transactions extends Component {
  constructor(props: any) {
      super(props)
  }

  render() {
    return(
      <Box>
        <h2>Create Transaction</h2>
        <List component="nav">
          { data.map(transaction => <TransactionsItem { ...{ transaction: transaction } } />) }
        </List>
      </Box>
    );
  }
}

export default Transactions
