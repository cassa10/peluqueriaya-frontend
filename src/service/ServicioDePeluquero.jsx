import {useGet} from "./API";
import {useEffect} from "react";
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
        else setParametros({...ubicacionLocal, size: tamanioPagina, sort: 'nombre,desc'});
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

export const useGetPeluqueroAContratar = (setterDatos) => {

    const {cargando, setParametros} = useGet(`/peluquero/${sessionStorage.getItem('idPeluqueroAContratar')}`, (datos) => setterDatos(datos));
    const {push} = useHistory();

    //Si no aplico el setParametros no se me setean los datos
    useEffect(() => {
        const idPeluqueroStorage = sessionStorage.getItem('idPeluqueroAContratar')
        idPeluqueroStorage === null ? push("/search"): setParametros({});
        // eslint-disable-next-line
    },[push])
    
    return {cargando}
}

export const useGetPeluqueroLogeado = (setterDatos) => {

    const {cargando, setParametros} = useGet(`/peluquero/${localStorage.getItem('idPeluqueroLogeado')}`, (datos) => setterDatos(datos));
    const {push} = useHistory();

    //Si no aplico el setParametros no se me setean los datos
    useEffect(() => {
        const idPeluqueroStorage = localStorage.getItem('idPeluqueroLogeado')
        idPeluqueroStorage === null ? push("/"): setParametros({});
        // eslint-disable-next-line
    },[push])
    
    return {cargando}
}