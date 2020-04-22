import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import ITransaction from '../interfaces/ITransaction'

interface ITransactionsItemProps {
  transaction: ITransaction;
}

export default (props: ITransactionsItemProps) => (
  <ListItem>
    <ListItemText>
      {props.transaction.username}
    </ListItemText>
    <ListItemText>
      {props.transaction.date}
    </ListItemText>
    <ListItemText>
      {props.transaction.amount}
    </ListItemText>
  </ListItem>
);
