import React, {useState} from 'react';
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TabDeFiltradoPorServicio from "../components/TabDeFiltradoPorServicio";
import {useGetPeluqueros} from "../service/ServicioDePeluquero";
import ListaPeluqueros from "../components/ListaPeluqueros";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router";
import CirculitoCargando from "../components/CirculoCargando";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/core/styles";
import CheckBoxsDeTiposDePeluquero from "../components/CheckBoxsDeTiposDePeluquero";
import CampoDeBusqueda from "../components/CampoDeBusqueda";

const useStyles = makeStyles(theme => ({
    toolbar: {
        padding: theme.spacing(1)
    }
}));

const PaginaBusquedaPeluqueros = () => {
    const clases = useStyles();
    const [peluqueros, setPeluqueros] = useState([]);
    const {cargando, setFiltroDeBusqueda} = useGetPeluqueros(setPeluqueros);
    const {push} = useHistory();

    const limpiarFiltro = (filtro) => {
        const limpiar = {};
        limpiar[filtro] = null;
        setFiltroDeBusqueda(limpiar)
    }

    return <Box bgcolor="primary.main" color="primary.contrastText" textAlign="center" m={2}>
        <Grid container direction="column">
            <Grid item xs>
                <TabDeFiltradoPorServicio setFiltro={setFiltroDeBusqueda} limpiarFiltro={limpiarFiltro}/>
            </Grid>
            <Grid item xs>
                <AppBar position="static">
                    <Toolbar className={clases.toolbar} variant="dense">
                        <Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
                            <Grid item xs={6}>
                                <CampoDeBusqueda onClick={setFiltroDeBusqueda} clear={limpiarFiltro}/>
                            </Grid>
                            <Grid item xs={6}>
                                <CheckBoxsDeTiposDePeluquero setFiltro={setFiltroDeBusqueda}/>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item xs>
                {cargando ?
                    <CirculitoCargando/> :
                    <ListaPeluqueros
                        resultados={peluqueros}
                        botonIrPaginaPrincipal={
                            <Button size="small" color="secondary" onClick={() => push("/")}>
                                Volver e intentar con otra ubicación
                            </Button>}/>}
            </Grid>
        </Grid>
    </Box>
}

export default PaginaBusquedaPeluqueros;