import React from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';

interface LoaderProps {
  isOpen: boolean;
}

export default (props: LoaderProps) => {
  return(
    <Backdrop open={props.isOpen} >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
