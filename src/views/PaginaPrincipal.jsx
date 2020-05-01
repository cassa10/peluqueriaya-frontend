import React, {useState} from 'react';
import {Typography, Box, Grid} from "@material-ui/core";
import AutocompletadoDeUbicacion from "../components/AutocompletadoDeUbicacion";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router";

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
    let {push} = useHistory();

    const buscarPeluqueros = () => {
        const {position} = ubicacion;
        sessionStorage.setItem('userLocationLatitude', position.lat)
        sessionStorage.setItem('userLocationLongitude', position.lng)
        push("/search");
    };

    return <Box bgcolor="primary.main" color="primary.contrastText" textAlign="center" m={6}>
        <Grid container justify="center">
            <img
                className={clases.img}
                src={require('../assets/images/peluqueriaya-logo.png')}
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
