import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton, Button, Typography,
  Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Divider
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import formatPrice from "../utils/formatters/formatPrice";
import { sumBy } from "lodash";

const useStyles = makeStyles((theme) => ({
  divider: {
    backgroundColor: 'black',
    color: 'black',
  },
  precioTotalText: {
    marginTop: "7px",
    color: 'black'
  },
  button: {
    color: "black",
  },
}));

const ModalServiciosInfoTurno = ({ turno }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const createBody = () => {
    return (
      <div>
        {mostrarCorteMinYServicios(
          turno.estaFinalizado,
          turno.corteMinInfo,
          turno.serviciosSolicitadosInfo
        )}
      </div>
    );
  };

  const mostrarTotalContratado = (estaFinalizado, corteMin, servicios) => {
    return (
      <div>
        {mostrarMensajeTotal(estaFinalizado, corteMin, servicios)}
      </div>
    );
  };

  const mostrarMensajeTotal = (estaFinalizado, corteMin, servicios) => {
    return( estaFinalizado ? 
      <Typography className={classes.precioTotalText} gutterBottom>
        El precio total fue de {formatPrice(calcularPrecioTotal(corteMin, servicios))}
      </Typography>
     : 
      <Typography className={classes.precioTotalText} gutterBottom>
        El precio total que se espera es de {formatPrice(calcularPrecioTotal(corteMin, servicios))}
      </Typography>
    );
  };

  const calcularPrecioTotal = (corteMin, servicios) => corteMin + sumBy(servicios, (s) => s.precio)

  const mostrarCorteMinYServicios = (estaFinalizado, corteMin, servicios) => {
    if (servicios.length > 0) {
      return (
        <>
          <DialogContentText>
            - El precio base contratado fue {formatPrice(corteMin)}
          </DialogContentText>
          {servicios.map((s) => visualizarServicio(s))}
        </>
      );
    }
    return mostrarSinServicios(estaFinalizado, corteMin);
  };

  const mostrarSinServicios = (estaFinalizado, corteMin) => {
    return (
      estaFinalizado ?
      <DialogContentText>
        Solo contrató el servicio básico con el precio {formatPrice(corteMin)}
      </DialogContentText>
      :
      <DialogContentText>
        Solo cuenta con el servicio básico con el precio {formatPrice(corteMin)}
      </DialogContentText>
    );
  };

  const visualizarServicio = (servicio) => {
    return (
      <DialogContentText key={servicio.id}>
        - {`"${servicio.nombre}"`} con el precio {formatPrice(servicio.precio)}
      </DialogContentText>
    );
  };

  return (
    <>
      <IconButton className={classes.button} onClick={handleOpen}>
        <ShoppingCartIcon style={{ fontSize: 30 }} />
      </IconButton>
      <Dialog
          fullWidth={true}
          maxWidth="sm"
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
      >
          <DialogTitle id="max-width-dialog-title">
              Servicios Contratados
          </DialogTitle>
          <DialogContent dividers>
              
                {createBody()}
                <Divider className={classes.divider}/>
                {mostrarTotalContratado(
                  turno.estaFinalizado,
                  turno.corteMinInfo,
                  turno.serviciosSolicitadosInfo)
                }
               
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

ModalServiciosInfoTurno.propTypes = {
  turno: PropTypes.object,
};

export default ModalServiciosInfoTurno;