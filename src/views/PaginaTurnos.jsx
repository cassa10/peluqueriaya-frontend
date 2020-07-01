import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  usePostCancelarTurno,
  usePostConfirmarTurno,
  usePostFinalizarTurno,
} from "../service/ServicioDeTurno";
import {
  CircularProgress, Button, Table, TableBody, 
  IconButton,TableCell, Container, Chip, Typography,
  TableContainer,TableHead, TableRow, Paper,
  LinearProgress, ButtonGroup, Grid, Box, 
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Pagination from "@material-ui/lab/Pagination";
import ModalServiciosInfoTurno from "../components/ModalServiciosInfoTurno";
import ModalCalificarTurno from "../components/ModalCalificarTurno";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import formatDate from "../utils/formatters/formatDate";
import formatTime from "../utils/formatters/formatTime";
import formatNroTelefono from "../utils/formatters/formatNroTelefono";
import Swal from "sweetalert2";
import RoomIcon from "@material-ui/icons/Room";
import StarIcon from "@material-ui/icons/Star";
import CancelIcon from "@material-ui/icons/Cancel";
import BlockIcon from "@material-ui/icons/Block";
import RefreshIcon from '@material-ui/icons/Refresh';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import getLogoOrDefault from "../utils/getLogoOrDefault";


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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  circularProgress: {
    color: "#0eacd4",
  },
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
  iconIsolate: {
    marginTop: "6px",
  },
  iconBlock: {
    color: "red",
  },
  logoImg: {
    minWidth: 75,
    maxWidth: 75,
    minHeight: 75,
    maxHeight: 75,
    marginBottom: 5
  },
  direccionInServicio: {
    marginTop: "7px",
  },
});

const PaginaTurnos = ({ isPeluquero, useGetTurnos}) => {
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
  
  const { cargandoTurnos, setFiltro } = useGetTurnos(
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
  
  const { setIdTurnoInParamCancelarTurno } = usePostCancelarTurno(
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
          style={{backgroundColor:'#ecf0f1', color: 'black'}} 
          label="En espera" 
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

  const displayPuntuacion = (puntaje) => 
    <>
        <div>
            <StarIcon style={{color: "#ffb400"}}/>
        </div>
        {`${puntaje}/5`}
    </>

  const showPuntuacionDataPeluquero = (puntaje) => 
    puntaje > 0 ?
        displayPuntuacion(puntaje)
        :
        "Sin puntuar aún";

  const showPuntuacionDataCliente = (turno) => 
    turno.puntaje > 0 ? 
        displayPuntuacion(turno.puntaje)
        :
        <ModalCalificarTurno turno={turno} refreshTurnos={refreshTurnos} />;
  
  const handleShowPuntuacionDataCliente = (turno) => 
    turno.estaCancelado ?
        <div className={classes.iconIsolate}>
            <BlockIcon className={classes.iconBlock} />
        </div>
        : 
        showPuntuacionDataCliente(turno);

  const showPuntuacionData = (turno) =>
    isPeluquero ?
        showPuntuacionDataPeluquero(turno.puntaje)
        :
        handleShowPuntuacionDataCliente(turno);

  const handleShowDataInRow = (isShow, data) =>
    isShow && <StyledTableCell align="center">{data}</StyledTableCell>;

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

  const handleActionCancelar = (idTurno) => {
    const dialogMessage =
      "Esto quiere decir que el turno se cancelará y no se va a concretar.";
    showDialogAction(dialogMessage, idTurno, setIdTurnoInParamCancelarTurno);
  };

  const getStyleCancel = (disabled) => 
    !disabled?{ color: "red" }: {}
  
  const showCancelButton = (turno) => 
    <Tooltip title="Cancelar turno">
        <IconButton
          component="div"
          disabled={!turno.estaEsperando}
          style={getStyleCancel(!turno.estaEsperando)}
          onClick={() => handleActionCancelar(turno.id)}
        >
        <CancelIcon style={{ fontSize: 30 }}/>
        </IconButton>
    </Tooltip>
  ;

  const showAppropiateActionButtonPeluquero = (turno) => 
    turno.estaPendiente ? (
        <Tooltip title="Confirmar turno">
        <IconButton 
            onClick={() => handleActionConfirmar(turno.id)}
            style={{ color: "#2ecc71" }}  
        >
            <CheckCircleIcon style={{ fontSize: 30 }}/>
        </IconButton>
        </Tooltip>
    ) : (
        <Tooltip title="Finalizar turno">
          <IconButton 
              onClick={() => handleActionFinalizar(turno.id)}
              style={{ color: "#626253" }}
          >
            <AssignmentTurnedInIcon style={{ fontSize: 30 }}/>
        </IconButton>
        </Tooltip>
    )
  ;

  const showAppropiateActionButtonCliente = showCancelButton

  const showAppropiateActionButton = (turno) => 
    isPeluquero?
        showAppropiateActionButtonPeluquero(turno)
        :
        showAppropiateActionButtonCliente(turno)
  ;

  const mostrarRowInfoCliente = (turno) => {
    return (
      <>
        <StyledTableCell align="center">
          <img
            className={classes.logoImg}
            src={getLogoOrDefault(turno.clienteImgPerfil)}
            alt="imgPerfilCliente"
          />
        </StyledTableCell>
        <StyledTableCell align="left">
          {formatDireccion(turno.direccionDelTurno)}{displayUbicacion(turno.ubicacionDelTurno)}
          <div>{turno.clienteFullName}</div>
          <div>{formatNroTelefono(turno.clienteNroTelefono)}</div>
          <div>{turno.clienteEmail}</div>
        </StyledTableCell>
      </>
    );
  };

  const mostrarRowInfoPeluquero = (turno) => {
    return (
      <>
        <StyledTableCell align="center">
          <img
            className={classes.logoImg}
            src={getLogoOrDefault(turno.peluqueroLogo)}
            alt="logoPeluquero"
          />
        </StyledTableCell>
        <StyledTableCell align="left">
          <div>{turno.peluqueroName}</div>
          <br />
          <div>{turno.peluqueroEmailOpcional}</div>
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
    <Tooltip title="Ver en google maps">
      <IconButton
        onClick={() => {
          handleClickUbicacion(ubicacion);
        }}
        style={{ margin: 0, color: "#0eacd4" }}
      >
        <RoomIcon style={{ fontSize: 30 }} />
      </IconButton>
    </Tooltip>
    );
  };

  const handleClickUbicacion = (ubicacion) => {
    window.open(
      `https://maps.google.com/?q=${ubicacion.latitude},${ubicacion.longitude}`
    );
  };

  const handleShowClienteOPeluqueroInfo = (turno) => {
    return isPeluquero
      ? mostrarRowInfoCliente(turno)
      : mostrarRowInfoPeluquero(turno);
  };

  const handleShowTurnos = () => cargandoTurnos ? showLoadingTurnos() : showTurnos()

  const showLoadingTurnos = () => (
    <TableBody>
      {showMessageRowInTable(
        280, '#fafbf5',  <CircularProgress className={classes.circularProgress} />
      )}
    </TableBody>
  );
  
  const showMessageRowInTable = (alturaRow, backgroundColor, message) => (
    <StyledTableRow style={{ height: alturaRow, backgroundColor: backgroundColor }}>
      <StyledTableCell colSpan={6} align="center"> 
          {message}
      </StyledTableCell>
    </StyledTableRow>
  )
  
  const handleShowFechasData = (turno) => 
    isTurnosSelected ?
        <StyledTableCell align="center">
            {`${formatDate(turno.fechaInicio)} ${formatTime(turno.fechaInicio)}`}
        </StyledTableCell>
        :
        <StyledTableCell align="left">
            <div>
                Contratación
            </div>
            {`${formatDate(turno.fechaInicio)} ${formatTime(turno.fechaInicio)}`}
            <br />
            <br />
            <div>
                Cierre
            </div>
            {`${formatDate(turno.fechaFin)} ${formatTime(turno.fechaFin)}`}
        </StyledTableCell>
      ;
    
  const showServicioDataInRow = (turno) => (
    <StyledTableCell align="center" component="th" scope="turno">
      <div>
      <ModalServiciosInfoTurno turno={turno} /> <br />
      {estadoTurnoLabel(turno.estado)} <br />
      </div>
      <div className={classes.direccionInServicio}>
        {!isPeluquero && formatDireccion(turno.direccionDelTurno)}
      </div>
      
    </StyledTableCell>
  );
  

  const showAllTurnos = () => 
    turnos.map((turno) => 
        <StyledTableRow key={turno.id}>
          {showServicioDataInRow(turno)}
          {handleShowClienteOPeluqueroInfo(turno)}
          {handleShowFechasData(turno)}
          {handleShowDataInRow(
            isTurnosSelected,
            showAppropiateActionButton(turno)
          )}
          {handleShowDataInRow(
            !isTurnosSelected,
            showPuntuacionData(turno)
          )}
        </StyledTableRow>
    );

  const showEmptyTurnos = () => 
    showMessageRowInTable(
      250,
      '#fafbf5',
      <Typography variant="h4">{isTurnosSelected?"Sin turnos aún":"Sin turnos historicos aún"}</Typography>
    );

  const showTurnos = () => {
    return (
      <TableBody>
        {turnos.length > 0?showAllTurnos():showEmptyTurnos()}
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

  const handleShowPaginationButtons = () => 
    (!cargandoTurnos || cargandoChangePage) && showPaginationButtons();

  const handleShowTableDataLoading = () => 
    cargandoTurnos && <LinearProgress />;

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
            Historial
          </Button>
          <Button onClick={handleActualizarTurnos}><RefreshIcon /></Button>
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

  const handleShowColumn = (isShow, columnName) => 
        isShow && <StyledTableCell align="center">{columnName}</StyledTableCell>;

  const handleShowInfoClienteOPeluqueroColumn = () => (
        <>
          <StyledTableCell />
          <StyledTableCell align="left">
            {isPeluquero ? "Cliente" :"Peluquero"}
          </StyledTableCell>
        </>
  );

  const handleShowFechas = () => 
    isTurnosSelected ? 
        <StyledTableCell align="center">Fecha Solicitud</StyledTableCell>
        :
        <StyledTableCell align="center">Fechas</StyledTableCell>;

  const createTableDataTurnos = () => {
    return (
      <TableContainer className={classes.tableContainer} component={Paper}>
        {handleShowTableDataLoading()}
        {showFilterButtons()}
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                Servicio
              </StyledTableCell>
              {handleShowInfoClienteOPeluqueroColumn()}
              {handleShowFechas()}
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

PaginaTurnos.propTypes = {
    isPeluquero: PropTypes.bool.isRequired, 
    useGetTurnos: PropTypes.func.isRequired,
};

export default PaginaTurnos;
