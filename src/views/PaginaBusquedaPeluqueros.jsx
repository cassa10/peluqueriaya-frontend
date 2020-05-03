import React, { useEffect, useState } from 'react';
import {Button, Box, TextField} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import ListaPeluqueros from '../components/ListaPeluqueros';
import useServicioDePeluquero from "../service/useServicioDePeluquero";
import {useHistory} from "react-router";
import TabDeFiltradoPorServicio from "../components/TabDeFiltradoPorServicio";

const useStyles = makeStyles((theme) => ({
    textfield1: {
        width: '100%'
    },
    buttonSearch: {
        width: '50%'
    },
    buttonReset: {
        width: '50%'
    }
  }));

const PaginaBusquedaPeluqueros = () => {
    const classes = useStyles();
    const [resultados, setResultados] = useState([]);
    const [{buscarPeluquero, cargandoBP},{buscarPeluquerosPorTipoDeServicio, cargandoBPPS}, {buscarPeluquerosPorNombreOTipo, cargandoBPNT}] = useServicioDePeluquero();
    const [nombreOTipo,setNombreOTipo] = useState('');
    const [tipoDeServicio, setTipoDeServicio] = useState(false);
    const {push} = useHistory();

    useEffect(() => {
        buscarPeluquero((peluqueros) => setResultados(peluqueros));
        // eslint-disable-next-line
    },[]);

    const irPaginaPrincipal = () => push("/");

    const buscarPorTipoDeServicio = (tipoDeServicio) => {
        buscarPeluquerosPorTipoDeServicio(tipoDeServicio, (resultados) => setResultados(resultados));
    }

    const buscarPorNombreOTipo = (nombreOTipo) => {
        buscarPeluquerosPorNombreOTipo(nombreOTipo, (resultados) => setResultados(resultados)); 
    }

    const handleNombreTipoInput = (event) => {
        setNombreOTipo(event.target.value)
    }
    
    const reiniciarFiltros = () => {
        setNombreOTipo('')
        setTipoDeServicio(false)
        buscarPorNombreOTipo('')
    }

    const mostrarPantallaDeCargaOResultados = () => {
        //TODO
            //Ejecutar animacion de que se cargan los resultados o mostrar el resultado (no mostrar nada mientras alguno este en true?)
            //Puede ser que estas 3 variables se conviertan en uno al componer todos los resultados en uno.
            console.log(cargandoBP);
            console.log(cargandoBPPS);
            console.log(cargandoBPNT);
        // ----------------------------------------------
        return(
            <ListaPeluqueros
              resultados={resultados}
              botonIrPaginaPrincipal={
                  <Button size="small" color="secondary" onClick={irPaginaPrincipal}>
                      Volver e intentar con otra ubicación
                  </Button>
              }
            />
        );
    }

    return (
        <div>
            <Box bgcolor="primary.main" color="primary.contrastText" textAlign="center" m={2}>
                <TabDeFiltradoPorServicio buscar={buscarPorTipoDeServicio} tipoDeServicio={tipoDeServicio} setTipoDeServicio={setTipoDeServicio}/>
            </Box>
            <Box bgcolor="primary.main" color="primary.contrastText" textAlign="center" m={2}>
                <TextField className={classes.textfield1} color="secondary" label="Filtrar por nombre o tipo" value={nombreOTipo} variant="filled" onChange={handleNombreTipoInput}/>
                <Button className={classes.buttonReset} onClick={reiniciarFiltros}>Reiniciar</Button>
                <Button className={classes.buttonSearch} onClick={() => buscarPorNombreOTipo(nombreOTipo)}>Buscar</Button>
            </Box>
            {
                mostrarPantallaDeCargaOResultados()
            }
        </div>
    );
};

export default PaginaBusquedaPeluqueros;