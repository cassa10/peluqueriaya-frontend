import useAPI from "./useAPI";

const useServicioDeServicio = () => {
    const [{get: getTiposDeServicio}, {cargandoTDS}] = useAPI();

    const obtenerTiposDeServicio = (then) => {
        getTiposDeServicio("/servicio/tipos",{}, then)
    }

    return [{obtenerTiposDeServicio, cargandoTDS}];
};

export default useServicioDeServicio;