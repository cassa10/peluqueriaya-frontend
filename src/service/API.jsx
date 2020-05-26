import {useEffect, useState} from 'react';
import {useManejadorDeErrores} from "../contexts/errors/ManejadorDeErrores";
import axios from 'axios';

// eslint-disable-next-line no-undef
const server = process.env.REACT_APP_APIBACKEND || 'http://localhost:8080';

const usarAPI = (metodo) => (path, fDatos = () => {}, parametrosIniciales = null) => {
    const [parametros, setParametros] = useState(parametrosIniciales);
    const [cargando, setCargando] = useState(false);
    const {setError} = useManejadorDeErrores();

    useEffect(() => {
        let cancelar = false;
        const llamarAPI = async () => {
            if (parametros !== null) {
                setCargando(true);
                try {
                    const {data} = await metodo(`${server}${path}`, parametros);
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

export const useGet = usarAPI((path, parametros) => {
    const params = new URLSearchParams();
    Object.entries(parametros).forEach(([name, value]) => {
        if (Array.isArray(value)) value.forEach((valueDeValue) => params.append(name, valueDeValue));
        else params.append(name, value);
    });
    return axios.get(path, {params: params});
});

export const usePost = usarAPI(axios.post);
export const usePut = usarAPI(axios.put);
export const useDelete = usarAPI(axios.delete);