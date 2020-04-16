import React, { Component } from 'react';
import { Button, Box, List, ListItem } from '@material-ui/core';
import UserInfoType from '../types/UserInfoType';

type UserInfoProps = {
  user?: UserInfoType
}

class UserInfo extends Component<UserInfoProps> {
  render() {
    return(
      <Box>
        <List>
          <ListItem>
            <span>Name</span>
            <span></span>
          </ListItem>
          <ListItem>
            <span>Balance</span>
            <span></span>
          </ListItem>
        </List>
        <Button variant="contained" color="primary">
          Logout
        </Button>
      </Box>
    );
  }
}

export default UserInfo;
