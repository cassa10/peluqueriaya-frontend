import {usePost} from "./API";

export const usePostPedirTurno = (body, setterResponseData) => {
    const {cargando} = usePost("/turno/pedir", setterResponseData, body);

    return {cargandoPedirTurno: cargando};
};