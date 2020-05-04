import {useGet} from "./API";

export const useGetPeluquerosCercanos = (fDatos, ubicacion) => {
    const {cargando: cargandoPC} = useGet("/peluquero/search", fDatos, ubicacion);
    const {cargando: cargandoPCPS, setParametros} = useGet("/peluquero/search/servicio/tipo", fDatos);

    const setTipoDeServicio = (tipoDeServicio) => {
        setParametros({...ubicacion, tipoDeServicio})
    }
    return [{cargandoPC}, {cargandoPCPS, setTipoDeServicio}]
}