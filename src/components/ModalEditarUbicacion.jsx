import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useNotificacion } from "../contexts/NotificacionProvider";
import { usePutEditarPeluquero } from "../service/ServicioDePeluquero";
import { useGetDireccionConCoords } from "../service/ServicioDeMapas";
import AutocompletadoDeUbicacion from "../components/AutocompletadoDeUbicacion";
import {
  CircularProgress,
  DialogContent,
  IconButton,
  Button,
  Dialog,
  Tooltip,
  Grid,
  DialogActions,
} from "@material-ui/core";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import MapIcon from "@material-ui/icons/Map";
import Swal from "sweetalert2";

const useStyles = makeStyles(() => ({
  button: {
    color: "white",
    marginTop: "-4px",
    "&:hover, &.Mui-focusVisible": {
      color: "blue",
    },
  },
  buttonUbicacionActual: {
    color: "#0eacd4",
    "&:hover, &.Mui-focusVisible": {
      color: "blue",
    },
  },
  circularProgress: {
    marginLeft: 3,
    marginTop: 3,
  },
  actualUbicacion: {
    marginBottom: "10px",
    color: "black",
    fontSize: "1rem",
    fontFamily: "Arial",
  },
}));

const ModalEditarUbicacion = ({ ubicacionActual, estaDesconectado }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ubicacion, setUbicacion] = useState(null);
  const [valido, setValido] = useState(false);
  const [direccionActual, setDireccionActual] = useState("");

  const { cargandoUDC } = useGetDireccionConCoords(
    ubicacionActual,
    setDireccionActual
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    if (estaDesconectado) {
      setOpen(true);
    } else {
      mostrarDialogError();
    }
  };

  const postSuccess = ({ message: mensaje }) => {
    setNotificacion({ mensaje, severidad: "success" });
    window.location.reload();
  };

  const { setNotificacion } = useNotificacion();
  const { setPeluquero } = usePutEditarPeluquero(postSuccess);

  const mostrarDialogError = () => {
    Swal.fire({
      icon: "error",
      title: "Debe estar desconectado!",
    });
  };

  const handleSubmit = () => {
    console.log(JSON.stringify({ ubicacion }));
    setPeluquero({ ubicacion });
    setOpen(false);
  };

  const handleOpenUbicacionActual = () => {
    window.open(
      `https://maps.google.com/?q=${ubicacionActual.latitude},${ubicacionActual.longitude}`
    );
  };

  const createBody = () => {
    return (
      <DialogContent>
        {cargandoUDC ? (
          <div className={classes.actualUbicacion}>
            Ubicacion Actual -{" "}
            <CircularProgress
              size={20}
              className={classes.circularProgress}
              color="secondary"
            />
          </div>
        ) : (
          <div className={classes.actualUbicacion}>
            Ubicación Actual - {direccionActual}
            <Tooltip title="Abrir en GoogleMaps" placement="top">
              <IconButton
                className={classes.buttonUbicacionActual}
                onClick={handleOpenUbicacionActual}
              >
                <MapIcon style={{ fontSize: 30 }} />
              </IconButton>
            </Tooltip>
          </div>
        )}
        <Grid container>
          <Grid item xs={12}>
            <AutocompletadoDeUbicacion
              {...{ ubicacion, setUbicacion, valido, setValido }}
            />
          </Grid>
        </Grid>
      </DialogContent>
    );
  };

  const createActionButtons = () => {
    return (
      <DialogActions>
        <Button onClick={handleClose} color="default">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={!valido}>
          Cambiar Ubicación
        </Button>
      </DialogActions>
    );
  };

  return (
    <>
      <Tooltip title="Cambiar ubicación">
        <IconButton className={classes.button} onClick={handleOpen}>
          <EditLocationIcon style={{ fontSize: 30 }} />
        </IconButton>
      </Tooltip>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        {createBody()}
        {createActionButtons()}
      </Dialog>
    </>
  );
};

ModalEditarUbicacion.propTypes = {
  ubicacionActual: PropTypes.object.isRequired,
  estaDesconectado: PropTypes.bool.isRequired,
};

export default ModalEditarUbicacion;
