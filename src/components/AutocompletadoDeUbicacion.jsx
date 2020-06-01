import React, {useState} from "react";
import PropTypes from 'prop-types';
import {TextField, InputAdornment} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useGetUbicacionConCoords, useGetUbicacionConDireccion} from "../service/ServicioDeMapas";
import AddLocationIcon from '@material-ui/icons/AddLocation';
import IconButton from "@material-ui/core/IconButton";
import EstadoIcon from "./EstadoIcon";
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles(() => ({
    iconButton: {
        padding: 0
    },
    submitButton: {
        height: "100%"
    }
}));

const AutocompletadoDeUbicacion = ({ubicacion, setUbicacion, submitUbicacion, ...props}) => {
    const classes = useStyles();
    const [ubicaciones, setUbicaciones] = useState([]);
    const {cargandoUDC, setCoordenadas} = useGetUbicacionConCoords(setUbicacion);
    const {cargandoUDD, setDireccion} = useGetUbicacionConDireccion(setUbicaciones);

    const seleccionoUnaPosicion = () => ubicacion !== null && ubicacion.position.lat !== "" &&
        ubicacion.position.lng !== "";

    const estanCargando = () => cargandoUDC || cargandoUDD;

    const autocompletarUbicacionConDireccion = value => {
        if (!estanCargando() && !seleccionoUnaPosicion() && value.trim().length > 10) {
            setDireccion(value);
        }
    };

    const manejarOnChange = (e, value) => setUbicacion(value);

    const manejarOnInputChange = (e, value, reason) => {
        if (reason !== "reset") {
            setUbicacion({
                title: value,
                position: {
                    lat: "",
                    lng: ""
                }
            });
        }
        autocompletarUbicacionConDireccion(value);
    };

    const renderInput = (params) =>
        <TextField {...params} color="secondary" variant="outlined" {...props}
                   placeholder="Ingrese su dirección con localidad" InputProps={{
            ...params.InputProps,
            startAdornment: (
                <InputAdornment position="start">
                    <Tooltip title="Usar mi ubicación">
                        <IconButton color="secondary" component="span" onClick={setCoordenadas}
                                    disabled={estanCargando()} className={classes.iconButton}>
                            <AddLocationIcon fontSize="large"/>
                        </IconButton>
                    </Tooltip>
                    <EstadoIcon cargando={estanCargando()} condicion={seleccionoUnaPosicion()}/>
                </InputAdornment>)
        }}
        />;

    const renderComponente = () => (
        <Autocomplete fullWidth
                      freeSolo
                      value={ubicacion}
                      onChange={manejarOnChange}
                      onInputChange={manejarOnInputChange}
                      options={ubicaciones}
                      loading={cargandoUDD}
                      getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
                      renderInput={renderInput}
        />
    );

    if (submitUbicacion) {
        return <Grid container spacing={1}>
            <Grid item xs={11}>
                <Paper>
                    {renderComponente()}
                </Paper>
            </Grid>
            <Grid item xs={1}>
                <Button variant="contained" size="large" color="secondary" type="submit"
                         className={classes.submitButton} onClick={() => submitUbicacion()}
                        disabled={estanCargando() || !seleccionoUnaPosicion()}>
                    <SearchIcon/>
                </Button>
            </Grid>
        </Grid>;
    }

    return renderComponente();
};

AutocompletadoDeUbicacion.propTypes = {
    ubicacion: PropTypes.object,
    setUbicacion: PropTypes.func,
    submitUbicacion: PropTypes.func
};

export default AutocompletadoDeUbicacion;