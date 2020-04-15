import axios from "axios";

const MapsAPI = {
    getLocationByCoords: (coords) => axios.get("/maps/autocomplete/coords", {params: coords}),
    getLocationByAddress: (title) => axios.get("/maps/autocomplete/address", {params: title})
};

export default MapsAPI;