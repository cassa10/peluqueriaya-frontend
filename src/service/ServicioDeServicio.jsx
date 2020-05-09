import {useGet} from "./API";

export const useGetTiposDeServicios = (fdatos) => {
    useGet("/servicio/tipos", (data) => fdatos([...data, {id:"BORRAR", nombre:"Borrar"}]),
        {});
}
