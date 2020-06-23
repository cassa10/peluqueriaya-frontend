import {usePostConAuth, useGetConAuth} from "./API";
import {useEffect} from "react";

export const usePostCliente = (fdatos) => {
  const { cargando, setParametros } = usePostConAuth("/cliente", fdatos);

  const setCliente = ({ ubicacion: { position }, ...resto }) => {
    const { lat: latitude, lng: longitude } = position;
    setParametros({ ubicacion: { latitude, longitude }, ...resto });
  };

  return { cargando, setCliente };
};

export const useGetClienteLogeado = (setterDatos) => {
    const {cargando, setParametros} = useGetConAuth('/cliente', (datos) => setterDatos(datos));

    //Si no aplico el setParametros no se me setean los datos
    useEffect(() => {
        setParametros({});
        // eslint-disable-next-line
    },[])

    const refrescarCliente = () => setParametros({})
    
    return {cargando, refrescarCliente}
}


export const usePostEditarDatosCliente = (fdatos) => {
  const { setParametros, cargando } = usePostConAuth("/cliente/editar", fdatos);

  const setCliente = (datos) => setParametros(datos);

  return { cargando, setCliente };
};