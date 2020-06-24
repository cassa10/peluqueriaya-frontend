import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Container,
  Grid,
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
    color: "white",
    textAlign: "center",
  },
  gridItem: {
    margin: "auto",
  },
  gridItemTitle: {
    margin: "auto",
  },
}));

const PaginaError = ({
  message = "Ha ocurrido un error inesperado. Por favor, intente nuevamente",
  status = "Ups, hubo un error :(",
  subErrors = [],
}) => {
  const clases = useStyles();
  let { goBack } = useHistory();

  return (
    <Container maxWidth="md" className={clases.root}>
      <Grid container justify="center" direction="column" spacing={3}>
        <Grid item className={clases.gridItemTitle}>
          <Typography variant="h2" className={clases.font}>
            {status}
          </Typography>
        </Grid>
        <Grid item className={clases.gridItem}>
          <Typography className={clases.font} variant="h6">
            {message}
          </Typography>
          {subErrors.map((mensaje, index) => (
            <Typography className={clases.font} variant="body2" key={index}>
              {` • ${mensaje}`}
            </Typography>
          ))}
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
    message: "La pagina solicitada no existe",
  };

  return <PaginaError {...error} />;
};
