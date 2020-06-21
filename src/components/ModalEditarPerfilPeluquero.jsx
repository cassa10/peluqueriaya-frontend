import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton, Button, Dialog, Grid,
  DialogActions, DialogContent, Tooltip,
  DialogContentText, DialogTitle,
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
    marginTop: '-4px',
    "&:hover, &.Mui-focusVisible": {
        color: "blue",
    },
  },
}));

const ModalEditarPerfilPeluquero = ({ peluquero }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState(peluquero.nombre)
  const [logo, setLogo] = useState(peluquero.logo)
  const [distanciaMax, setDistanciaMax] = useState(peluquero.distanciaMax)
  const [corteMin, setCorteMin] = useState(peluquero.corteMin)
  const [emailOpcional, setEmailOpcional] = useState(peluquero.emailOpcional)
  const [descripcion, setDescripcion] = useState(peluquero.descripcion)
  const [ubicacion, setUbicacion] = useState(peluquero.ubicacion)


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const createBody = () => {
    console.log(peluquero)
    return (
      <DialogContent>
        <DialogContentText>
          {`Nombre completo: ${peluquero.nombre}`}
        </DialogContentText>

      </DialogContent>
    );
  };

  const createActionButtons = () => {
      return(
        <DialogActions>
            <Button onClick={handleClose} color="default">
                Cerrar 
            </Button>
            <Button onClick={handleClose} color="primary">
                Confirmar 
            </Button>
        </DialogActions>
      );
  }

  return (
    <>
        <Tooltip title="Editar datos">
            <IconButton className={classes.button} onClick={handleOpen}>
                <EditIcon />
            </IconButton>
        </Tooltip>
        <Dialog
            fullWidth={true}
            maxWidth="md"
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">  
                Editar datos
            </DialogTitle>
            {createBody()}
            {createActionButtons()}
        </Dialog>
    </>
  );
};

ModalEditarPerfilPeluquero.propTypes = {
  peluquero: PropTypes.object,
};

export default ModalEditarPerfilPeluquero;

