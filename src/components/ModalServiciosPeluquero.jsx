import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { 
  Button, DialogActions, 
  DialogContent, DialogContentText, 
  DialogTitle, Dialog 

} from "@material-ui/core";
import formatPrice from "../utils/formatters/formatPrice";

const useStyles = makeStyles((theme) => ({
  text: {
    color: "black",
  },
}));

const ModalServiciosPeluquero = ({ peluquero }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const createBody = (peluquero) => mostrarServicios(peluquero.corteMin, peluquero.servicios);

  const mostrarServicios = (corteMin, servicios) => {
    if (servicios.length > 0) {
      return servicios.map((s) => visualizarServicio(s));
    }
    return mostrarSinServicios(corteMin);
  };

  const mostrarSinServicios = (corteMin) => 
    <DialogContentText className={classes.text}> 
      Solo cuenta con el servicio de corte minimo ({formatPrice(corteMin)})
    </DialogContentText>;

  const visualizarServicio = (servicio) => {
    return (
      <DialogContentText key={servicio.id} className={classes.text}>
        - {servicio.nombre} ({formatPrice(servicio.precio)})
      </DialogContentText>
    );
  };

  return (
    <>
      <Button size="small" onClick={handleOpen}>
        Servicios
      </Button>
      <Dialog
        fullWidth={false}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          {`Servicios de "${peluquero.nombre}"`}
        </DialogTitle>
        <DialogContent dividers>
          {createBody(peluquero)}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="default">
                Cerrar
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ModalServiciosPeluquero.propTypes = {
  peluquero: PropTypes.object,
};

export default ModalServiciosPeluquero;
