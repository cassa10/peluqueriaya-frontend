import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Clear as ClearIcon, Search as SearchIcon} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    input: {
        padding: 0
    }
}));

const CampoDeBusqueda = ({onClick, clear}) => {
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
            <TextField fullWidth autoFocus value={nombre} size="small" onChange={handleChange}
                       placeholder={"Buscá peluqueros por nombre"} variant="outlined" InputProps={{
                className: clases.input,
                endAdornment: (
                    <InputAdornment position="end">
                        <Tooltip title="Buscar">
                            <div>
                                <IconButton onClick={() => onClick({nombre: nombre})}
                                            disabled={tieneNombreMenosDeCuatroDigitos()}>
                                    <SearchIcon fontSize="inherit" color="primary"/>
                                </IconButton>
                            </div>
                        </Tooltip>
                        <Tooltip title="Borrar búsqueda por nombre">
                            <IconButton onClick={handleClear}>
                                <ClearIcon fontSize="inherit" color="primary"/>
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>)
            }}
            />
        </Paper>
    );
};

CampoDeBusqueda.propTypes = {
    onClick: PropTypes.func.isRequired,
    clear: PropTypes.func
};

export default CampoDeBusqueda;