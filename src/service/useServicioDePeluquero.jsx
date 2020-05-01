import useAPI from "./useAPI";
import {useHistory} from "react-router";
import {useState} from "react";

const useServicioDePeluquero = () => {
    const [{get: getPeluquerosCercanos}, {cargando: cargandoBP}] = useAPI();
    const [{get: getPeluquerosCercanosPorTipoDeServicio}, {cargando: cargandoBPPS}] = useAPI();
    const [{get: getPeluqueroCercanosPorNombreOTipo},{cargando: cargandoBPPNT}] = useAPI();
    const [ubicacion, setUbicacion] = useState();
    let {push} = useHistory();

    const buscarPeluquero = (then) => {
        const ubicacionLocal = {
            latitude: sessionStorage.getItem('userLocationLatitude'),
            longitude: sessionStorage.getItem('userLocationLongitude')
        }
        if (!(ubicacionLocal.latitude === null || ubicacionLocal.longitude === null)) {
            setUbicacion(ubicacionLocal);

            getPeluquerosCercanos('/peluquero/search', ubicacionLocal, then);
        } else {
            push("/");
        }
    }

    const buscarPeluquerosPorTipoDeServicio = (tipoDeServicio, then) => {
        getPeluquerosCercanosPorTipoDeServicio("/peluquero/search/servicio/tipo",
            {...ubicacion, tipoDeServicio}, then)
    }

    const buscarPeluquerosPorNombreOTipo = (nombreOTipo, then) => {
        getPeluqueroCercanosPorNombreOTipo("/peluquero/search/nombre-tipo",
        {...ubicacion, nombreOTipo}, then)
    }

    return [{buscarPeluquero, cargandoBP}, {buscarPeluquerosPorTipoDeServicio, cargandoBPPS}, {buscarPeluquerosPorNombreOTipo, cargandoBPPNT}];
};

export default useServicioDePeluquero;