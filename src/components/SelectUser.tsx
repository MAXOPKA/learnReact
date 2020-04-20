import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Box, List, ListItem, ListItemText, CircularProgress, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import UserType from '../types/UserType';
import getUsersStore from '../store/GetUsersStore';

interface SelectUserProps {
  getUsersStore?: any;
}

@inject('getUsersStore')
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
    const { isLoading, users } = this.props.getUsersStore;

    return(
      <Box>
        <Autocomplete
          id="user-combo-box"
          options={users}
          getOptionLabel={(option: UserType) => option.name}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Select user" variant="outlined" />}
        />
      </Box>
    );
  }
}

export default SelectUser;
