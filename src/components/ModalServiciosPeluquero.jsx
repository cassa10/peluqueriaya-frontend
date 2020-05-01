import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Modal, Backdrop, Fade, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const ModalServiciosPeluquero = ({peluquero}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
      setOpen(true)
  }

  const createBody = (peluquero) => {
    return(
      <div className={classes.paper}>
          <Typography variant="h4" align="center" gutterBottom >{peluquero.nombre}</Typography>
          <h2 id="transition-modal-title">Servicios</h2>
          {mostrarServicios(peluquero.servicios)}
      </div>
    );
}

  const mostrarServicios = (servicios) => {
    if(servicios.length > 0){
        return(
        <div>
            {
            servicios.map( s => visualizarServicio(s))
            }
        </div>
        );
    }
    return(
        mostrarSinServicios()
    )
  }

  const mostrarSinServicios = () => {
      return(
        <div>
            Solo cuenta con el servicio de corte minimo.
        </div>
      );
  }
  

  const visualizarServicio = (servicio) => {
    return(
        <div key={servicio.id}>
          <p>
            - {servicio.nombre} (${servicio.precio})
          </p>
        </div>
    )
  }

  return (
    <div>
        <Button size="small" onClick={handleOpen}>Servicios</Button>
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
          <Fade in={open}>
            {createBody(peluquero)}
          </Fade>
        </Modal>
    </div>  
  );
}

export default ModalServiciosPeluquero;