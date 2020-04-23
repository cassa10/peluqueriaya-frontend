import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AutocompletadoDeUbicacion from "../components/AutocompletadoDeUbicacion";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

const PaginaPrincipal = () => {
    const clases = useStyles();
    const [ubicacion, setUbicacion] = useState(null);

    const buscarPeluqueros = () => {
        if (ubicacion.position) {
            sessionStorage.setItem('userLocationLatitude',ubicacion.position.lat)
            sessionStorage.setItem('userLocationLongitude',ubicacion.position.lng)
            window.location.href = '/search';
        }
    };

    return <Box bgcolor="primary.main" color="primary.contrastText" textAlign="center" m={6}>
        <Grid container justify="center">
            <img
                    className={clases.img}
                    src={'peluqueriaya-logo.png'}
                    alt="logo"
                />
        </Grid>
        <Typography variant="h6" gutterBottom>
            Plataforma que permite a cualquier peluquero/a brindar sus servicios a domicilio.
        </Typography>
        <Typography variant="h6" gutterBottom>
            Busque su peluquero mas cercano.
        </Typography>
        <Box display={"flex"} justifyContent={"center"} p={4}>
            <AutocompletadoDeUbicacion
                ubicacion={ubicacion}
                setUbicacion={setUbicacion}
                botonOpcional={{onClick: buscarPeluqueros}}/>
        </Box>
    </Box>

};

export default PaginaPrincipal;
