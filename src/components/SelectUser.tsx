import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Box, List, ListItem, ListItemText, CircularProgress, TextField } from '@material-ui/core';
import UserType from '../types/UserType';

interface SelectUserProps {
  rootStore: any;
}

@inject('rootStore')
@observer
class SelectUser extends Component<SelectUserProps> {
  renderUsersList = (users: UserType[]) => (
    <List component="nav">
      { users.map((user: UserType) => this.renderUsersListItem(user)) }
    </List>
  );

  renderUsersListItem = (user: UserType) => (
    <ListItem>
      <ListItemText>
        {user.name}(id: {user.id})
      </ListItemText>
    </ListItem>
  );

  renderEmptyUsersListMessage = () => (
    <h3>Not found</h3>
  );

  renderLoader = () => (
    <CircularProgress color="inherit" />
  );

  render() {
    const { isLoading, users } = this.props.rootStore.getUsersStore;

    return(
      <Box>
        <TextField id="standard-basic" label="User" />
        {(!isLoading && users.length === 0) && this.renderEmptyUsersListMessage() }
        {(!isLoading && users.length !== 0) && this.renderUsersList(users) }
        {(isLoading) && this.renderLoader()}
      </Box>
    );
  }
}

export default SelectUser;
