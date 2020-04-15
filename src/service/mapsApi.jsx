import axios from "axios";

const MapsAPI = {
    getLocationByCoords: (coords) => axios.get("/maps/autocomplete/coords", {params: coords}),
    getLocationByAddress: (title) => axios.get("/maps/autocomplete/address", {params: {query: title}})
};

export default MapsAPI;