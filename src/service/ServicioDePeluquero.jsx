import {useGet, useGetConAuth, usePostConAuth} from "./API";
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
        else setParametros({...ubicacionLocal, size: tamanioPagina, sort: 'nombre,asc'});
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

    const {cargando, setParametros} = useGetConAuth('/peluquero', (datos) => setterDatos(datos));

    //Si no aplico el setParametros no se me setean los datos
    useEffect(() => {
        setParametros({});
        // eslint-disable-next-line
    },[])
    
    return {cargando}
}

export const usePostPeluquero = (fdatos) => {
    const {setParametros, cargando} = usePostConAuth("/peluquero", fdatos);

    const setPeluquero = ({ubicacion: {position}, ...resto}) => {
        const {lat: latitude, lng: longitude} = position;
        setParametros({ubicacion: {latitude, longitude}, ...resto});
    }

    return {cargando, setPeluquero}
}

export const usePostPeluqueroDesconectar = (fdatos) => {
    const {setParametros} = usePostConAuth("/peluquero/desconectar", fdatos);

    const desconectarPeluquero = () => setParametros({})
    
    return {desconectarPeluquero}
}

export const usePostPeluqueroConectar = (fdatos) => {
    const {setParametros} = usePostConAuth("/peluquero/conectar", fdatos);
    
    const conectarPeluquero = () => setParametros({})

    return {conectarPeluquero}
}