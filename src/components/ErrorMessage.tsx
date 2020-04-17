import React from 'react';
import { Box, Typography } from '@material-ui/core';

interface ErrorMessageProps {
  isOpen: boolean;
  message?: string;
}

export default (props: ErrorMessageProps) => {
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
