import {usePost} from "./API";

export const usePostPedirTurno = (setterResponseData) => {
    const {cargando, setParametros} = usePost("/turno/pedir", setterResponseData);

    return {cargandoPedirTurno: cargando, setParametros};
};