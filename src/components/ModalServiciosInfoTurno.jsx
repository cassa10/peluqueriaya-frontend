import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Divider,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import formatPrice from "../utils/formatters/formatPrice";
import { sumBy } from "lodash";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  precioTotalText: {
    marginTop: "7px",
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
      <div className={classes.paper}>
        <Typography variant="h4" align="center" gutterBottom>
          Servicios Pedidos
        </Typography>
        {mostrarCorteMinYServicios(
          turno.corteMinInfo,
          turno.serviciosSolicitadosInfo
        )}
        {mostrarTotalContratado(
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
        <Divider />
        {mostrarMensajeTotal(estaFinalizado, corteMin, servicios)}
      </div>
    );
  };

  const mostrarMensajeTotal = (estaFinalizado, corteMin, servicios) => {
    return estaFinalizado ? (
      <Typography className={classes.precioTotalText} gutterBottom>
        La ganancia total fue de{" "}
        {formatPrice(calcularPrecioTotal(corteMin, servicios))}{" "}
      </Typography>
    ) : (
      <Typography className={classes.precioTotalText} gutterBottom>
        La ganancia total que se espera es de{" "}
        {formatPrice(calcularPrecioTotal(corteMin, servicios))}{" "}
      </Typography>
    );
  };

  const calcularPrecioTotal = (corteMin, servicios) => {
    return (
      corteMin +
      sumBy(servicios, (s) => {
        return s.precio;
      })
    );
  };

  const mostrarCorteMinYServicios = (corteMin, servicios) => {
    if (servicios.length > 0) {
      return (
        <div>
          <Typography gutterBottom>
            - El precio base contratado fue {formatPrice(corteMin)}
          </Typography>
          {servicios.map((s) => visualizarServicio(s))}
        </div>
      );
    }
    return mostrarSinServicios(corteMin);
  };

  const mostrarSinServicios = (corteMin) => {
    return (
      <Typography gutterBottom>
        Solo cuenta con el servicio básico con el precio {formatPrice(corteMin)}
      </Typography>
    );
  };

  const visualizarServicio = (servicio) => {
    return (
      <Typography key={servicio.id} gutterBottom>
        - {`"${servicio.nombre}"`} con el precio {formatPrice(servicio.precio)}
      </Typography>
    );
  };

  return (
    <div>
      <IconButton className={classes.button} onClick={handleOpen}>
        <ShoppingCartIcon style={{ fontSize: 30 }} />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>{createBody()}</Fade>
      </Modal>
    </div>
  );
};

ModalServiciosInfoTurno.propTypes = {
  turno: PropTypes.object,
};

export default ModalServiciosInfoTurno;
