import {usePostConAuth} from "./API";

export const usePostCliente = (fdatos) => {
    const {cargando, setParametros} = usePostConAuth("/cliente", fdatos);

    const setCliente = ({ubicacion: {position}, ...resto}) => {
        const {lat: latitude, lng: longitude} = position;
        setParametros({ubicacion: {latitude, longitude}, ...resto});
    }

    return {cargando, setCliente}
};
