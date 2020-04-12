import React, { Component } from 'react';
import { Box, TextField, List, ListItem, Button } from '@material-ui/core';

class Login extends Component {
  constructor(props: any) {
      super(props)
  }

  render() {
    return(
      <Box>
        <h2>Login</h2>
        <form noValidate autoComplete="off">
          <List component="nav">
            <ListItem>
              <TextField id="standard-basic" label="Login" />
            </ListItem>
            <ListItem>
              <TextField id="standard-basic" label="Password" />
            </ListItem>
            <ListItem>
              <Button variant="contained" color="primary">
                Login
              </Button>
            </ListItem>
          </List>
        </form>
      </Box>
    );
  }
}

export default Login;
