import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Container,
  Grid,
  Paper,
  Typography,
  ButtonGroup,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    marginTop: "5%",
    padding: "4%",
    backgroundColor: theme.palette.primary.main,
  },
  font: {
    color: theme.palette.secondary.main,
    textAlign: "center",
  },
  paper: {
    padding: "inherit",
  },
  gridItem: {
    margin: "auto",
  },
}));

const PaginaError = ({
  message = "Ha ocurrido un error inesperado. Por favor intente nuevamente",
  status = "Error :(",
  subErrors = [],
}) => {
  const clases = useStyles();
  let { goBack } = useHistory();

  return (
    <Container maxWidth="sm" className={clases.root}>
      <Grid container justify="center" direction="column" spacing={3}>
        <Grid item>
          <Paper elevation={3}>
            <Typography variant="h1" className={clases.font}>
              {status}
            </Typography>
          </Paper>
        </Grid>
        <Grid item className={clases.gridItem}>
          <Paper className={clases.paper} elevation={3}>
            <Typography className={clases.font} variant="h5">
              {message}
            </Typography>
            {subErrors.map((mensaje, index) => (
              <Typography className={clases.font} variant="body2" key={index}>
                {` • ${mensaje}`}
              </Typography>
            ))}
          </Paper>
        </Grid>
        <Grid item className={clases.gridItem}>
          <ButtonGroup variant="contained" color="secondary">
            <Button onClick={() => goBack()}>Atras</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Container>
  );
};

PaginaError.propTypes = {
  message: PropTypes.string,
  status: PropTypes.any,
  subErrors: PropTypes.array,
};

export default PaginaError;

export const PaginaError404 = () => {
  const error = {
    status: 404,
    message: "La pagina solicitada no existe",
  };

  return <PaginaError {...error} />;
};
