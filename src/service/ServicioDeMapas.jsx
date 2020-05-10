import {useGet} from "./API";

export const useGetUbicacionConCoords = (fDatos) => {
    const {cargando, setParametros} = useGet("/mapas/reversegeocoding",
        ({items}) => fDatos(items[0]));

    const setCoordenadas = () => {
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {
                setParametros({latitude, longitude});
            });
    }

    return {cargandoUDC: cargando, setCoordenadas};
};

export const useGetUbicacionConDireccion = (fDatos) => {
    const {cargando, setParametros} = useGet("/mapas/geocoding",
        (({items}) => fDatos(items)));

    const setDireccion = (title) => {
        setParametros({direccion: title});
    }

    return {cargandoUDD: cargando, setDireccion}
};
