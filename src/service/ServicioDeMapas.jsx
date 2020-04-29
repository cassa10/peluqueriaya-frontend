import useAPI from "./useAPI";


export const useUbicacionDandoCoords = (then) => {
    const [{get}, {cargando: cargandoUDC}] = useAPI();

    const ubicacionDandoCoords = () => {
        navigator.geolocation
            .getCurrentPosition(({coords: {latitude, longitude}}) =>
                get("/mapas/reversegeocodingg", {latitude, longitude},
                    ({items}) => then(items[0])));
    }

    return [ubicacionDandoCoords, cargandoUDC];
}

export const useUbicacionDandoDireccion = (then) => {
    const [{get}, {cargando: cargandoUDD}] = useAPI();

    const ubicacionDandoDireccion = (title) => {
        get("/mapas/geocoding", {direccion: title}, (({items}) => then(items)));
    }

    return [ubicacionDandoDireccion, cargandoUDD]
}