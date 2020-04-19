import axios from "axios";

const MapasAPI = {
    obtenerUbicacionConDireccion: (title) => axios.get("/mapas/geocoding",
        {params: {direccion: title}}),
    obtenerDireccionConCoords: (latitude, longitude) => axios.get("/mapas/reversegeocoding",
        {params: {latitude, longitude}})
};

export default MapasAPI;