import React, { useState } from 'react';
import { useGetPeluqueroLogeado } from "../service/ServicioDePeluquero";
import { useGetTurnosPeluquero } from "../service/ServicioDeTurno";
import CirculitoCargando from "../components/CirculoCargando";
import {
    Button, Table, TableBody,
    TableCell, TableContainer, TableHead,
    TableRow, Paper, Grid, ButtonGroup
} from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Pagination from "@material-ui/lab/Pagination";
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

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const PaginaGestionPeluquero = () => {
    const classes = useStyles();

    const [peluquero, setPeluquero] = useState({ id: 0, nombre: '' });

    const { cargando } = useGetPeluqueroLogeado(setPeluquero)

    const [{ turnos, actual, tamanio, total }, setPaginacion] = useState({
        turnos: [],
        actual: 1,
        tamanio: 3,
        total: 1
    });

    const { cargandoTurnos, setFiltro } = useGetTurnosPeluquero(tamanio, setPaginacion);

    const createPanelPeluquero = () => {
        return (
            <div>
                Peluquero {peluquero.id} {peluquero.nombre}
                <Button size="small" color="secondary" onClick={() => setFiltro({ sort: 'fechaInicio,asc' })}> Ordenar antiguo</Button>
                <Button size="small" color="secondary" onClick={() => setFiltro({ sort: 'fechaInicio,desc' })}> Ordenar reciente</Button>
            </div>
        );
    }

    const handleChangePage = (event, value) => setFiltro({page: value - 1});

    const createTableDataTurnos = () => {
        return (
            <TableContainer component={Paper}>
                    <ButtonGroup variant="text" color="secondary" aria-label="text primary button group">
                        <Button>
                            Turnos
                        </Button>
                        <Button>
                                Turnos Historicos            
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup variant="text" color="secondary" aria-label="text primary button group">
                        <Button>
                                Mas reciente            
                        </Button>
                    </ButtonGroup>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Estado</StyledTableCell>
                            <StyledTableCell align="center">Fecha Turno</StyledTableCell>
                            <StyledTableCell align="center">Servicios</StyledTableCell>
                            <StyledTableCell align="center">Cliente</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {turnos.map((turno) => (
                            <StyledTableRow key={turno.id}>
                                <StyledTableCell align="center" component="th" scope="turno">
                                    {turno.estado}
                                </StyledTableCell>
                                <StyledTableCell align="center">{`${formatDate(turno.fechaInicio)} ${formatTime(turno.fechaInicio)}`}</StyledTableCell>
                                <StyledTableCell align="center"><Button>Servicios</Button></StyledTableCell>
                                <StyledTableCell align="center"><Button>Cliente {turno.clienteId}</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                {!(cargandoTurnos || turnos.length > tamanio)?
                                    <Pagination color="secondary" disabled={cargandoTurnos} count={total} page={actual}
                                    onChange={handleChangePage}/>: null}
            </TableContainer>
        );
    }

    const createView = () => {
        console.log(turnos)
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