import React from 'react';
import {useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';
import {Card, Grid, CardActions, CardContent, Button} from '@material-ui/core';
import ModalServiciosPeluquero from './ModalServiciosPeluquero';
import PuntajeStars from './PuntajeStars';
import Swal from 'sweetalert2';
import formatPrice from '../formatters/formatPrice';
import StarIcon from '@material-ui/icons/Star';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        background: "#ecf4f3",
        margin: 12,
        '&:hover': {
            boxShadow: '0 -5px 0px 0px #2b71a6',
        },
    },
    title: {
        fontSize: 14,
        color: "#007892",
    },
    ocupadoTitle: {
        fontSize: 14,
        color: "#9a1f40",
    },
    pos: {
        marginBottom: 12,
    },
    logoImg: {
        minWidth: 150,
        maxWidth: 150,
        minHeight: 150,
        maxHeight: 150,
    },
    buttonPedir:{
        color: "#57a99a"
    }
});

const ListaPeluqueros = ({resultados, botonIrPaginaPrincipal }) => {
    const classes = useStyles();
    let {push} = useHistory();

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
                <Typography className={classes.title} gutterBottom>
                        {status}
                </Typography>
            );
        }
        return(
            <Typography className={classes.ocupadoTitle} gutterBottom>
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
        const handleDialogContratar = () => {
            Swal.fire({
                title: '¿Estás seguro?',
                html: `Esto te llevará a la página del peluquero "<b>${peluquero.nombre}</b>".`,
                showCancelButton: true,
                cancelButtonColor: 'Red',
                confirmButtonColor: 'Green',
                cancelButtonText: 'Volver a la busqueda',
                confirmButtonText: 'Si, llevame!',
                reverseButtons: true,
            }).then((result) => handleContratar(result.value))
        }

        const handleContratar = (isAcepted) => {
            if(isAcepted)
                irALaPaginaDelPeluquero()
        }

        const irALaPaginaDelPeluquero = () => {
            sessionStorage.setItem('idPeluqueroAContratar', peluquero.id)
            push('/contratar')
        }

        const handleShowStars = (puntuacionPromedio) => {
            return(
                puntuacionPromedio > 0 ? showStars(puntuacionPromedio) : showSinPuntuacion()
            );
        }

        const showSinPuntuacion = () => {
            return(
                <div>
                     <StarIcon style={{ color: '#ecf4f3' }}/>
                </div>
            );
        }
        

        const showStars = (puntuacionPromedio) => <PuntajeStars puntaje={puntuacionPromedio} puntajeMax={5}/>

        return (
            <Grid key={peluquero.id} item xs={12} sm={6} md={4}>
                <Box textAlign="center">
                    <Card className={classes.root} variant="outlined" xs={6} sm={4} md={2}>
                        <CardContent>
                            {construirEstadoPeluquero(peluquero.estado)}
                            <img
                                className={classes.logoImg}
                                src={logoPredeterminado(peluquero.logo)}
                                alt="logo"
                            />
                            {handleShowStars(peluquero.puntuacionPromedio)}
                            <Typography variant="h5" component="h2">
                                {peluquero.nombre}
                            </Typography>
                            <hr />
                            <Typography variant="body2" component="p">
                                Corte minimo | {formatPrice(peluquero.corteMin)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <ModalServiciosPeluquero peluquero={peluquero}/>
                            <Grid container direction="row" justify="flex-end" alignItems="center">
                                <Button className={classes.buttonPedir} size="small" onClick={handleDialogContratar}>Contratar</Button>
                            </Grid>
                        </CardActions>
                        
                    </Card>
                </Box>
            </Grid>
        );
    }

    const construirResultados = (results) => {
        return (
            <Grid container
                justify="space-around"
                alignItems="flex-start"
            >
                {results.map(h => costruirCardPeluquero(h))}
            </Grid>
        );
    }

    const resultadosDeBusqueda = (results) => {
        if (results.length <= 0) {
            return (resultadoVacio());
        }else {
            return (construirResultados(results));
        }
    }

    return (
        resultadosDeBusqueda(resultados)
    );
};

export default ListaPeluqueros;