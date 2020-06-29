import React, { useState } from "react";
import {
  useGetTurnosPeluquero,
  usePostConfirmarTurno,
  usePostFinalizarTurno,
} from "../service/ServicioDeTurno";
import {
  Button,
  Table,
  TableBody,
  IconButton,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  ButtonGroup,
  Grid,
  Box,
  Container,
  Chip
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#0eacd4",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  panelPeluquero: {
    marginTop: "45px",
    marginBottom: "20px",
    backgroundColor: "#0eacd4",
    borderLeft: "10px solid #017787",
    borderRight: "10px solid #017787",
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
});

const PaginaTurnosPeluquero = () => {
  const classes = useStyles();
  const [isTurnosSelected, setIsTurnosSelected] = useState(true);
  const [cargandoChangePage, setCargandoChangePage] = useState(false);
  const [isOrdRecientes, setIsOrdRecientes] = useState(false);
  const [{ turnos, actual, tamanio, total }, setPaginacion] = useState({
    turnos: [],
    actual: 1,
    tamanio: 3,
    total: 1,
  });
  const { cargandoTurnos, setFiltro } = useGetTurnosPeluquero(
    tamanio,
    setPaginacion
  );
  const refreshTurnos = () => setFiltro();
  const { setIdTurnoInParamConfirmarTurno } = usePostConfirmarTurno(
    refreshTurnos
  );
  const { setIdTurnoInParamFinalizarTurno } = usePostFinalizarTurno(
    refreshTurnos
  );

  const handleChangePage = (event, value) => {
    if (actual !== value) {
      setCargandoChangePage(true);
      setFiltro({ page: value - 1 });
    }
  };

  const estadoTurnoLabel = (estado) => {
    switch (estado) {
      case "ESPERANDO":
        return <Chip 
          style={{backgroundColor:'#ecf0f1', color: 'white'}} 
          label="Esperando" 
        />;
      case "CANCELADO":
        return <Chip 
          style={{backgroundColor:'#cd5c5c', color: 'white'}} 
          label="Cancelado" 
        />;
      case "PENDIENTE":
        return <Chip 
          style={{backgroundColor:'#eb984e', color: 'white'}} 
          label="Pendiente" 
        />;
      case "CONFIRMADO":
        return <Chip
        style={{backgroundColor:'#2ecc71', color: 'white'}} 
        label="Confirmado" 
      />;
      case "FINALIZADO":
        return <Chip 
        style={{backgroundColor:'#332f2c', color: 'white'}} 
        label="Finalizado" 
      />;
      default:
        return <Chip 
          style={{backgroundColor:'white', color: 'black'}} 
          label="ESTADO SIN HANDLEAR" 
        />;
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
      <Tooltip title="Confirmar turno">
        <IconButton 
          onClick={() => handleActionConfirmar(turno.id)}
          style={{ color: "black" }}  
        >
          <CheckCircleIcon />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Finalizar turno">
        <IconButton 
          onClick={() => handleActionFinalizar(turno.id)}
          style={{ color: "black" }}
        >
          <IconSvg
            idSvg="handshake"
            width="42px"
            height="36px"
            style={{ marginTop: "6px" }}
          />
        </IconButton>
      </Tooltip>
    );
  };

  const mostrarRowsInfoCliente = (turno) => {
    return (
      <>
        <StyledTableCell align="left">
          <div>Nombre: {turno.clienteFullName}</div>
          <div>Email: {turno.clienteEmail} </div>
          <div> 
            Ubicación: <br />
            {formatDireccion(turno.direccionDelTurno)}{displayUbicacion(turno.ubicacionDelTurno)} 
          </div>
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
        style={{ margin: 0, color: "black" }}
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

  const handleShowTurnos = () => !cargandoTurnos && showTurnos();

  const showTurnos = () => {
    return (
      <TableBody>
        {turnos.map((turno) => (
          <StyledTableRow
            key={turno.id}
          >
            <StyledTableCell align="center" component="th" scope="turno">
              {estadoTurnoLabel(turno.estado)}
            </StyledTableCell>
            {handleShowClientInfo(isTurnosSelected, turno)}
            <StyledTableCell align="center">
              <ModalServiciosInfoTurno turno={turno} />
            </StyledTableCell>
            <StyledTableCell align="center">{`${formatDate(
              turno.fechaInicio
            )} ${formatTime(turno.fechaInicio)}`}</StyledTableCell>
            {handleShowDataInRow(
              !isTurnosSelected,
              `${formatDate(turno.fechaFin)} ${formatTime(turno.fechaFin)}`
            )}
            {handleShowDataInRow(
              isTurnosSelected,
              showAppropiateActionButton(turno)
            )}
            {handleShowDataInRow(
              !isTurnosSelected,
              showPuntuacionData(turno.puntaje)
            )}
          </StyledTableRow>
        ))}
        {turnos.length === 0 && (
          <TableRow style={{ height: 300 }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
  };

  const showPaginationButtons = () => {
    return (
      <Grid container justify="center" alignItems="center">
        <Pagination
          color="secondary"
          disabled={cargandoTurnos}
          count={total}
          page={actual}
          onChange={handleChangePage}
        />
      </Grid>
    );
  };

  const handleShowPaginationButtons = () => {
    return !cargandoTurnos || cargandoChangePage
      ? showPaginationButtons()
      : null;
  };

  const handleShowTableDataLoading = () => {
    return cargandoTurnos && <LinearProgress />;
  };

  const handleTurnosRecientes = () => {
    setIsOrdRecientes(true);
    setFiltro({ sort: "fechaInicio,desc" });
    handleChangePage(undefined, 1);
  };

  const handleTurnosAntiguos = () => {
    setIsOrdRecientes(false);
    setFiltro({ sort: "fechaInicio,asc" });
    handleChangePage(undefined, 1);
  };

  const handleTurnosSelected = () => {
    setIsTurnosSelected(true);
    setFiltro({ esHistorico: false });
    handleChangePage(undefined, 1);
  };

  const handleTurnosHistoricosSelected = () => {
    setIsTurnosSelected(false);
    setFiltro({ esHistorico: true });
    handleChangePage(undefined, 1);
  };

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

  const showTodasLasColumnasInfoCliente = () => 
    <StyledTableCell align="center">Cliente</StyledTableCell>

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
              <StyledTableCell align="center">Estado</StyledTableCell>
              {handleShowInfoClientColumns(isTurnosSelected)}
              <StyledTableCell align="center">
                Servicios Pedidos
              </StyledTableCell>
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

  return (
    <Container maxWidth="md">
      <Box justifyContent="center" mt={3}>
        {createTableDataTurnos()}
      </Box>
    </Container>
  );
};

export default PaginaTurnosPeluquero;
