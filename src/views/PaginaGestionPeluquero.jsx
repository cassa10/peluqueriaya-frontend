import React, { useState } from "react";
import {
  useGetPeluqueroLogeado,
  usePostPeluqueroConectar,
  usePostPeluqueroDesconectar,
} from "../service/ServicioDePeluquero";
import {
  useGetTurnosPeluquero,
  usePostConfirmarTurno,
  usePostFinalizarTurno,
} from "../service/ServicioDeTurno";
import CirculitoCargando from "../components/CirculoCargando";
import {
  Button,
  Table,
  TableBody,
  IconButton,
  Switch,
  TableCell,
  TableContainer,
  TableHead,
  Tooltip,
  TableRow,
  Paper,
  LinearProgress,
  ButtonGroup,
  Grid,
  Typography,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import ModalInfoClienteTurno from "../components/ModalInfoClienteTurno";
import ModalServiciosInfoTurno from "../components/ModalServiciosInfoTurno";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconSvg from "../components/icons/IconSvg";
import formatDate from "../utils/formatters/formatDate";
import formatTime from "../utils/formatters/formatTime";
import Swal from "sweetalert2";
import RoomIcon from "@material-ui/icons/Room";
import StarIcon from "@material-ui/icons/Star";
import StyledRating from "../components/StyledRating";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#0eacd4",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  panelPeluquero: {
    marginTop: "45px",
    marginBottom: "20px",
    backgroundColor: "#0eacd4",
    borderLeft: "10px solid #017787",
    borderRight: "10px solid #017787",
  },
  peluqueroNombre: {
    color: "#ffffff",
  },
  gridLogoItem: {
    marginTop: "10px",
    marginBottom: "5px",
  },
  logoImg: {
    minWidth: 150,
    maxWidth: 150,
    minHeight: 150,
    maxHeight: 150,
    border: "solid",
    borderColor: "#017787",
  },
  tableContainer: {
    marginBottom: "30px",
  },
  table: {
    minWidth: 700,
  },
  paginationBar: {
    justifyContent: "center",
  },
  cancelado: {
    backgroundColor: "#cd5c5c",
  },
  pendiente: {
    backgroundColor: "#eb984e",
  },
  esperando: {
    backgroundColor: "#ecf0f1",
  },
  confirmado: {
    backgroundColor: "#2ecc71",
  },
  finalizado: {
    backgroundColor: "#b2babb",
  },
});

const PaginaGestionPeluquero = () => {

  const classes = useStyles();

  const [peluquero, setPeluquero] = useState({ id: 0, nombre: '' });

  const { cargando, refrescarPeluquero } = useGetPeluqueroLogeado(setPeluquero)

  const [{ turnos, actual, tamanio, total }, setPaginacion] = useState({
      turnos: [],
      actual: 1,
      tamanio: 3,
      total: 1,
  });

  const [isTurnosSelected, setIsTurnosSelected] = useState(true);

  const refreshTurnos = () => { 
      setFiltro()
  }

  const refreshTurnosYPeluquero = () => {
      refrescarPeluquero()
      refreshTurnos()
  }

  const {setIdTurnoInParamConfirmarTurno} = usePostConfirmarTurno(refreshTurnosYPeluquero)

  const {setIdTurnoInParamFinalizarTurno} = usePostFinalizarTurno(refreshTurnosYPeluquero)

  const { cargandoTurnos, setFiltro } = useGetTurnosPeluquero(
    tamanio,
    setPaginacion
  );

  const [cargandoChangePage, setCargandoChangePage] = useState(false);

  const [isOrdRecientes, setIsOrdRecientes] = useState(false);

  const { desconectarPeluquero } = usePostPeluqueroDesconectar(() => {});

  const { conectarPeluquero } = usePostPeluqueroConectar(() => {});

  const createPanelPeluquero = () => {
    return (
      <Grid container className={classes.panelPeluquero}>
        <Grid item xs={6}>
          {mostrarDatosPeluquero(peluquero)}
        </Grid>
      </Grid>
    );
  };

  const logoPredeterminado = (logoSrc) => {
    if (logoSrc.length > 0) {
      return logoSrc;
    }
    return "https://2.bp.blogspot.com/-JmAJ1XEBGfE/UTPme5-0HpI/AAAAAAAAARE/bT_fEs-9vQ4/s1600/No-Logo-Available.png";
  };

  const handleCerrarPeluqueria = (accept) => {
    if (accept) {
      desconectarPeluquero();
      window.location.reload();
    }
  };

  const handleAbrirPeluqueria = (accept) => {
    if (accept) {
      conectarPeluquero();
      window.location.reload();
    }
  };

  const dialogCerrarPeluqueria = (event) => {
    !event.target.checked
      ? Swal.fire({
          title: "¿Estás seguro?",
          html:
            "Si cerras la peluqueria, dejarás de aparecer en las búsquedas. Además, todos los turnos pendientes y en espera se cancelarán!",
          showCancelButton: true,
          cancelButtonColor: "Red",
          confirmButtonColor: "Green",
          cancelButtonText: "Cancelar",
          confirmButtonText: "De acuerdo",
          reverseButtons: true,
        }).then((result) => handleCerrarPeluqueria(result.value))
      : Swal.fire({
          title: "¿Estás a un paso de abrir la peluqueria?",
          html:
            "Al aceptar, aparecerás en la búsquedas y podrás recibir turnos",
          showCancelButton: true,
          cancelButtonColor: "Red",
          confirmButtonColor: "Green",
          cancelButtonText: "Cancelar",
          confirmButtonText: "De acuerdo",
          reverseButtons: true,
        }).then((result) => handleAbrirPeluqueria(result.value));
  };

  const mostrarDatosPeluquero = (peluquero) => {
    return (
      <Grid
        container
        item
        className={classes.gridInfoPeluquero}
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={1} />
        <Grid item className={classes.gridLogoItem}>
          <img
            className={classes.logoImg}
            src={logoPredeterminado(peluquero.logo)}
            alt="logo"
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item>
          {peluquero.puntuacionPromedio > 0 && (
            <StyledRating defaultValue={peluquero.puntuacionPromedio} />
          )}
          <Typography
            className={classes.peluqueroNombre}
            textalign="center"
            variant="h5"
            component="h2"
          >
            {peluquero.nombre}
          </Typography>
          <div>
            <Typography className={classes.peluqueroNombre}>
              <Tooltip
                title={
                  peluquero.estaDesconectado
                    ? "Estar disponible"
                    : "Cerrar Peluqueria"
                }
              >
                <Switch
                  checked={!peluquero.estaDesconectado}
                  onChange={dialogCerrarPeluqueria}
                  disabled={
                    !(peluquero.estaDisponible || peluquero.estaDesconectado)
                  }
                />
              </Tooltip>
              {peluquero.estaDesconectado ? "Desconectado" : "Disponible"}
            </Typography>
          </div>
        </Grid>
      </Grid>
    );
  };

  const handleChangePage = (event, value) => {
    if (actual !== value) {
      setCargandoChangePage(true);
      setFiltro({ page: value - 1 });
    }
  };

  const estadoTurnoBackgroundIndex = (estado) => {
    switch (estado) {
      case "ESPERANDO":
        return classes.esperando;
      case "CANCELADO":
        return classes.cancelado;
      case "PENDIENTE":
        return classes.pendiente;
      case "CONFIRMADO":
        return classes.confirmado;
      case "FINALIZADO":
        return classes.finalizado;
      default:
        return classes.esperando;
    }
  };

  const displayPuntaje = (puntaje) => {
    return `${puntaje}/5`;
  };

  const showPuntuacionData = (puntaje) => {
    return puntaje > 0 ? (
      <>
        <div>
          <StarIcon />
        </div>
        {displayPuntaje(puntaje)}
      </>
    ) : (
      "Sin puntuar aún"
    );
  };

  const handleShowDataInRow = (isShow, data) => {
    return isShow && <StyledTableCell align="center">{data}</StyledTableCell>;
  };

  const showDialogAction = (mensaje, idTurno, fAction) => {
    Swal.fire({
      title: "¿Estás seguro?",
      html: mensaje,
      showCancelButton: true,
      cancelButtonColor: "Red",
      confirmButtonColor: "Green",
      cancelButtonText: "Cancelar",
      confirmButtonText: "De acuerdo",
      reverseButtons: true,
    }).then((result) => handleFAction(result.value, idTurno, fAction));
  };

  const handleFAction = (isAcepted, idTurno, fAction) => {
    if (isAcepted) {
      fAction(idTurno);
    }
  };

  const handleActionConfirmar = (idTurno) => {
    const dialogMessage =
      "Esto quiere decir que el cliente va a ser atendido." +
      "<br /> Además, una vez que confirmes el turno, no podrás desconectarte hasta que este finalice.";
    showDialogAction(dialogMessage, idTurno, setIdTurnoInParamConfirmarTurno);
  };

  const handleActionFinalizar = (idTurno) => {
    const dialogMessage = "¡Esto quiere decir que el usuario ya fue atendido!";
    showDialogAction(dialogMessage, idTurno, setIdTurnoInParamFinalizarTurno);
  };

  const showAppropiateActionButton = (turno) => {
    return turno.estaPendiente ? (
      <Button onClick={() => handleActionConfirmar(turno.id)}>
        Confirmar <CheckCircleIcon />
      </Button>
    ) : (
      <Button onClick={() => handleActionFinalizar(turno.id)}>
        Finalizar
        <IconSvg
          idSvg="handshake"
          width="42px"
          height="36px"
          style={{ marginTop: "6px" }}
        />
      </Button>
    );
  };

  const mostrarRowsInfoCliente = (turno) => {
    return (
      <>
        <StyledTableCell align="center">
          {turno.clienteFullName}
        </StyledTableCell>
        <StyledTableCell align="center">{turno.clienteEmail}</StyledTableCell>
        <StyledTableCell align="center">
          {formatDireccion(turno.direccionDelTurno)}
        </StyledTableCell>
        <StyledTableCell align="center">
          {displayUbicacion(turno.ubicacionDelTurno)}
        </StyledTableCell>
      </>
    );
  };

  const formatDireccion = (direccion) => {
    const dir = direccion.split(",");
    return `${dir[0]}, ${dir[1]}`;
  };

  const displayUbicacion = (ubicacion) => {
    return (
      <IconButton
        onClick={() => {
          handleClickUbicacion(ubicacion);
        }}
        style={{ color: "black" }}
      >
        <RoomIcon style={{ fontSize: 30 }} />
      </IconButton>
    );
  };

  const handleClickUbicacion = (ubicacion) => {
    window.open(
      `https://maps.google.com/?q=${ubicacion.latitude},${ubicacion.longitude}`
    );
  };

  const mostrarRowModalInfoCliente = (turno) => {
    return (
      <StyledTableCell align="center">
        <ModalInfoClienteTurno
          fullname={turno.clienteFullName}
          email={turno.clienteEmail}
          ubicacion={turno.ubicacionDelTurno}
        />
      </StyledTableCell>
    );
  };

  const handleShowClientInfo = (sonTurnosActuales, turno) => {
    return sonTurnosActuales
      ? mostrarRowsInfoCliente(turno)
      : mostrarRowModalInfoCliente(turno);
  };

  const handleShowTurnos = () =>!cargandoTurnos && showTurnos();


  const showTurnos = () => {
      return(
          <TableBody>
          {turnos.map((turno) => (
              <TableRow key={turno.id} className={estadoTurnoBackgroundIndex(turno.estado)}>
                  {handleShowClientInfo(isTurnosSelected, turno)}
                  <StyledTableCell align="center">
                      <ModalServiciosInfoTurno turno={turno} />
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="turno">
                      {turno.estado}
                  </StyledTableCell>
                  <StyledTableCell align="center">{`${formatDate(turno.fechaInicio)} ${formatTime(turno.fechaInicio)}`}</StyledTableCell>
                  {handleShowDataInRow(!isTurnosSelected,`${formatDate(turno.fechaFin)} ${formatTime(turno.fechaFin)}`)}
                  {handleShowDataInRow(isTurnosSelected,showAppropiateActionButton(turno))}
                  {handleShowDataInRow(!isTurnosSelected, showPuntuacionData(turno.puntaje))}
              </TableRow>
          ))}
          </TableBody>
      );
  }

  const showPaginationButtons = () => {
      return(
          <Grid container justify="center" alignItems="center">
              <Pagination color="secondary" disabled={cargandoTurnos} count={total} page={actual} onChange={handleChangePage}/>
          </Grid>   
      )
  }

  const handleShowPaginationButtons = () => {
      return(
          !cargandoTurnos || cargandoChangePage?
              showPaginationButtons(): 
              null
      );
  }

  const handleShowTableDataLoading = () => {
      return(
          cargandoTurnos && <LinearProgress/>
      );
  }

  const handleTurnosRecientes = () => {
      setIsOrdRecientes(true)
      setFiltro({ sort: 'fechaInicio,desc' });
      handleChangePage(undefined, 1)
  }

  const handleTurnosAntiguos = () => {
      setIsOrdRecientes(false)
      setFiltro({ sort: 'fechaInicio,asc' });
      handleChangePage(undefined, 1)
  }

  const handleTurnosSelected = () => {
      setIsTurnosSelected(true)
      setFiltro({esHistorico: false})
      handleChangePage(undefined, 1)
  }

  const handleTurnosHistoricosSelected = () => {
      setIsTurnosSelected(false)
      setFiltro({esHistorico: true})
      handleChangePage(undefined, 1)
  }

  const handleActualizarTurnos = () => {
    refreshTurnos();
  };

  const showFilterButtons = () => {
    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <ButtonGroup
          variant="text"
          color="secondary"
          aria-label="text primary button group"
        >
          <Button disabled={isTurnosSelected} onClick={handleTurnosSelected}>
            Turnos
          </Button>
          <Button
            disabled={!isTurnosSelected}
            onClick={handleTurnosHistoricosSelected}
          >
            Turnos Historicos
          </Button>
          <Button onClick={handleActualizarTurnos}>Actualizar</Button>
        </ButtonGroup>
        <ButtonGroup
          variant="text"
          color="secondary"
          aria-label="text primary button group"
        >
          <Button disabled={isOrdRecientes} onClick={handleTurnosRecientes}>
            Recientes
          </Button>
          <Button disabled={!isOrdRecientes} onClick={handleTurnosAntiguos}>
            Antiguos
          </Button>
        </ButtonGroup>
      </Grid>
    );
  };

  const handleShowColumn = (isShow, columnName) => {
    return isShow ? (
      <StyledTableCell align="center">{columnName}</StyledTableCell>
    ) : null;
  };

  const handleShowInfoClientColumns = (sonTurnosActuales) => {
    return sonTurnosActuales
      ? showTodasLasColumnasInfoCliente()
      : showModalInfoCliente();
  };

  const showTodasLasColumnasInfoCliente = () => {
    return (
      <>
        <StyledTableCell align="center">Nombre</StyledTableCell>
        <StyledTableCell align="center">Email</StyledTableCell>
        <StyledTableCell align="center">Dirección</StyledTableCell>
        <StyledTableCell align="center">Ubicación</StyledTableCell>
      </>
    );
  };

  const showModalInfoCliente = () => (
    <StyledTableCell align="center">Información del Cliente</StyledTableCell>
  );

  const createTableDataTurnos = () => {
    return (
      <TableContainer className={classes.tableContainer} component={Paper}>
        {handleShowTableDataLoading()}
        {showFilterButtons()}
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {handleShowInfoClientColumns(isTurnosSelected)}
              <StyledTableCell align="center">
                Servicios Pedidos
              </StyledTableCell>
              <StyledTableCell align="center">Estado</StyledTableCell>
              <StyledTableCell align="center">Fecha Inicio</StyledTableCell>
              {handleShowColumn(!isTurnosSelected, "Fecha Fin")}
              {handleShowColumn(isTurnosSelected, "Acción")}
              {handleShowColumn(!isTurnosSelected, "Puntuación")}
            </TableRow>
          </TableHead>
          {handleShowTurnos()}
        </Table>
        {handleShowPaginationButtons()}
      </TableContainer>
    );
  };

  const createView = () => {
    return (
      <>
        <Grid container>
          <Grid item xs />
          <Grid item xs={10}>
            {createPanelPeluquero()}
          </Grid>
          <Grid item xs />
        </Grid>
        <Grid container>
          <Grid item xs />
          <Grid item xs={10}>
            {createTableDataTurnos()}
          </Grid>
          <Grid item xs />
        </Grid>
      </>
    );
  };

  return (
    <div>
      {cargando || !peluquero.id ? <CirculitoCargando /> : createView()}
    </div>
  );
};

export default PaginaGestionPeluquero;
