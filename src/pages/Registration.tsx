import React, { Component } from 'react';
import { Box, TextField, List, ListItem, Button } from '@material-ui/core';

class Registration extends Component {
  constructor(props: any) {
      super(props)
  }

  render() {
    return(
      <Box>
        <h2>Registration</h2>
        <form noValidate autoComplete="off">
          <List component="nav">
            <ListItem>
              <TextField id="standard-basic" label="Name" />
            </ListItem>
            <ListItem>
              <TextField id="standard-basic" label="Email" />
            </ListItem>
            <ListItem>
              <TextField id="standard-basic" label="Password" />
            </ListItem>
            <ListItem>
              <TextField id="standard-basic" label="Retype password" />
            </ListItem>
            <ListItem>
              <Button variant="contained" color="primary">
                Sign up
              </Button>
            </ListItem>
          </List>
        </form>
      </Box>
    );
  }
}

export default Registration;
