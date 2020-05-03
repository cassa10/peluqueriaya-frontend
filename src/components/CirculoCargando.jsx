import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {CircularProgress, Box} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 55, 
  },
}));

export default function CirculitoCargando() {
  const classes = useStyles();

  return (
    <Box textAlign="center">
        <CircularProgress className={classes.root} color="secondary" />
    </Box>
  );
}