import React, { useEffect, useState } from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid"
import ListaPeluqueros from '../components/ListaPeluqueros';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import useServicioDePeluquero from "../service/useServicioDePeluquero";
import {useHistory} from "react-router";

const useStyles = makeStyles(() => ({
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        cursor: 'pointer',
    },
}));

const PaginaBusquedaPeluqueros = () => {
    const clases = useStyles();
    const [resultados, setResultados] = useState([]);
    const [{buscarPeluquero}] = useServicioDePeluquero();
    const {push} = useHistory();

    useEffect(() => {
        buscarPeluquero((peluqueros) => setResultados(peluqueros));
        // eslint-disable-next-line
    },[]);

    const irPaginaPrincipal = () => push("/");

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