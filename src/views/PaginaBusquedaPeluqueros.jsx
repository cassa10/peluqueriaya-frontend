import React, { useState } from "react";
import { Box, Grid, Button, AppBar, Toolbar } from "@material-ui/core";
import TabDeFiltradoPorServicio from "../components/TabDeFiltradoPorServicio";
import { useGetPeluqueros } from "../service/ServicioDePeluquero";
import ListaPeluqueros from "../components/ListaPeluqueros";
import { useHistory } from "react-router-dom";
import CirculitoCargando from "../components/CirculoCargando";
import { makeStyles } from "@material-ui/core/styles";
import CheckBoxsDeTiposDePeluquero from "../components/CheckBoxsDeTiposDePeluquero";
import CampoDeBusqueda from "../components/CampoDeBusqueda";
import SeleccionOrdenarPor from "../components/SeleccionOrdenarPor";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    padding: theme.spacing(1),
  },
}));

const PaginaBusquedaPeluqueros = () => {
  const clases = useStyles();
  const [{ peluqueros, actual, tamanio, total }, setPaginacion] = useState({
    peluqueros: [],
    actual: 1,
    tamanio: 6,
    total: 1,
  });
  const { cargando, setFiltro, limpiarFiltro } = useGetPeluqueros(
    tamanio,
    setPaginacion
  );
  const { push } = useHistory();

  const handleChange = (event, value) => {
    if (actual !== value) {
      setFiltro({ page: value - 1 });
    }
  };

  return (
    <Box
      bgcolor="primary.main"
      color="primary.contrastText"
      textAlign="center"
      m={2}
    >
      <Grid container direction="column">
        <Grid item xs>
          <TabDeFiltradoPorServicio
            setFiltro={setFiltro}
            limpiarFiltro={limpiarFiltro}
          />
        </Grid>
        <Grid item xs>
          <AppBar position="static">
            <Toolbar className={clases.toolbar} variant="dense">
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                spacing={1}
              >
                <Grid item md={3}>
                  <CampoDeBusqueda onClick={setFiltro} clear={limpiarFiltro} />
                </Grid>
                <Grid item>
                  <CheckBoxsDeTiposDePeluquero setFiltro={setFiltro} />
                </Grid>
                <Grid item>
                  <SeleccionOrdenarPor setFiltro={setFiltro} />
                </Grid>
                <Grid item>
                  {!(cargando || peluqueros.length === 0) ? (
                    <Pagination
                      color="secondary"
                      disabled={cargando}
                      count={total}
                      page={actual}
                      onChange={handleChange}
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs>
          {cargando ? (
            <CirculitoCargando />
          ) : (
            <ListaPeluqueros
              resultados={peluqueros}
              botonIrPaginaPrincipal={
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => push("/")}
                >
                  Volver e intentar con otra ubicación
                </Button>
              }
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaginaBusquedaPeluqueros;
