import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Clear as ClearIcon, Search as SearchIcon} from "@material-ui/icons";


const CampoDeBusqueda = ({onClick, clear}) => {
    const [nombre, setNombre] = useState("");

    const handleChange = (event) => {
        setNombre(event.target.value);
    };

    const handleClear = () => {
        setNombre("");
        clear("nombre");
    };

    const tieneNombreMenosDeCuatroDigitos = () => nombre.trim().length < 4

    return (
        <Paper elevation={0}>
            <TextField multiline fullWidth autoFocus value={nombre} size="small" onChange={handleChange}
                       variant="outlined" InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <IconButton onClick={() => onClick({nombre: nombre})}
                                    disabled={tieneNombreMenosDeCuatroDigitos()}>
                            <SearchIcon fontSize="inherit" color="primary"/>
                        </IconButton>
                        <IconButton onClick={handleClear}>
                            <ClearIcon fontSize="inherit" color="primary"/>
                        </IconButton>
                    </InputAdornment>)
            }}
            />
        </Paper>
    );
}

CampoDeBusqueda.propTypes = {
    onClick: PropTypes.func.isRequired,
    clear: PropTypes.func,
};

export default CampoDeBusqueda;