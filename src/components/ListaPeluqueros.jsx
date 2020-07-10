import React from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  CardActions,
  CardContent,
  Button,
  Chip,
} from "@material-ui/core";
import ModalServiciosPeluquero from "./ModalServiciosPeluquero";
import Swal from "sweetalert2";
import formatPrice from "../utils/formatters/formatPrice";
import PuntajePeluquero from "./PuntajePeluquero";
import getLogoOrDefault from "../utils/getLogoOrDefault";
import TypographyWithToolTip from "./TypographyWithToolTip";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    background: "#ecf4f3",
    marginTop: 45,
    marginBottom: 18,
    marginLeft: 12,
    marginRight: 12,
    "&:hover": {
      boxShadow: "0 -5px 0px 0px #2b71a6",
    },
  },
  title: {
    fontSize: 14,
    color: "#007892",
  },
  ocupadoTitle: {
    fontSize: 14,
    color: "#9a1f40",
  },
  pos: {
    marginBottom: 12,
  },
  logoImg: {
    minWidth: 150,
    maxWidth: 150,
    minHeight: 150,
    maxHeight: 150,
  },
  buttonPedir: {
    color: "#57a99a",
  },
  statusPeluqueroBox: {
    marginBottom: "7px",
  }
});

const ListaPeluqueros = ({ resultados, botonIrPaginaPrincipal }) => {
  const classes = useStyles();
  let { push } = useHistory();

  const resultadoVacio = () => {
    return (
      <Box
        bgcolor="primary.main"
        color="primary.contrastText"
        textAlign="center"
        m={14}
      >
        <Box bgcolor="primary.main" color="primary.contrastText" m={4}>
          <Typography variant="h5" component="h2">
            No hay peluqueros disponibles en tu zona :C
          </Typography>
          <Box m={1}>{botonIrPaginaPrincipal}</Box>
        </Box>
      </Box>
    );
  };

  const mostrarEstadoPeluquero = (estaDisponible) => (
    estaDisponible?
      <Chip
        style={{ backgroundColor: "#2ecc71", color: "white" }}
        label="Disponible"
      />
    :
      <Chip
        style={{ backgroundColor: "#cd5c5c", color: "white" }}
        label="Ocupado"
      />
  )
  
  const construirEstadoPeluquero = (estaDisponible) => (
      <Grid container direction="column" justify="center" alignItems="center">
        <div className={classes.statusPeluqueroBox}>
          {mostrarEstadoPeluquero(estaDisponible)}
        </div>
      </Grid>
  );

  const costruirCardPeluquero = (peluquero) => {
    const handleDialogContratar = () => {
      Swal.fire({
        title: "¿Estás seguro?",
        html: `Esto te llevará a la página del peluquero "<b>${peluquero.nombre}</b>".`,
        showCancelButton: true,
        cancelButtonColor: "Red",
        confirmButtonColor: "Green",
        cancelButtonText: "Volver a la busqueda",
        confirmButtonText: "Si, llevame!",
        reverseButtons: true,
      }).then((result) => handleContratar(result.value));
    };

    const handleContratar = (isAcepted) => {
      if (isAcepted) irALaPaginaDelPeluquero();
    };

    const irALaPaginaDelPeluquero = () => {
      sessionStorage.setItem("idPeluqueroAContratar", peluquero.id);
      push("/contratar");
    };

    return (
      <Grid key={peluquero.id} item xs={12} sm={6} md={4}>
        <Box textAlign="center">
          <Card
            className={classes.root}
            variant="outlined"
            xs={6}
            sm={4}
            md={2}
          >
            <CardContent>
              {construirEstadoPeluquero(peluquero.estaDisponible)}
              <img
                className={classes.logoImg}
                src={getLogoOrDefault(peluquero.logo)}
                alt="logo"
              />
              <div>
                {peluquero.puntuacionPromedio > 0 ? (
                  <PuntajePeluquero
                    defaultValue={peluquero.puntuacionPromedio}
                  />
                ) : (
                  <br />
                )}
              </div>
              <TypographyWithToolTip variant="h5" component="h2">
                {peluquero.nombre}
              </TypographyWithToolTip>
              <TypographyWithToolTip variant="body2" component="p">
                {peluquero.descripcion}
              </TypographyWithToolTip>
              <hr />
              <Typography variant="body2" component="p">
                Corte minimo | {formatPrice(peluquero.corteMin)}
              </Typography>
            </CardContent>
            <CardActions>
              <ModalServiciosPeluquero peluquero={peluquero} />
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Button
                  className={classes.buttonPedir}
                  size="small"
                  onClick={handleDialogContratar}
                >
                  Contratar
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    );
  };

  const construirResultados = (results) => {
    return (
      <Grid container justify="space-around" alignItems="flex-start">
        {results.map((h) => costruirCardPeluquero(h))}
      </Grid>
    );
  };

  const resultadosDeBusqueda = (results) => {
    if (results.length <= 0) {
      return resultadoVacio();
    } else {
      return construirResultados(results);
    }
  };

  return resultadosDeBusqueda(resultados);
};

export default ListaPeluqueros;
