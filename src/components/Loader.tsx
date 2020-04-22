import React from 'react';
import CSS from 'csstype';
import { CircularProgress, Backdrop } from '@material-ui/core';

interface ILoaderProps {
  isOpen: boolean;
}

const customModalRoot: CSS.Properties = {
  zIndex: 2000,
}

export default (props: ILoaderProps) => {
  return(
    <Backdrop style={customModalRoot} open={props.isOpen} >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
