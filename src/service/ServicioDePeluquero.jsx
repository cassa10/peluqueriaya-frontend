import {useGet} from "./API";
import {useEffect} from "react";
import {useHistory} from "react-router";

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