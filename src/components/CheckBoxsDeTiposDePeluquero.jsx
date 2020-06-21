import React, { useState } from "react";
import PropTypes from "prop-types";
import { Person, PersonOutline } from "@material-ui/icons";
import { FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";

const CheckBoxsDeTiposDePeluquero = ({ setFiltro, defaultValues = {mujer: false, hombre: false, kids: false} }) => {
  const [tiposDePeluquero, setTiposDePeluquero] = useState(defaultValues);

  const handleChange = (event) => {
    const nuevosTiposPeluqueros = {
      ...tiposDePeluquero,
      [event.target.name]: event.target.checked,
    };
    const tiposDePeluqueroLs = [];
    Object.entries(nuevosTiposPeluqueros).forEach(([tipo, checked]) => {
      if (checked) tiposDePeluqueroLs.push(tipo.toUpperCase());
    });
    setTiposDePeluquero(nuevosTiposPeluqueros);
    setFiltro({ tipos: tiposDePeluqueroLs });
  };

  return (
    <FormGroup row>
      {["Mujer", "Hombre", "Kids"].map((tipo, index) => (
        <FormControlLabel
          key={index}
          label={tipo}
          control={
            <Checkbox
              checked={tiposDePeluquero[tipo.toLowerCase()]}
              onChange={handleChange}
              icon={<PersonOutline />}
              checkedIcon={<Person />}
              name={tipo.toLowerCase()}
              color="secondary"
            />
          }
        />
      ))}
    </FormGroup>
  );
};

CheckBoxsDeTiposDePeluquero.propTypes = {
  defaultValues: PropTypes.object,
  setFiltro: PropTypes.func.isRequired,
};

export default CheckBoxsDeTiposDePeluquero;
