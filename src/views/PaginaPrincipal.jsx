import React, { useState } from "react";
import { Typography, Box, Grid, Paper, Button } from "@material-ui/core";
import AutocompletadoDeUbicacion from "../components/AutocompletadoDeUbicacion";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import logo from "../assets/images/peluqueriaya-logo.png";

const useStyles = makeStyles(() => ({
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  submitButton: {
    height: "100%",
  },
}));

const PaginaPrincipal = () => {
  const clases = useStyles();
  const [ubicacion, setUbicacion] = useState(null);
  const [valido, setValido] = useState(false);
  let { push } = useHistory();

  const buscarPeluqueros = () => {
    sessionStorage.setItem("ubicacion", JSON.stringify(ubicacion));
    push("/search");
  };

  return (
    <Box
      bgcolor="primary.main"
      color="primary.contrastText"
      textAlign="center"
      m={6}
    >
      <Grid container justify="center">
        <img className={clases.img} src={logo} alt="logo" />
      </Grid>
      <Typography variant="h6" gutterBottom>
        Plataforma que permite a cualquier peluquero/a brindar sus servicios a
        domicilio.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Busque su peluquero mas cercano.
      </Typography>
      <Box display="flex" justifyContent="center" p={4} m={3}>
        <Grid container justify="center" spacing={1}>
          <Grid item xs={8}>
            <Paper>
              <AutocompletadoDeUbicacion
                {...{ ubicacion, setUbicacion, valido, setValido }}
              />
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              type="submit"
              className={clases.submitButton}
              onClick={() => buscarPeluqueros()}
              disabled={!valido}
            >
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PaginaPrincipal;
