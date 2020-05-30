import React, { useState } from 'react';
import { useGetPeluqueroLogeado } from "../service/ServicioDePeluquero";
import { useGetTurnosPeluquero } from "../service/ServicioDeTurno";
import CirculitoCargando from "../components/CirculoCargando";
import {
    Button, Table, TableBody,
    TableCell, TableContainer, TableHead,
    TableRow, Paper, LinearProgress, ButtonGroup, Grid
} from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Pagination from "@material-ui/lab/Pagination";
import ModalInfoClienteTurno from "../components/ModalInfoClienteTurno";
import ModalServiciosInfoTurno from "../components/ModalServiciosInfoTurno";
import formatDate from '../formatters/formatDate';
import formatTime from '../formatters/formatTime';

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
    table: {
        minWidth: 700,
    },
    paginationBar: {
        justifyContent: 'center',
    },
    cancelado: {
        backgroundColor: '#cd5c5c',
    },
    pendiente: {
        backgroundColor: '#eb984e',
    },
    esperando: {
        backgroundColor: '#ecf0f1',
    },
    confirmado: {
        backgroundColor: '#2ecc71',
    },
    finalizado: {
        backgroundColor: '#b2babb',
    }
});

const PaginaGestionPeluquero = () => {
    const classes = useStyles();

    const [peluquero, setPeluquero] = useState({ id: 0, nombre: '' });

    const { cargando } = useGetPeluqueroLogeado(setPeluquero)

    const [{ turnos, actual, tamanio, total }, setPaginacion] = useState({
        turnos: [],
        actual: 1,
        tamanio: 3,
        total: 1,
    });

    const [isTurnosSelected,setIsTurnosSelected] = useState(true);

    const { cargandoTurnos, setFiltro } = useGetTurnosPeluquero(tamanio, setPaginacion)

    const [cargandoChangePage, setCargandoChangePage] = useState(false);

    const [isOrdRecientes, setIsOrdRecientes] = useState(false);

    const createPanelPeluquero = () => {
        return (
            <div>
                Peluquero {peluquero.id} {peluquero.nombre}
            </div>
        );
    }

    const handleChangePage = (event, value) => {
        if(actual !== value){
            setCargandoChangePage(true)
            setFiltro({page: value - 1})
        }
    }

    const estadoTurnoBackgroundIndex = (estado) => {
        switch(estado){
            case 'ESPERANDO':
                return classes.esperando;
            case 'CANCELADO':
                return classes.cancelado;
            case 'PENDIENTE':
                return classes.pendiente;
            case 'CONFIRMADO':
                return classes.confirmado;
            case 'FINALIZADO':
                return classes.finalizado;
            default:
                return classes.esperando;
        }
    }

    const showPuntuacionData = (puntaje) => {
        return(
            puntaje>0?puntaje:'Sin puntuar'
        );
    }

    const handleShowDataIsTurnoSelected = (data) => {
        return(
            !isTurnosSelected?<StyledTableCell align="center">{data}</StyledTableCell>:null
        );
    }

    const showTurnos = () => {
        return(
            <TableBody>
            {turnos.map((turno) => (
                <TableRow key={turno.id} className={estadoTurnoBackgroundIndex(turno.estado)}>
                    <StyledTableCell align="center" component="th" scope="turno">
                        {turno.estado}
                    </StyledTableCell>
                    <StyledTableCell align="center">{`${formatDate(turno.fechaInicio)} ${formatTime(turno.fechaInicio)}`}</StyledTableCell>
                    {handleShowDataIsTurnoSelected(`${formatDate(turno.fechaFin)} ${formatTime(turno.fechaFin)}`)}
                    <StyledTableCell align="center">
                        <ModalServiciosInfoTurno corteMinInfo={turno.corteMinInfo} serviciosInfo={turno.serviciosSolicitadosInfo}/>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        <ModalInfoClienteTurno fullname={turno.clienteFullName} email={turno.clienteEmail} ubicacion={turno.ubicacionDelTurno}/>
                    </StyledTableCell>
                    {handleShowDataIsTurnoSelected(showPuntuacionData(turno.puntaje))}
                </TableRow>
            ))}
            </TableBody>
        );
    }

    const handleShowTurnos = () => {
        return (
            !cargandoTurnos?showTurnos():null
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
            cargandoTurnos?<LinearProgress/>:null
        );
    }

    const handleTurnosRecientes = () => {
        setIsOrdRecientes(true)
        setFiltro({ sort: 'fechaInicio,desc' });
    }

    const handleTurnosAntiguos = () => {
        setIsOrdRecientes(false)
        setFiltro({ sort: 'fechaInicio,asc' });
    }

    const handleTurnosSelected = () => {
        setIsTurnosSelected(true)
        setFiltro({esHistorico: false})
    }

    const handleTurnosHistoricosSelected = () => {
        setIsTurnosSelected(false)
        setFiltro({esHistorico: true})
    }

    const handleActualizarTurnos = () => {
        setFiltro()
    }

    const showFilterButtons = () => {
        return(
            <Grid container direction="row" justify="space-between" alignItems="flex-start">
                <ButtonGroup variant="text" color="secondary" aria-label="text primary button group">
                    <Button disabled={isTurnosSelected} onClick={handleTurnosSelected}>
                        Turnos
                    </Button>
                    <Button disabled={!isTurnosSelected} onClick={handleTurnosHistoricosSelected}>
                        Turnos Historicos            
                    </Button>
                    <Button onClick={handleActualizarTurnos}>
                        Actualizar
                    </Button>
                </ButtonGroup>
                <ButtonGroup variant="text" color="secondary" aria-label="text primary button group">
                    <Button disabled={isOrdRecientes} onClick={handleTurnosRecientes}>
                        Recientes            
                    </Button>
                    <Button disabled={!isOrdRecientes} onClick={handleTurnosAntiguos}>
                        Antiguos
                    </Button>
                </ButtonGroup>
            </Grid>
        );
    }

    const handleShowIsTurnosSelected = (columnName) => {
        return(
            !isTurnosSelected?<StyledTableCell align="center">{columnName}</StyledTableCell>:null
        );
    }

    const createTableDataTurnos = () => {
        return (
            <TableContainer component={Paper}>
                    {handleShowTableDataLoading()}
                    {showFilterButtons()}
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Estado</StyledTableCell>
                            <StyledTableCell align="center">Fecha Inicio</StyledTableCell>
                            {handleShowIsTurnosSelected('Fecha Fin')}
                            <StyledTableCell align="center">Servicios Pedidos</StyledTableCell>
                            <StyledTableCell align="center">Información del Cliente</StyledTableCell>
                            {handleShowIsTurnosSelected('Puntuación')}
                        </TableRow>
                    </TableHead>
                    {handleShowTurnos()}
                </Table>
                {handleShowPaginationButtons()}
            </TableContainer>
        );
    }

    const createView = () => {
        return (
            <div>
                {createPanelPeluquero()}
                {createTableDataTurnos()}
            </div>
        );
    }

    return (
        <div>
            {cargando || !peluquero.id ?
                <CirculitoCargando /> :
                createView()
            }
        </div>
    );
}

export default PaginaGestionPeluquero;