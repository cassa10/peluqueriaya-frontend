import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton, Button, Typography, 
  Dialog, DialogContent, Tooltip,
  DialogTitle, DialogActions
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
    marginLeft: "7px",
    color: 'black'
  },
  serviciosText: {
    color: 'black',
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
      <div className={classes.finalPrice}>
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
          <Typography className={classes.serviciosText} gutterBottom>
            - El precio base contratado fue {formatPrice(corteMin)}
          </Typography>
          {servicios.map((s) => visualizarServicio(s))}
        </>
      );
    }
    return mostrarSinServicios(estaFinalizado, corteMin);
  };

  const mostrarSinServicios = (estaFinalizado, corteMin) => {
    return (
      estaFinalizado ?
      <Typography className={classes.serviciosText} gutterBottom>
        Solo contrató el servicio básico con el precio {formatPrice(corteMin)}
      </Typography>
      :
      <Typography className={classes.serviciosText} gutterBottom>
        Solo cuenta con el servicio básico con el precio {formatPrice(corteMin)}
      </Typography>
    );
  };

  const visualizarServicio = (servicio) => {
    return (
      <Typography className={classes.serviciosText} gutterBottom key={servicio.id}>
        - {`"${servicio.nombre}"`} con el precio {formatPrice(servicio.precio)}
      </Typography>
    );
  };

  return (
    <>
    <Tooltip title="Servicios Contratados" placement="top">
      <IconButton className={classes.button} onClick={handleOpen}>
        <ShoppingCartIcon style={{ fontSize: 30, color: "#0eacd4" }} />
      </IconButton>
    </Tooltip>
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
          </DialogContent>
          <DialogActions>
              {mostrarTotalContratado(
                turno.estaFinalizado,
                turno.corteMinInfo,
                turno.serviciosSolicitadosInfo)
              }
              <div style={{flex: '1 0 0'}} />
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