import API from "./api";

const MapasAPI = {
    obtenerUbicacionConDireccion: (title, then, final) =>
        API.get("/mapas/geocoding", {direccion: title})
            .then(then)
            .catch((error) => console.log(error))
            .finally(final),
    obtenerUbicacionConCoords: (then, final) =>
        navigator.geolocation
            .getCurrentPosition(({coords: {latitude, longitude}}) => {
                API.get("/mapas/reversegeocoding", {latitude, longitude})
                    .then(then)
                    .catch((error) => console.log(error))
                    .finally(final)
            })
}

export default MapasAPI;