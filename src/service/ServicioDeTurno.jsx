import {usePostConAuth} from "./API";

export const usePostPedirTurno = (setterResponseData) => {
    const {cargando, setParametros} = usePostConAuth("/turno/pedir", setterResponseData);

    return {cargandoPedirTurno: cargando, setParametros};
};