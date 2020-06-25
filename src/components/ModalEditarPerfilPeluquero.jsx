import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import peluqueroSchema from "../utils/validations/peluqueroSchema";
import { useNotificacion } from "../contexts/NotificacionProvider";
import { usePutEditarPeluquero } from "../service/ServicioDePeluquero";
import Campo from "../components/form/Campo";
import BotonSubmit from "../components/form/BotonSubmit";
import RegistroForm from "../components/form/RegistroForm";
import CampoTiposDePeluquero from "../components/form/CampoTiposDePeluquero";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";

const useStyles = makeStyles(() => ({
  button: {
    color: "white",
    marginTop: "-4px",
    "&:hover, &.Mui-focusVisible": {
      color: "blue",
    },
  },
}));

const ModalEditarPerfilPeluquero = ({ peluquero, refreshDatosPeluquero }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    if (peluquero.estaDesconectado) setOpen(true);
    else mostrarDialogError();
  };

  const {
    register,
    handleSubmit,
    watch,
    errors,
    unregister,
    setValue,
  } = useForm({
    reValidateMode: "onChange",
    validationSchema: peluqueroSchema,
    defaultValues: {
      nombre: peluquero.nombre,
      emailOpcional: peluquero.emailOpcional,
      logo: peluquero.logo,
      corteMin: peluquero.corteMin,
      distanciaMax: peluquero.distanciaMax,
      descripcion: peluquero.descripcion,
      tipos: peluquero.tipos,
      ubicacion: peluquero.ubicacion,
    },
  });

  const postSuccess = ({ message: mensaje }) => {
    setNotificacion({ mensaje, severidad: "success" });
    refreshDatosPeluquero();
    window.location.reload();
  };

  const { setNotificacion } = useNotificacion();
  const { setPeluquero } = usePutEditarPeluquero(postSuccess);

  const formProps = { errors, inputRef: register };

  const mostrarDialogError = () => {
    Swal.fire({
      icon: "error",
      title: "Debe estar desconectado!",
    });
  };

  const onSubmitEdit = (data) => {
    setPeluquero(data);
    setOpen(false);
  };

  const getTiposObject = (tipos) => {
    return {
      hombre: tipos.includes("HOMBRE"),
      mujer: tipos.includes("MUJER"),
      kids: tipos.includes("KIDS"),
    };
  };

  const createBody = () => {
    return (
      <DialogContent>
        <RegistroForm
          marginTopInt={0}
          onSubmit={handleSubmit(onSubmitEdit)}
          nombre="Editar datos"
          avatarSrc={watch("logo")}
        >
          <Grid container item xs={12} sm={6} spacing={2}>
            <Campo
              name="nombre"
              label="Nombre"
              autoComplete="organization"
              autoFocus
              {...formProps}
            />
            <Campo
              name="emailOpcional"
              label="Correo Electrónico"
              autoComplete="email"
              {...formProps}
            />
            <Campo
              name="descripcion"
              label="Descripción"
              multiline
              rows={3}
              {...formProps}
            />
          </Grid>
          <Grid container item xs={12} sm={6} spacing={2}>
            <Campo
              name="logo"
              label="Enlace de logo"
              autoComplete="photo"
              {...formProps}
            />
            <Campo
              sm={6}
              type="number"
              name="corteMin"
              label="Precio fijo por trabajo"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              {...formProps}
            />
            <Campo
              sm={6}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Km</InputAdornment>
                ),
              }}
              name="distanciaMax"
              label="Distancia max"
              InputLabelProps={{ shrink: true }}
              {...formProps}
            />
            <CampoTiposDePeluquero
              {...{
                register,
                unregister,
                setValue,
                errors,
                name: "tipos",
                defaultValues: getTiposObject(peluquero.tipos),
              }}
            />
            <BotonSubmit nombre="Editar" />
          </Grid>
        </RegistroForm>
      </DialogContent>
    );
  };

  const createActionButtons = () => {
    return (
      <DialogActions>
        <Button onClick={handleClose} color="default">
          Cancelar
        </Button>
      </DialogActions>
    );
  };

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
        {createBody()}
        {createActionButtons()}
      </Dialog>
    </>
  );
};

ModalEditarPerfilPeluquero.propTypes = {
  peluquero: PropTypes.object,
  refreshDatosPeluquero: PropTypes.func,
};

export default ModalEditarPerfilPeluquero;
