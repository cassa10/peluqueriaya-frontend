import {useGet} from "./API";

export const useGetTiposDeServicios = (fdatos) => {
    useGet("/servicio/tipos", (data) => fdatos([{id:"BORRAR", nombre:"Todos"}, ...data]),
        {});
}
