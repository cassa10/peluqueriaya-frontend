import React, { useEffect, useState, useCallback } from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid"
import ListaPeluqueros from '../components/ListaPeluqueros';
import Button from "@material-ui/core/Button";
import API from '../service/api';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        cursor: 'pointer',
    },
}));

const PaginaBusquedaPeluqueros = (props) => {
    const clases = useStyles();
    const [ubicacion] = useState(
        {
            latitude: sessionStorage.getItem('userLocationLatitude'),
            longitude: sessionStorage.getItem('userLocationLongitude')
        });

    const [resultados, setResultados] = useState([])

    const irPaginaPrincipal = useCallback(() => {
        props.history.push({
            pathname: '/',
            state: {}
        });
    },[props.history]);

    useEffect(() => {
        if (!ubicacion.latitude || !ubicacion.longitude) {
            irPaginaPrincipal()
        }
        API.get('/peluquero/search', ubicacion)
            .then((response) => setResultados(response))
            .catch((error) => console.log(error))
    },[ubicacion,irPaginaPrincipal]);


    return (
        <div>
            <Box bgcolor="primary.main" color="primary.contrastText" textAlign="center" m={2}>
                <Grid container justify="center">
                    <img
                        className={clases.img}
                        src={'peluqueriaya-logo.png'}
                        alt="logo"
                        onClick={irPaginaPrincipal}
                    />
                </Grid>
            </Box>
            
            <ListaPeluqueros
                resultados={resultados}
                botonIrPaginaPrincipal={
                    <Button size="small" color="secondary" onClick={irPaginaPrincipal}>
                        Volver e intentar con otra ubicación
                    </Button>
                }
            />
        </div>
    );
};

export default PaginaBusquedaPeluqueros;