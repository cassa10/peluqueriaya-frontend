import {useState} from 'react';
import axios from 'axios';
import {useManejadorDeAPIErrores} from "./ManejadorDeAPIErrores";

const server = process.env.REACT_APP_APIBACKEND || 'http://localhost:8080';

const useAPI = () => {
    const [cargando, setCargando] = useState(false);
    const {setError} = useManejadorDeAPIErrores();

    const request = (request) => async (path, body, then) => {
        setCargando(true);
        try {
            const {data} = await request(`${server}${path}`, body);
            then(data);
            setCargando(false);
        }
        catch (e) {
            setCargando(false);
            setError(e);
        }
    }

    const get = (path, body, then) => request(axios.get)(path, {params: body}, then) ;

    const post = request(axios.post);

    const put = request(axios.put);

    const del = request(axios.delete);

    return [{get, post,  put, del}, {cargando}];
};

export default useAPI;