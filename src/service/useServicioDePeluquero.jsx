import useAPI from "./useAPI";
import {useHistory} from "react-router";

const useServicioDePeluquero = () => {
    const [{get}, {cargando}] = useAPI();
    let {push} = useHistory();

    const buscarPeluquero = (then) => {
        const ubicacion = {
            latitude: sessionStorage.getItem('userLocationLatitude'),
            longitude: sessionStorage.getItem('userLocationLongitude')
        }
        if (ubicacion) get('/peluquero/search', ubicacion, then);
        else push("/");
    }

    return [{buscarPeluquero, cargando}];
};

export default useServicioDePeluquero;