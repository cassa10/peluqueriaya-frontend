import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useGetTiposDeServicios } from "../service/ServicioDeServicio";

import { AppBar, Tabs, Tab } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  img: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

const TabDeFiltradoPorServicio = ({ setFiltro, limpiarFiltro }) => {
  const classes = useStyles();
  const [tipoDeServicio, setTipoDeServicio] = useState(false);
  const [tiposDeServicio, setTiposDeServicio] = useState(null);
  const fdatos = (data) =>
    setTiposDeServicio([{ id: "BORRAR", nombre: "Todos" }, ...data]);
  useGetTiposDeServicios(fdatos);

  const handleChange = (event, nuevoTipoDeServicio) => {
    if (nuevoTipoDeServicio === "BORRAR") {
      setTipoDeServicio(false);
      limpiarFiltro("tipoDeServicio");
    } else {
      setFiltro({ tipoDeServicio: nuevoTipoDeServicio });
      setTipoDeServicio(nuevoTipoDeServicio);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        {tiposDeServicio && (
          <Tabs
            value={tipoDeServicio}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            {tiposDeServicio.map((tipo) => (
              <Tab
                label={tipo.nombre}
                icon={
                  <img
                    className={classes.img}
                    src={require(`../assets/images/${tipo.id}.jpg`)}
                    alt="logo"
                  />
                }
                key={tipo.id}
                value={tipo.id}
              />
            ))}
          </Tabs>
        )}
      </AppBar>
    </div>
  );
};

TabDeFiltradoPorServicio.propTypes = {
  setFiltro: PropTypes.func,
  limpiarFiltro: PropTypes.func,
};

export default TabDeFiltradoPorServicio;
