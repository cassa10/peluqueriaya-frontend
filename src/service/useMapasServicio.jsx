import {useAPI} from "./APIProvider";


const useMapasServicio = ({setCargando}) => {
    const {get} = useAPI();

    const obtenerUbicacionConDireccion = (title, then) => {
        setCargando(true);
        return get("/mapas/geocoding", {direccion: title}, () => setCargando(false)).then(then)
    }

    const obtenerUbicacionConCoords = (then) => {
        setCargando(true);
        return navigator.geolocation
            .getCurrentPosition(({coords: {latitude, longitude}}) => {
                get("/mapas/reversegeocoding", {latitude, longitude}, () => setCargando(false)).then(then)
            })
    }

    return {obtenerUbicacionConCoords, obtenerUbicacionConDireccion}
};

export default useMapasServicio;