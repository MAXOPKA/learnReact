import React, { Component } from 'react';
import { Box, TextField, List, ListItem, Button } from '@material-ui/core';
import SelectUser from '../components/SelectUser';

class CreateTransaction extends Component {
  constructor(props: any) {
      super(props)
  }

  render() {
    return(
      <div>
        <h2>Send PW</h2>
        <form noValidate autoComplete="off">
          <List component="nav">
            <ListItem>
              <SelectUser />
            </ListItem>
            <ListItem>
              <TextField id="standard-basic" label="Amount" />
            </ListItem>
            <ListItem>
              <Button variant="contained" color="primary">
                Send
              </Button>
            </ListItem>
          </List>
        </form>
      </div>
    );
  }
}

export default CreateTransaction;
