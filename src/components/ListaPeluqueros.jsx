import React from 'react';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';
import {Card, Grid, CardActions, CardContent} from '@material-ui/core';
import ModalServiciosPeluquero from './ModalServiciosPeluquero';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const ListaPeluqueros = ({resultados, botonIrPaginaPrincipal }) => {
    const classes = useStyles();

    const resultadoVacio = () => {
        return (
            <Box bgcolor="primary.main" color="primary.contrastText" textAlign="center" m={14}>
                <Box bgcolor="primary.main" color="primary.contrastText" m={4}>
                    <Typography variant="h5" component="h2">
                        No hay peluqueros disponibles en tu zona :C
                    </Typography>
                    <Box m={1}>
                        {botonIrPaginaPrincipal}  
                    </Box>    
                </Box>
                
                
            </Box>
        )
    }

    const construirEstadoPeluquero = (status) => {
        if(status === "DISPONIBLE"){
            return (
                <Typography className={classes.title} color="secondary" gutterBottom>
                        {status}
                </Typography>
            );
        }
        return(
            <Typography className={classes.title} color="error" gutterBottom>
                        {status}
            </Typography>
        );
    }

    const logoPredeterminado = (logoSrc) => {
        if (logoSrc.length > 0){
            return logoSrc
        }
        return "https://2.bp.blogspot.com/-JmAJ1XEBGfE/UTPme5-0HpI/AAAAAAAAARE/bT_fEs-9vQ4/s1600/No-Logo-Available.png"
    }

    const costruirCardPeluquero = (peluquero) => {
        return (
            <Box key={peluquero.id} textAlign="center" m={2}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        {construirEstadoPeluquero(peluquero.estado)}
                        <img
                            src={logoPredeterminado(peluquero.logo)}
                            width="150"
                            alt="logo"
                        />
                        <Typography variant="h5" component="h2">
                            {peluquero.nombre}
                        </Typography>
                        <hr />
                        <Typography variant="body2" component="p">
                            Corte minimo | ${peluquero.corteMin}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <ModalServiciosPeluquero peluquero={peluquero}/>
                    </CardActions>
                </Card>
            </Box>
        );
    }

    const construirResultados = () => {
        return (
            <div>
                {resultados.map(h => costruirCardPeluquero(h))}
            </div>
        );
    }

    const resultadosDeBusqueda = (results) => {
        if (results.length <= 0) {
            return (resultadoVacio());
        }else {
            return (construirResultados());
        }
    }

    return (
        <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
            >
            {resultadosDeBusqueda(resultados)}
        </Grid>
    );
};

export default ListaPeluqueros;