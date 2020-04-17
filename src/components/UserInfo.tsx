import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Button, Box, List, ListItem } from '@material-ui/core';
import UserInfoType from '../types/UserInfoType';

type UserInfoProps = {
  rootStore: any;
}

@inject("rootStore")
@observer
class UserInfo extends Component<UserInfoProps> {
  constructor(props: UserInfoProps) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    if(this.isLogin()) {
        this.props.rootStore.loginStore.setToken("");
    }
  }

  isLogin = () => (this.props.rootStore.loginStore.token !== "");

  render() {
    if(!this.isLogin()) {
        return null;
    }

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
        <Button onClick={this.handleLogout} variant="contained" color="primary">
          Logout
        </Button>
      </Box>
    );
  }
}

export default UserInfo;
