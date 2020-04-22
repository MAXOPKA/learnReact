import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Button, Box, List, ListItem } from '@material-ui/core';

interface IUserInfoProps {
  loginStore?: any;
  userInfoStore?: any;
}

@inject("loginStore", "userInfoStore")
@observer
class UserInfo extends Component<IUserInfoProps> {
  constructor(props: IUserInfoProps) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const { loginStore, userInfoStore } = this.props;

    if(loginStore.isLogin()) {
        userInfoStore.getUserInfo();
    }
  }

  handleLogout = () => {
    const { setToken } = this.props.loginStore;

    setToken("");
  }

  render() {
    const { loginStore, userInfoStore } = this.props;

    if(!loginStore.isLogin()) {
        return null;
    }

    return(
      <Box>
        <List>
          <ListItem>
            <span>Name&nbsp;</span>
            <span>{userInfoStore.userInfo.name}</span>
          </ListItem>
          <ListItem>
            <span>Balance&nbsp;</span>
            <span>{userInfoStore.userInfo.balance}&nbsp;PW</span>
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
