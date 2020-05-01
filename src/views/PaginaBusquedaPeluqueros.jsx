import React, { useEffect, useState } from 'react';
import Box from "@material-ui/core/Box";
import ListaPeluqueros from '../components/ListaPeluqueros';
import Button from "@material-ui/core/Button";
import useServicioDePeluquero from "../service/useServicioDePeluquero";
import {useHistory} from "react-router";
import TabDeFiltradoPorServicio from "../components/TabDeFiltradoPorServicio";


const PaginaBusquedaPeluqueros = () => {
    const [resultados, setResultados] = useState([]);
    const [{buscarPeluquero},{buscarPeluquerosPorTipoDeServicio}] = useServicioDePeluquero();
    const {push} = useHistory();

    useEffect(() => {
        buscarPeluquero((peluqueros) => setResultados(peluqueros));
        // eslint-disable-next-line
    },[]);

    const irPaginaPrincipal = () => push("/");

    const buscarPorTipoDeServicio = (tipoDeServicio) => {
        buscarPeluquerosPorTipoDeServicio(tipoDeServicio, (resultados) => setResultados(resultados));
    }

    return (
        <div>
            <Box bgcolor="primary.main" color="primary.contrastText" textAlign="center" m={2}>
                <TabDeFiltradoPorServicio buscar={buscarPorTipoDeServicio}/>
            </Box>
            <ListaPeluqueros
                resultados={resultados}
                botonIrPaginaPrincipal={
                    <Button size="small" color="secondary" onClick={irPaginaPrincipal}>
                        Volver e intentar con otra ubicación
                    </Button>
                }
            />
        </div>
    );
};

export default PaginaBusquedaPeluqueros;