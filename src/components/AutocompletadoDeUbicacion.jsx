import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useGetUbicacionConDireccion } from "../service/ServicioDeMapas";
import EstadoIcon from "./icons/EstadoIcon";
import MapIcon from "@material-ui/icons/Map";
import { useUser } from "../contexts/UserProvider";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";
import { withSegunUserN } from "../wrappers/withSegunUser";

const CanClienteXorPeluquero = withSegunUserN([
  {
    f: ({ esCliente }) => esCliente,
    fProps: { fubicacion: ({ cliente: { ubicacion } }) => ubicacion },
  },
  {
    f: ({ esCliente, esPeluquero }) => !esCliente && esPeluquero,
    fProps: { fubicacion: ({ peluquero: { ubicacion } }) => ubicacion },
  },
]);

const useStyles = makeStyles(() => ({
  botonMiUbicacion: {
    padding: "4px",
  },
}));

const AutocompletadoDeUbicacion = ({
  ubicacion,
  setUbicacion,
  valido,
  setValido,
  ...props
}) => {
  const classes = useStyles();
  const [ubicaciones, setUbicaciones] = useState([]);
  const { cargando, setDireccion } = useGetUbicacionConDireccion(
    setUbicaciones
  );
  const { cliente, peluquero } = useUser();
  const { pathname } = useLocation();

  const autocompletarUbicacionConDireccion = (value) => {
    if (!cargando && !valido && value.trim().length > 10) {
      setDireccion(value);
    }
  };

  const manejarOnChange = (event, value) => setUbicacion(value);

  const manejarOnInputChange = (e, value, reason) => {
    if (reason !== "reset") {
      setUbicacion({ direccion: value, latitude: "", longitude: "" });
    }
    setValido(reason === "reset");
    autocompletarUbicacionConDireccion(value);
  };

  const renderInput = (params) => (
    <TextField
      {...params}
      color="secondary"
      variant="outlined"
      {...props}
      placeholder="Ingrese su dirección con localidad"
      InputProps={{
        ...params.InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <CanClienteXorPeluquero>
              {({ fubicacion, index }) =>
                pathname === "/" && (
                  <Tooltip title="Usar mi dirección" key={index}>
                    <IconButton
                      color="secondary"
                      onClick={() =>
                        setUbicacion(fubicacion({ cliente, peluquero }))
                      }
                      className={classes.botonMiUbicacion}
                    >
                      <HomeIcon />
                    </IconButton>
                  </Tooltip>
                )
              }
            </CanClienteXorPeluquero>
            {valido && (
              <Tooltip title="Verifique su dirección en GoogleMaps">
                <IconButton
                  color="secondary"
                  className={classes.botonMiUbicacion}
                  onClick={() =>
                    window.open(
                      `https://maps.google.com/?q=${ubicacion.latitude},${ubicacion.longitude}`
                    )
                  }
                >
                  <MapIcon />
                </IconButton>
              </Tooltip>
            )}
            <EstadoIcon cargando={cargando} condicion={valido} />
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <Autocomplete
      fullWidth
      freeSolo
      disablePortal
      value={ubicacion}
      onChange={manejarOnChange}
      onInputChange={manejarOnInputChange}
      options={ubicaciones}
      loading={cargando}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.direccion
      }
      renderInput={renderInput}
    />
  );
};

AutocompletadoDeUbicacion.propTypes = {
  ubicacion: PropTypes.object,
  setUbicacion: PropTypes.func.isRequired,
  valido: PropTypes.bool.isRequired,
  setValido: PropTypes.func.isRequired,
};

export default AutocompletadoDeUbicacion;
