import useAPI from "./useAPI";


const useServicioDeMapas = () => {
    const [{get: getUDC}, {cargando: cargandoUDC}] = useAPI();
    const [{get: getUDD}, {cargando: cargandoUDD}] = useAPI();

    const ubicacionDandoCoords = (then) => {
        navigator.geolocation
            .getCurrentPosition(({coords: {latitude, longitude}}) =>
                getUDC("/mapas/reversegeocoding", {latitude, longitude},
                    ({items}) => then(items[0])));
    }

    const ubicacionDandoDireccion = (title, then) => {
        getUDD("/mapas/geocoding", {direccion: title}, (({items}) => then(items)));
    }

    return [{ubicacionDandoCoords, cargandoUDC}, {ubicacionDandoDireccion, cargandoUDD}];
}

export default useServicioDeMapas;