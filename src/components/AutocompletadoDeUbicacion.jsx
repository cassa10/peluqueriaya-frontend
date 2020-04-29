import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AddLocationIcon from '@material-ui/icons/AddLocation';
import ErrorIcon from "@material-ui/icons/Error";
import DoneIcon from "@material-ui/icons/Done";
import React, {useState} from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import useServicioDeMapas from "../service/useServicioDeMapas";
import CircularProgress from "@material-ui/core/CircularProgress";


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
    const [ubicaciones, setUbicaciones] = useState([]);
    const [{ubicacionDandoCoords, cargandoUDC}, {ubicacionDandoDireccion, cargandoUDD}] = useServicioDeMapas();

    const seleccionoUnaPosicion = () => {
        return ubicacion !== null &&
            ubicacion.position.lat !== "" &&
            ubicacion.position.lng !== "";
    }

    const estanCargando = () => cargandoUDC || cargandoUDD;

    const autocompletarUbicacionConDireccion = value => {
        if (!estanCargando() && !seleccionoUnaPosicion() && value.length > 10) {
            ubicacionDandoDireccion(ubicacion.title, (ubicaciones) => setUbicaciones(ubicaciones));
        }
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
        autocompletarUbicacionConDireccion(value);
    };

    return <Grid container className={clases.root}>
        <Grid item xs="auto">
            <Button variant="contained" color="secondary" className={clases.classButton}
                    onClick={() => ubicacionDandoCoords((ubicacion) => setUbicacion(ubicacion))}
                    disabled={estanCargando()}>
                <AddLocationIcon fontSize="large"/>
            </Button>
        </Grid>
        <Grid item xs="auto" sm={8} md={9} lg={10}>
            <Paper>
                <Autocomplete
                    disablePortal
                    freeSolo
                    value={ubicacion}
                    onChange={manejarOnChange}
                    onInputChange={manejarOnInputChange}
                    noOptionsText={"No se encontraron resultados, escriba una dirección con más de 10 dígitos"}
                    options={ubicaciones}
                    loading={cargandoUDD}
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
                                        {!seleccionoUnaPosicion() && !estanCargando() && <ErrorIcon color="secondary"/>}
                                        {seleccionoUnaPosicion() && !estanCargando() && <DoneIcon color="secondary"/>}
                                        {!seleccionoUnaPosicion() && estanCargando() &&
                                        <CircularProgress color="secondary" size={30}/>}
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
                    disabled={estanCargando() || !seleccionoUnaPosicion()}>
                <SearchIcon/>
            </Button>}
        </Grid>
    </Grid>
}

export default AutocompletadoDeUbicacion;