import React, { useState } from "react";
import PropTypes from "prop-types";
import { Clear as ClearIcon, Search as SearchIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import {
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  input: {
    padding: 0,
  },
  boton: {
    padding: "4px",
  },
}));

const CampoDeBusqueda = ({ onClick, clear }) => {
  const clases = useStyles();
  const [nombre, setNombre] = useState("");

  const handleChange = (event) => {
    setNombre(event.target.value);
  };

  const handleClear = () => {
    setNombre("");
    clear("nombre");
  };

  const tieneNombreMenosDeCuatroDigitos = () => nombre.trim().length < 4;

  return (
    <Paper elevation={0}>
      <TextField
        fullWidth
        autoFocus
        value={nombre}
        size="small"
        onChange={handleChange}
        placeholder="Buscar por nombre"
        variant="outlined"
        InputProps={{
          className: clases.input,
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Buscar">
                <IconButton
                  onClick={() => onClick({ nombre: nombre })}
                  disabled={tieneNombreMenosDeCuatroDigitos()}
                  className={clases.boton}
                >
                  <SearchIcon fontSize="inherit" color="secondary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Borrar búsqueda por nombre">
                <IconButton onClick={handleClear}>
                  <ClearIcon fontSize="inherit" color="secondary" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
};

CampoDeBusqueda.propTypes = {
  onClick: PropTypes.func.isRequired,
  clear: PropTypes.func,
};

export default CampoDeBusqueda;
