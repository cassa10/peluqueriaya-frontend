import {useGet} from "./API";
import {useEffect} from "react";
import {useHistory} from "react-router";

export const useGetPeluqueros = (fDatos) => {
    const {cargando, parametros, setParametros} = useGet("/peluquero/search",
        ({content}) => fDatos(content));
    const {push} = useHistory();

    useEffect(() => {
        const ubicacionLocal = {
            latitude: sessionStorage.getItem('userLocationLatitude'),
            longitude: sessionStorage.getItem('userLocationLongitude')
        }
        if (ubicacionLocal.latitude === null || ubicacionLocal.longitude === null) push("/");
        else setParametros(ubicacionLocal);
        // eslint-disable-next-line
    }, [])

    const setFiltroDeBusqueda = (filtro) => {
        Object.entries(filtro).forEach(([tipo, valor]) => {
            if (valor !== null || parametros[tipo] !== null) {
                setParametros((prevState) => ({...prevState, ...filtro}))
            }
        });
    }
    return {cargando, setFiltroDeBusqueda}
}