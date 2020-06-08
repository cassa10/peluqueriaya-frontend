import {useEffect, useState} from 'react';
import {useErrorAPI} from "../contexts/errors/ErrorAPIProvider";
import axios from 'axios';
import {useUser} from "../contexts/UserProvider";

// eslint-disable-next-line no-undef
const server = process.env.REACT_APP_APIBACKEND || 'http://localhost:8080';

const usarAPI = (metodo) => (path, fDatos = () => {}, parametrosIniciales = null) => {
    const [parametros, setParametros] = useState(parametrosIniciales);
    const [cargando, setCargando] = useState(false);
    const {setError} = useErrorAPI();
    const {getTokenSilently} = useUser();

    useEffect(() => {
        let cancelar = false;
        const llamarAPI = async () => {
            if (parametros !== null) {
                setCargando(true);
                try {
                    const {data} = await metodo(`${server}${path}`, {parametros, getTokenSilently});
                    if (!cancelar) {
                        setCargando(false);
                        fDatos(data);
                    }
                }
                catch (e) {
                    if (!cancelar) {
                        setCargando(false);
                        setError(e);
                    }
                }
            }
        }
        llamarAPI();
        return () => {
            cancelar = true;
        };
        // eslint-disable-next-line
    }, [parametros])

    return {cargando, parametros, setParametros}
}

export const useGet = usarAPI((path, {parametros}) => {
    const params = new URLSearchParams();
    Object.entries(parametros).forEach(([name, value]) => {
        if (Array.isArray(value)) value.forEach((valueDeValue) => params.append(name, valueDeValue));
        else params.append(name, value);
    });
    return axios.get(path, {params: params});
});
export const usePost = usarAPI((path, {parametros}) => axios.post(path, parametros));
export const usePut = usarAPI((path, {parametros}) => axios.put(path, parametros));
export const useDelete = usarAPI((path, {parametros}) => axios.delete(path, {params: parametros}));


const headers = (token) => ({ headers: {Authorization: `Bearer ${token}`}});

export const useGetConAuth = usarAPI(async(path, {parametros, getTokenSilently}) => {
    return axios.get(path, {params: parametros , ...headers(await getTokenSilently())})
});
export const usePostConAuth = usarAPI(async(path, {parametros, getTokenSilently}) => {
    return axios.post(path, parametros , headers(await getTokenSilently()))
});
export const usePutConAuth = usarAPI(async(path, {parametros, getTokenSilently}) => {
    return axios.put(path, parametros , headers(await getTokenSilently()))
});
export const useDeleteConAuth = usarAPI(async(path, {parametros, getTokenSilently}) => {
    return axios.delete(path, {params: parametros , ...headers(await getTokenSilently())})
});