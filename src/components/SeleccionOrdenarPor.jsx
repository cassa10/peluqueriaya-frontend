import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormControl, Select, MenuItem } from "@material-ui/core";

const SeleccionOrdenarPor = ({ setFiltro }) => {
  const [ordenarPor, setOrdenarPor] = useState("");

  const handleChange = (event) => {
    const nuevoOrdenarPor = event.target.value;
    setOrdenarPor(nuevoOrdenarPor);
    if (nuevoOrdenarPor !== "Ninguno") setFiltro({ sort: nuevoOrdenarPor });
    else setFiltro({ sort: "nombre,asc" });
  };

  return (
    <FormControl>
      <Select value={ordenarPor} onChange={handleChange} displayEmpty>
        <MenuItem aria-label="None" value={""} disabled>
          {" "}
          Ordenar por
        </MenuItem>
        <MenuItem value={"Ninguno"}>Ninguno</MenuItem>
        <MenuItem value={"corteMin,asc"}>Menor Servicio Básico</MenuItem>
        <MenuItem value={"corteMin,desc"}>Mayor Servicio Básico</MenuItem>
      </Select>
    </FormControl>
  );
};

SeleccionOrdenarPor.propTypes = {
  setFiltro: PropTypes.func,
};

export default SeleccionOrdenarPor;
