import React, { useEffect, useState, useCallback } from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid"
import ListaPeluqueros from '../components/ListaPeluqueros';
import Button from "@material-ui/core/Button";
import API from '../service/api';
import '../css/SearchResults.css';

const PaginaBusquedaPeluqueros = (props) => {

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
                <img
                    className="logo_redirector"
                    src={'peluqueriaya-logo.png'}
                    alt="logo"
                    onClick={irPaginaPrincipal}
                />
            </Box>
            <Grid
                container
                direction="column"
                justify="flex-end"
                alignItems="center"
            >
                <ListaPeluqueros
                    resultados={resultados}
                    botonIrPaginaPrincipal={
                        <Button size="small" color="secondary" onClick={irPaginaPrincipal}>
                            Volver e intentar con otra ubicación
                        </Button>
                    }
                />
            </Grid>
        </div>
    );
};

export default PaginaBusquedaPeluqueros;