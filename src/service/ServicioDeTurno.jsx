import {useGet} from "./API";
import {useEffect} from "react";
import {useHistory} from "react-router";
import {usePostConAuth} from "./API";

export const usePostPedirTurno = (setterResponseData) => {
    const {cargando, setParametros} = usePostConAuth("/turno/pedir", setterResponseData);

    return {cargandoPedirTurno: cargando, setParametros};
};

export const useGetTurnosPeluquero = (tamanioPagina, setterResponseData) => {
    
    const {push} = useHistory();

    const crearPaginacion = ({content, pageable,  totalPages}) => {
        setterResponseData((prevState) => ({
            ...prevState,
            turnos: content,
            actual: pageable.pageNumber+1,
            total: totalPages,
        }))
    }

    const {cargando, parametros, setParametros} = useGet(`/turno/peluquero/${localStorage.getItem('idPeluqueroLogeado')}`,crearPaginacion);

    useEffect(() => {
        const idPeluqueroStorage = localStorage.getItem('idPeluqueroLogeado');
        idPeluqueroStorage === null ? push("/"): setParametros({size: tamanioPagina, sort: 'fechaInicio,asc'});
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
    
    return {cargandoTurnos: cargando, setFiltro, limpiarFiltro}
}