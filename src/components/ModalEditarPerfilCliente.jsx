import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import clienteSchema from "../utils/validations/clienteSchema";
import { useNotificacion } from "../contexts/NotificacionProvider";
import { usePostEditarDatosCliente } from "../service/ServicioDeCliente";
import Campo from "../components/form/Campo";
import BotonSubmit from "../components/form/BotonSubmit";
import RegistroForm from "../components/form/RegistroForm";
import {
  IconButton, Button, Dialog, 
  DialogActions, DialogContent, 
  Tooltip, Grid,
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

const ModalEditarPerfilCliente = ({ cliente, refreshDatosCliente }) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
            setOpen(true);
    }

    const { register, handleSubmit, watch, errors } = useForm({
        reValidateMode: "onChange",
        validationSchema: clienteSchema,
        defaultValues: { 
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            emailOpcional: cliente.emailOpcional,
            imgPerfil: cliente.imgPerfil,
            nroTelefono: cliente.nroTelefono,
        },
      });

    const postSuccess = ({ message: mensaje }) => {
        setNotificacion({ mensaje, severidad: "success" });
        refreshDatosCliente();
        window.location.reload();
    }
    
    const { setNotificacion } = useNotificacion();
    const { setCliente } = usePostEditarDatosCliente(postSuccess);

    const formProps = { errors, inputRef: register };

    const onSubmitEdit = (data) => {
        setCliente(data);
        setOpen(false);
    }
    
    const createBody = () => {
        return (
        <DialogContent>
            <RegistroForm
                marginTopInt={0}
                onSubmit={handleSubmit(onSubmitEdit)}
                nombre="Editar datos"
                avatarSrc={watch("imgPerfil")}
                >
                <Grid container item xs={12} sm={6} spacing={2}>
                    <Campo
                        name="imgPerfil"
                        label="Enlace imagen de perfil"
                        autoComplete="photo"
                        {...formProps}
                    />
                    <Campo
                        sm={6}
                        name="nombre"
                        label="Nombre"
                        autoComplete="given-name"
                        autoFocus
                        {...formProps}
                    />
                    <Campo
                        sm={6}
                        name="apellido"
                        label="Apellido"
                        autoComplete="family-name"
                        {...formProps}
                    />
                </Grid>
                <Grid container item xs={12} sm={6} spacing={2}>
                    <Campo
                        name="emailOpcional"
                        label="Correo Electrónico"
                        autoComplete="email"
                        {...formProps}
                    />
                    <Campo
                        name="nroTelefono"
                        label="Numero de Teléfono"
                        autoComplete="tel"
                        {...formProps}
                    />
                    <BotonSubmit nombre="Editar" />
                </Grid>
            </RegistroForm>
        </DialogContent>
        );
    };

    const createActionButtons = () => {
        return(
            <DialogActions>
                <Button onClick={handleClose} color="default">
                    Cancelar
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
                {createBody()}
                {createActionButtons()}
            </Dialog>
        </>
    );
};

ModalEditarPerfilCliente.propTypes = {
  cliente: PropTypes.object,
  refreshDatosCliente: PropTypes.func,
};

export default ModalEditarPerfilCliente;