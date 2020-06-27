import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Button,
  Dialog,
  Grid,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import RoomIcon from "@material-ui/icons/Room";

const useStyles = makeStyles(() => ({
  title: {
    textDecoration: "underline",
  },
  button: {
    color: "black",
  },
  ubicacionButton: {
    marginTop: 7,
  },
}));

const ModalInfoClienteTurno = ({ fullname, email, ubicacion }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClickUbicacion = () => {
    window.open(
      `https://maps.google.com/?q=${ubicacion.latitude},${ubicacion.longitude}`
    );
  };

  const createBody = () => {
    return (
      <>
        <DialogContentText>{`Nombre completo: ${fullname}`}</DialogContentText>
        <DialogContentText>{`E-mail: ${email}`}</DialogContentText>
        <Grid container direction="column" justify="center" alignItems="center">
          <Button
            className={classes.ubicacionButton}
            variant="contained"
            color="primary"
            onClick={handleClickUbicacion}
          >
            Ubicación <RoomIcon />
          </Button>
        </Grid>
      </>
    );
  };

  return (
    <>
      <IconButton className={classes.button} onClick={handleOpen}>
        <AssignmentIndIcon style={{ fontSize: 30 }} />
      </IconButton>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Información del cliente
        </DialogTitle>
        <DialogContent dividers>{createBody()}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ModalInfoClienteTurno.propTypes = {
  fullname: PropTypes.string,
  email: PropTypes.string,
  ubicacion: PropTypes.object,
};

export default ModalInfoClienteTurno;
