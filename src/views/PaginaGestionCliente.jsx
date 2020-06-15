import React, { useState } from 'react';
import { useGetTurnosCliente, usePostCancelarTurno } from "../service/ServicioDeTurno";
import { useGetClienteLogeado } from "../service/ServicioDeCliente";
import CirculitoCargando from "../components/CirculoCargando";
import {
    Button, Table, TableBody, IconButton,
    TableCell, TableContainer, TableHead,
    TableRow, Paper, LinearProgress, ButtonGroup, Grid, Typography
} from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Pagination from "@material-ui/lab/Pagination";
import ModalServiciosInfoTurno from "../components/ModalServiciosInfoTurno";
import CancelIcon from '@material-ui/icons/Cancel';
import RoomIcon from '@material-ui/icons/Room';
import formatDate from '../formatters/formatDate';
import formatTime from '../formatters/formatTime';
import StarIcon from '@material-ui/icons/Star';
import BlockIcon from '@material-ui/icons/Block';
import Swal from 'sweetalert2';

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
    panelCliente: {
        marginTop: "45px",
        marginBottom: "20px",
        backgroundColor: "#0eacd4",
        borderLeft: "10px solid #017787",
        borderRight: "10px solid #017787",
    },
    clienteNombre:{
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
    },
    iconIsolate: {
        marginTop: '6px'
    }
});

const PaginaGestionCliente = () => {
    const classes = useStyles();

    const [cliente, setCliente] = useState({ id: 0, nombre: '' });

    const { cargando } = useGetClienteLogeado(setCliente)

    const [{ turnos, actual, tamanio, total }, setPaginacion] = useState({
        turnos: [],
        actual: 1,
        tamanio: 5,
        total: 1,
    });

    const [isTurnosSelected,setIsTurnosSelected] = useState(true);

    const { cargandoTurnos, setFiltro } = useGetTurnosCliente(tamanio, setPaginacion)

    const [cargandoChangePage, setCargandoChangePage] = useState(false);

    const [isOrdRecientes, setIsOrdRecientes] = useState(false);

    const refreshTurnos = () => { 
        setFiltro()
    }

    const {setIdTurnoInParamCancelarTurno} = usePostCancelarTurno(refreshTurnos)


    
    const createPanelCliente = () => {
        return (
            <Grid container className={classes.panelCliente}>
                <Grid item  xs={6}>
                    {mostrarDatosCliente(cliente)}
                </Grid>
            </Grid>
        );
    }

    const logoPredeterminado = (logoSrc) => {
        if (logoSrc.length > 0){
            return logoSrc
        }
        return "https://2.bp.blogspot.com/-JmAJ1XEBGfE/UTPme5-0HpI/AAAAAAAAARE/bT_fEs-9vQ4/s1600/No-Logo-Available.png"
    }

    const mostrarDatosCliente = (cliente) => {
        return(
            <Grid container item direction="row" justify="center" alignItems="center" spacing={1}>
                    <Grid item xs={1} />
                    <Grid item className={classes.gridLogoItem}>
                        <img
                            className={classes.logoImg}
                            src={logoPredeterminado(cliente.imgPerfil)}
                            alt="logo"
                        />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item>
                        <Typography className={classes.clienteNombre} textalign="center" variant="h5" component="h2">
                            {cliente.fullName}
                        </Typography>
                    </Grid>
            </Grid>
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

    const displayPuntaje = (puntaje) => {
        return(`${puntaje}/5`);
    }

    const showPuntuacionData = (puntaje) => {
        return(
            puntaje>0?
            <><div><StarIcon /></div>{displayPuntaje(puntaje)}</>:
            'Sin puntuar aún'
        );
    }

    const handlePuntuacionPorEstado = (turno) => 
        turno.estaCancelado?
            <div className={classes.iconIsolate}><BlockIcon /></div>:
            showPuntuacionData(turno.puntaje)
    
    

    const handleShowDataInRow = (isShow, data) => {
        return(
            isShow&&<StyledTableCell align="center">{data}</StyledTableCell>
        );
    }
    
    const showDialogAction = (mensaje, idTurno, fAction) => {
        Swal.fire({
            title: '¿Estás seguro?',
            html: mensaje,
            showCancelButton: true,
            cancelButtonColor: 'Red',
            confirmButtonColor: 'Green',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'De acuerdo',
            reverseButtons: true,
        }).then((result) => handleFAction(result.value, idTurno, fAction))
    }

    const handleFAction = (isAcepted, idTurno, fAction) => {
        if(isAcepted){
            fAction(idTurno);
        }
    }
    
    const handleActionCancelar = (idTurno) => {
        const dialogMessage = 'Esto quiere decir que el turno se cancelará y no se va a concretar.';
        showDialogAction(dialogMessage,idTurno,setIdTurnoInParamCancelarTurno);
    }
    
    const showCancelButton = (turno) => 
        <Button disabled={! turno.estaEsperando} onClick={() => handleActionCancelar(turno.id)}>Cancelar <CancelIcon /></Button>
    

    const mostrarRowsInfoCliente = (turno) => {
        return(
            <>
                <StyledTableCell align="center">
                    {formatDireccion(turno.direccionDelTurno)}
                </StyledTableCell>
                <StyledTableCell align="center">
                    {displayUbicacion(turno.ubicacionDelTurno)}
                </StyledTableCell>    
            </>
        );
    }

    const formatDireccion = (direccion) => {
        const dir = direccion.split(",");
        return `${dir[0]}, ${dir[1]}`
    }
    

    const displayUbicacion = (ubicacion) => {
        return(
            <IconButton onClick={() => {handleClickUbicacion(ubicacion)}} style={{color: 'black'}}>
                <RoomIcon style={{ fontSize: 30 }}/>
            </IconButton>
        );
    }

    const handleClickUbicacion = (ubicacion) => {
        window.open(`https://maps.google.com/?q=${ubicacion.latitude},${ubicacion.longitude}`)
    }

    const handleShowClientInfo = (sonTurnosActuales, turno) => {
        return(
            sonTurnosActuales && mostrarRowsInfoCliente(turno)
        );
    }

    const showFechaFin = (turno) => 
        turno.estaCancelado?
        `${formatDate(turno.fechaCancelacion)} ${formatTime(turno.fechaCancelacion)}`:
        `${formatDate(turno.fechaFin)} ${formatTime(turno.fechaFin)}`

    const handleShowPeluqueroInfo = (turno) => {
        return(
            <>
                <StyledTableCell align="center" component="th" scope="turno">
                    {turno.peluqueroName}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="turno">
                    {turno.peluqueroEmailOpcional}
                </StyledTableCell>
            </>
        );
    }


    const showTurnos = () => {
        return(
            <TableBody>
            {turnos.map((turno) => (
                <TableRow key={turno.id} className={estadoTurnoBackgroundIndex(turno.estado)}>
                    {handleShowPeluqueroInfo(turno)}
                    {handleShowClientInfo(isTurnosSelected, turno)}
                    <StyledTableCell align="center">
                        <ModalServiciosInfoTurno turno={turno} />
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="turno">
                        {turno.estado}
                    </StyledTableCell>
                    <StyledTableCell align="center">{`${formatDate(turno.fechaInicio)} ${formatTime(turno.fechaInicio)}`}</StyledTableCell>
                    {handleShowDataInRow(!isTurnosSelected,showFechaFin(turno))}
                    {handleShowDataInRow(isTurnosSelected, showCancelButton(turno))}
                    {handleShowDataInRow(!isTurnosSelected, handlePuntuacionPorEstado(turno))}
                </TableRow>
            ))}
            </TableBody>
        );
    }

    const handleShowTurnos = () => !cargandoTurnos && showTurnos()

    const showPaginationButtons = () => {
        return(
            <Grid container justify="center" alignItems="center">
                <Pagination color="secondary" disabled={cargandoTurnos} count={total} page={actual} onChange={handleChangePage}/>
            </Grid>   
        )
    }

    const handleShowPaginationButtons = () => {
        return(
            (!cargandoTurnos || cargandoChangePage) && 
                showPaginationButtons()
        );
    }

    const handleShowTableDataLoading = () => cargandoTurnos && <LinearProgress/>

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
        refreshTurnos()
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

    const handleShowColumn = (isShow, columnName) =>
            isShow && <StyledTableCell align="center">{columnName}</StyledTableCell>


    const createTableDataTurnos = () => {
        return (
            <TableContainer className={classes.tableContainer} component={Paper}>
                    {handleShowTableDataLoading()}
                    {showFilterButtons()}
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Peluquero</StyledTableCell>
                            <StyledTableCell align="center">Peluquero Email</StyledTableCell>
                            {handleShowColumn(isTurnosSelected,'Mi Dirección')}
                            {handleShowColumn(isTurnosSelected,'Mi Ubicación')}
                            <StyledTableCell align="center">Servicios Pedidos</StyledTableCell>
                            <StyledTableCell align="center">Estado</StyledTableCell>
                            <StyledTableCell align="center">Fecha Inicio</StyledTableCell>
                            {handleShowColumn(!isTurnosSelected,'Fecha Fin')}
                            {handleShowColumn(isTurnosSelected,'Acción')}
                            {handleShowColumn(!isTurnosSelected,'Puntuación')}
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
            <>
                <Grid container>
                    <Grid item xs />
                    <Grid item xs={10}>
                        {createPanelCliente()}
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
    }

    return (
        <div>
            {cargando || !cliente.id ?
                <CirculitoCargando /> :
                createView()
            }
        </div>
    );
}

export default PaginaGestionCliente;