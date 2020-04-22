import React from 'react';
import { Box, Typography } from '@material-ui/core';

interface IErrorMessageProps {
  isOpen: boolean;
  message?: string;
}

export default (props: IErrorMessageProps) => {
  if(!props.isOpen) {
    return null;
  }

  return(
    <Box>
      <Typography variant="h6" component="h6">
        {props.message}
      </Typography>
    </Box>
  );
};
