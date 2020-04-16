import React, { Component } from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import TransactionType from '../types/TransactionType'

type TransactionsItemProps = {
  transaction: TransactionType;
}

class TransactionsItem extends Component<TransactionsItemProps> {
  render() {
    return(
      <ListItem>
        <ListItemText>
          {this.props.transaction.username}
        </ListItemText>
        <ListItemText>
          {this.props.transaction.date}
        </ListItemText>
        <ListItemText>
          {this.props.transaction.amount}
        </ListItemText>
      </ListItem>
    );
  }
}

export default TransactionsItem;
