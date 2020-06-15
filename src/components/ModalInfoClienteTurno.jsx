import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Button,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Grid,
} from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import RoomIcon from "@material-ui/icons/Room";

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
  title: {
    textDecoration: "underline",
  },
  button: {
    color: "black",
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
      <div className={classes.paper}>
        <Typography
          className={classes.title}
          variant="h5"
          align="center"
          gutterBottom
        >
          Información del cliente
        </Typography>
        <Typography
          variant="h6"
          align="left"
          gutterBottom
        >{`Nombre completo: ${fullname}`}</Typography>
        <Typography
          variant="h6"
          align="left"
          gutterBottom
        >{`E-mail: ${email}`}</Typography>
        <Grid container direction="column" justify="center" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickUbicacion}
          >
            Ubicación <RoomIcon />
          </Button>
        </Grid>
      </div>
    );
  };

  return (
    <div>
      <IconButton className={classes.button} onClick={handleOpen}>
        <AssignmentIndIcon style={{ fontSize: 30 }} />
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

ModalInfoClienteTurno.propTypes = {
  fullname: PropTypes.string,
  email: PropTypes.string,
  ubicacion: PropTypes.object,
};

export default ModalInfoClienteTurno;
