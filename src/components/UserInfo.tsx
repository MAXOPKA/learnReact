import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Button, Box, List, ListItem } from '@material-ui/core';
import UserInfoType from '../types/UserInfoType';

type UserInfoProps = {
  loginStore?: any;
  userInfoStore?: any;
}

@inject("loginStore", "userInfoStore")
@observer
class UserInfo extends Component<UserInfoProps> {
  constructor(props: UserInfoProps) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if(this.isLogin()) {
        this.props.userInfoStore.getUserInfo();
    }
  }

  handleLogout = () => {
    if(this.isLogin()) {
        this.props.loginStore.setToken("");
    }
  }

  isLogin = () => (this.props.loginStore.token !== "");

  render() {
    if(!this.isLogin()) {
        return null;
    }

    return(
      <Box>
        <List>
          <ListItem>
            <span>Name&nbsp;</span>
            <span>{this.props.userInfoStore.userInfo.name}</span>
          </ListItem>
          <ListItem>
            <span>Balance&nbsp;</span>
            <span>{this.props.userInfoStore.userInfo.balance}&nbsp;PW</span>
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
