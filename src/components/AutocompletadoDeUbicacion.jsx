import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useGetUbicacionConDireccion } from "../service/ServicioDeMapas";
import EstadoIcon from "./icons/EstadoIcon";

const AutocompletadoDeUbicacion = ({
  ubicacion,
  setUbicacion,
  valido,
  setValido,
  ...props
}) => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const { cargando, setDireccion } = useGetUbicacionConDireccion(
    setUbicaciones
  );

  const autocompletarUbicacionConDireccion = (value) => {
    if (!cargando && !valido && value.trim().length > 10) {
      setDireccion(value);
    }
  };

  const manejarOnChange = (event, value) => setUbicacion(value);

  const manejarOnInputChange = (e, value, reason) => {
    if (reason !== "reset") {
      setUbicacion({
        title: value,
        position: {
          lat: "",
          lng: "",
        },
      });
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
        typeof option === "string" ? option : option.title
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
