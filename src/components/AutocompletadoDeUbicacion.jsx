import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import AddLocationIcon from '@material-ui/icons/AddLocation';
import ErrorIcon from "@material-ui/icons/Error";
import DoneIcon from "@material-ui/icons/Done";
import React, {useEffect, useState} from "react";
import MapasAPI from "../service/mapasAPI";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'stretch',
        justify: "center",
        width: "80%",
    },
    classButton: {
        width: "100%",
        height: "100%"
    },
}));

const AutocompletadoDeUbicacion = ({ubicacion, setUbicacion, botonOpcional}) => {
    const clases = useStyles();
    const [cargando, setCargando] = useState(false);
    const [ubicaciones, setUbicaciones] = useState([]);

    const seleccionoUnaPosicion = () => {
        return ubicacion !== null &&
            ubicacion.position.lat !== "" &&
            ubicacion.position.lng !== "";
    }

    const esValidaUbicacionIngresada = () => {
        return ubicacion !== null && ubicacion.title.length > 10;
    }

    useEffect(() => {
        // eslint-disable-next-line
        if (!cargando && !seleccionoUnaPosicion() && esValidaUbicacionIngresada()) {
            setCargando(true);
            MapasAPI.obtenerUbicacionConDireccion(ubicacion.title)
                .then(({data}) => setUbicaciones(data.items))
                .catch((error) => console.log(error))
                .finally(() => setCargando(false))
        }
        // eslint-disable-next-line
    }, [cargando, ubicacion])

    const obtenerUbicacionConCoords = () => {
        setCargando(true)
        navigator.geolocation.getCurrentPosition(({coords}) => {
            const {latitude, longitude} = coords;
            MapasAPI.obtenerDireccionConCoords(latitude, longitude)
                .then(({data}) => setUbicacion(data.items[0]))
                .catch((error) => console.log(error))
                .finally(() => setCargando(false))
        });
    };

    const manejarOnChange = (e, value) => {
        setUbicacion(value);
    }

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
    };

    return <Grid container className={clases.root}>
        <Grid item xs={1}>
            <IconButton color="secondary" className={clases.classButton}
                        onClick={() => obtenerUbicacionConCoords()} disabled={cargando}>
                <AddLocationIcon fontSize="large"/>
            </IconButton>
        </Grid>
        <Grid item xs={10}>
            <Paper>
                <Autocomplete
                    disablePortal
                    freeSolo
                    value={ubicacion}
                    onChange={manejarOnChange}
                    onInputChange={manejarOnInputChange}
                    noOptionsText={"No se encontraron resultados, escriba una dirección con más de 10 dígitos"}
                    options={ubicaciones}
                    loading={cargando}
                    getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
                    renderInput={(params) => {
                        return <TextField
                            {...params}
                            color={"secondary"}
                            variant={"outlined"}
                            placeholder="Ingrese su direccion, ej: Mitre 123 Quilmes"
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {seleccionoUnaPosicion() ?
                                            <DoneIcon color="secondary"/> :
                                            <ErrorIcon color="secondary"/>}
                                    </InputAdornment>
                                )
                            }}
                        />;
                    }}
                />
            </Paper>
        </Grid>
        <Grid item xs={1}>
            {botonOpcional &&
            <Button variant="contained"
                    className={clases.classButton}
                    size="large"
                    color="secondary"
                    type="submit"
                    onClick={botonOpcional.onClick}
                    disabled={cargando || !seleccionoUnaPosicion()}>
                <SearchIcon/>
            </Button>}
        </Grid>
    </Grid>
}

export default AutocompletadoDeUbicacion;