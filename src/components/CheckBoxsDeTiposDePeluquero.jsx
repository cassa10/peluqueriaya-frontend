import React, {useState} from 'react';
import PropTypes from 'prop-types';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Person, PersonOutline} from "@material-ui/icons";

const CheckBoxsDeTiposDePeluquero = ({setFiltro}) => {
    const [tiposDePeluquero, setTiposDePeluquero] = useState({
        hombre: false,
        mujer: false,
        kids: false,
    });

    const handleChange = (event) => {
        const nuevosTiposPeluqueros = {...tiposDePeluquero, [event.target.name]: event.target.checked};
        const tiposDePeluqueroLs = [];
        Object.entries(nuevosTiposPeluqueros).forEach(([tipo, checked]) => {
            if (checked) tiposDePeluqueroLs.push(tipo.toUpperCase());
        })
        setTiposDePeluquero(nuevosTiposPeluqueros);
        setFiltro({tipos: tiposDePeluqueroLs});
    };

    return (
        <FormGroup row>
            {["Mujer", "Hombre", "Kids"].map((tipo, index) =>
                <FormControlLabel key={index} label={tipo} control={
                    <Checkbox checked={tiposDePeluquero[tipo.toLowerCase()]} onChange={handleChange}
                              icon={<PersonOutline/>} checkedIcon={<Person/>} name={tipo.toLowerCase()}
                              color="secondary"/>}/>)}
        </FormGroup>
    );
};

CheckBoxsDeTiposDePeluquero.propTypes = {
    setFiltro: PropTypes.func.isRequired,
};

export default CheckBoxsDeTiposDePeluquero;