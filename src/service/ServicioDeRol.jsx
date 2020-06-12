import {useGetConAuth} from "./API";

export const useGetPerfil = fdatos => {
    const {cargando} = useGetConAuth("/perfil", fdatos, {})
    return {cargando}
};