import {useGet} from "./API";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

export const useGetPeluqueros = (tamanioPagina, fDatos) => {
    const crearPaginacion = ({content, pageable,  totalPages}) => {
        fDatos((prevState) => ({
            ...prevState,
            peluqueros: content,
            actual: pageable.pageNumber+1,
            total: totalPages,
        }))
    }
    const {cargando, parametros, setParametros} = useGet("/peluquero/search",crearPaginacion);
    const {push} = useHistory();

    useEffect(() => {
        const ubicacionLocal = {
            latitude: sessionStorage.getItem('userLocationLatitude'),
            longitude: sessionStorage.getItem('userLocationLongitude')
        }
        if (ubicacionLocal.latitude === null || ubicacionLocal.longitude === null) push("/");
        else setParametros({...ubicacionLocal, size: tamanioPagina});
        // eslint-disable-next-line
    }, [])

    const setFiltro = (filtro) => setParametros((prevState) => ({...prevState, ...filtro}));

    const limpiarFiltro = (filtro) => {
        if (filtro in parametros) {
            // eslint-disable-next-line no-unused-vars
            const {[filtro]: value, ...otrosFiltros} = parametros;
            setParametros(otrosFiltros);
        }
    }

    return {cargando, setFiltro, limpiarFiltro}
}

export const useGetPeluquero = (setterDatos) => {

    const [idPeluquero] = useState(sessionStorage.getItem('idPeluqueroAContratar'))
    const {cargando, setParametros} = useGet(`/peluquero/${idPeluquero}`, (datos) => setterDatos(datos));
    const {push} = useHistory();

    //Si no aplico el setParametros no se me setean los datos
    useEffect(() => {
        const idPeluqueroStorage = sessionStorage.getItem('idPeluqueroAContratar')
        idPeluqueroStorage === null ? push("/search"): setParametros({});
        // eslint-disable-next-line
    },[push])
    
    return {cargando}
}