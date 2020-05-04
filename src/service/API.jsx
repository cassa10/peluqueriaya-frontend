import {useEffect, useState} from 'react';
import {useManejadorDeErrores} from "./ManejadorDeErrores";
import axios from 'axios';

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

    return {cargando, setParametros}
}

export const useGet = usarAPI((path, parametros) => axios.get(path, {params: parametros}));
export const usePost = usarAPI(axios.post);
export const usePut = usarAPI(axios.put);
export const useDelete = usarAPI(axios.delete);