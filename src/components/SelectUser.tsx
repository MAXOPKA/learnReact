import React, { Component } from 'react';
import { Box, TextField } from '@material-ui/core';

class SelectUser extends Component {
  render() {
    return(
      <Box>
        <TextField id="standard-basic" label="User" />
      </Box>
    );
  }
}

export default SelectUser;
