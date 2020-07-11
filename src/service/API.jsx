import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "../contexts/Auth0Provider";
import { useError } from "../contexts/ErrorAPIProvider";

// eslint-disable-next-line no-undef
const server = process.env.REACT_APP_APIBACKEND || "http://localhost:8080";

const usarAPI = (metodo) => (
  path,
  fdatos = () => {},
  parametrosIniciales = null
) => {
  const [parametros, setParametros] = useState(parametrosIniciales);
  const [cargando, setCargando] = useState(false);
  const { setError } = useError();
  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    let cancelar = false;
    const llamarAPI = async () => {
      if (parametros !== null) {
        setCargando(true);
        try {
          const { data } = await metodo(`${server}${path}`, {
            parametros,
            getTokenSilently,
          });
          if (!cancelar) {
            setCargando(false);
            fdatos(data);
          }
        } catch (e) {
          if (!cancelar) {
            setCargando(false);
            setError(e);
          }
        }
      }
    };
    llamarAPI();
    return () => {
      cancelar = true;
    };
    // eslint-disable-next-line
  }, [parametros]);

  return { cargando, parametros, setParametros };
};

export const useGet = usarAPI((path, { parametros }) => {
  const params = new URLSearchParams();
  Object.entries(parametros).forEach(([name, value]) => {
    if (Array.isArray(value))
      value.forEach((valueDeValue) => params.append(name, valueDeValue));
    else params.append(name, value);
  });
  return axios.get(path, { params: params });
});

const headers = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const useGetConAuth = usarAPI(
  async (path, { parametros, getTokenSilently }) => {
    return axios.get(path, {
      params: parametros,
      ...headers(await getTokenSilently()),
    });
  }
);
export const usePostConAuth = usarAPI(
  async (path, { parametros, getTokenSilently }) => {
    return axios.post(path, parametros, headers(await getTokenSilently()));
  }
);
export const usePutConAuth = usarAPI(
  async (path, { parametros, getTokenSilently }) => {
    return axios.put(path, parametros, headers(await getTokenSilently()));
  }
);
export const useDeleteConAuth = usarAPI(
  async (path, { parametros, getTokenSilently }) => {
    return axios.delete(path, {
      params: parametros,
      ...headers(await getTokenSilently()),
    });
  }
);
