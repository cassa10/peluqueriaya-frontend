import {useAPI} from "./APIProvider";


const useMapasServicio = ({setCargando}) => {
    const {get} = useAPI();

    const obtenerUbicacionConDireccion = (title, then) => {
        setCargando(true);
        return get("/mapas/geocodingggg", {direccion: title}, then, () => setCargando(false))
    }

    const obtenerUbicacionConCoords = (then) => {
        setCargando(true);
        return navigator.geolocation
            .getCurrentPosition(({coords: {latitude, longitude}}) => {
                get("/mapas/reversegeocoding", {latitude, longitude}, then, () => setCargando(false))
            })
    }

    return {obtenerUbicacionConCoords, obtenerUbicacionConDireccion}
};

export default useMapasServicio;