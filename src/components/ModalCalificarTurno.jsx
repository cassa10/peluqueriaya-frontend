import React, { useState } from 'react';
import { usePostCalificarTurno } from "../service/ServicioDeTurno";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import {Button, Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Grid
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    logoImg: {
        minWidth: 150,
        maxWidth: 150,
        minHeight: 150,
        maxHeight: 150,
        marginBottom: 5,
        border: "solid 2px",
        borderColor: "#0eacd4",
    },
}));

const ModalCalificarTurno = ({ turno, refreshTurnos }) => {
  
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [puntaje, setPuntaje] = useState(0)

    const {setIdTurnoYCalificacionInParamCalificarTurno} = usePostCalificarTurno(refreshTurnos)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCalificarTurno = () => {
        setIdTurnoYCalificacionInParamCalificarTurno(turno.id,puntaje)
        handleClose()
    }

    const handleCalificacionButton = (event) => {
        setPuntaje(event.target.value)
    }

    const logoPredeterminado = (logoSrc) => {
        if (logoSrc.length > 0) {
          return logoSrc;
        }
        return "https://2.bp.blogspot.com/-JmAJ1XEBGfE/UTPme5-0HpI/AAAAAAAAARE/bT_fEs-9vQ4/s1600/No-Logo-Available.png";
    };

    return(
        <>
            <Button onClick={() => handleClickOpen(turno.id)}>
                Calificar <StarIcon style={{marginTop: "-5px"}} />
            </Button>
            <Dialog
                fullWidth={false}
                maxWidth="xs"
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">
                    Calificar el Servicio
                </DialogTitle>
                <DialogContent>
                    <Grid container justify="center">
                        <img
                            className={classes.logoImg}
                            src={logoPredeterminado(turno.peluqueroLogo)}
                            alt="logoPeluquero"
                        />
                    </Grid>
                    <Grid container justify="center">
                    {turno.peluqueroName}
                    </Grid>
                    <DialogContentText>
                        Por favor, califica el servicio del peluquero para darle un feedback. 
                    </DialogContentText>
                    <Grid container justify="center">
                        <Rating name="size-large" size="large" defaultValue={0} precision={1} onChange={handleCalificacionButton}/>
                    </Grid>
                        
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Cerrar 
                    </Button>
                    <Button onClick={handleCalificarTurno} color="primary">
                        Enviar <SendIcon />
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

ModalCalificarTurno.propTypes = {
    turno: PropTypes.object,
    refreshTurnos: PropTypes.func,
};

export default ModalCalificarTurno;