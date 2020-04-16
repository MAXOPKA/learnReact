import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Box, TextField, List, ListItem, Button } from '@material-ui/core';
import SelectUser from '../components/SelectUser';
import Loader from '../components/Loader';

interface CreateTransactionProps {
  rootStore: any;
  createTransactionStore: any;
}

@inject("rootStore")
@observer
class CreateTransaction extends Component<CreateTransactionProps> {
  render() {
    return(
      <Box>
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
        <Loader isOpen={this.props.rootStore.loginStore.isLoading} />
      </Box>
    );
  }
}

export default CreateTransaction;
