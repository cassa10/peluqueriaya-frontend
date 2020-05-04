import React, { useEffect, useState } from 'react';
import Box from "@material-ui/core/Box";
import ListaPeluqueros from '../components/ListaPeluqueros';
import Button from "@material-ui/core/Button";
import {useGetPeluquerosCercanos} from "../service/ServicioDePeluquero";
import {useHistory} from "react-router";
import TabDeFiltradoPorServicio from "../components/TabDeFiltradoPorServicio";


const PaginaBusquedaPeluqueros = () => {
    const [resultados, setResultados] = useState([]);
    const [ubicacion, setUbicacion] = useState(null);
    const [{setTipoDeServicio}] = useGetPeluquerosCercanos(ubicacion, setResultados);
    const {push} = useHistory();

    useEffect(() => {
        const ubicacionLocal = {
            latitude: sessionStorage.getItem('userLocationLatitude'),
            longitude: sessionStorage.getItem('userLocationLongitude')
        }
        if (!(ubicacionLocal.latitude === null || ubicacionLocal.longitude === null)) {
            setUbicacion(ubicacionLocal);
        } else {
            push("/");
        }
        // eslint-disable-next-line
    },[]);

    const irPaginaPrincipal = () => push("/");

    return (
        <div>
            <Box bgcolor="primary.main" color="primary.contrastText" textAlign="center" m={2}>
                <TabDeFiltradoPorServicio buscar={setTipoDeServicio}/>
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