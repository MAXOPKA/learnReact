import React, { Component } from 'react';
import { Button, Box, List, ListItem } from '@material-ui/core';

type = Props = {
  
}

class SelectUser extends Component {
  constructor(props: any) {
      super(props)
  }

  render() {
    return(
      <Box>
        <List>
          <ListItem>
            <span>Name</span>
            <span>{this.props.user.name}</span>
          </ListItem>
          <ListItem>
            <span>Balance</span>
            <span>{this.props.user.balance}</span>
          </ListItem>
        </List>
        <Button variant="contained" color="primary">
          Logout
        </Button>
      </Box>
    );
  }
}

export default SelectUser;
