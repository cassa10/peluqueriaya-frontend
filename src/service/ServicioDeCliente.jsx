import { usePostConAuth, useGetConAuth, usePutConAuth } from "./API";
import { useEffect } from "react";

export const usePostCliente = (fdatos) => {
  const { cargando, setParametros } = usePostConAuth("/cliente", fdatos);
  return { cargando, setCliente: setParametros };
};

export const useGetClienteLogeado = (setterDatos) => {
  const { cargando, setParametros } = useGetConAuth("/cliente", (datos) =>
    setterDatos(datos)
  );

  //Si no aplico el setParametros no se me setean los datos
  useEffect(() => {
    setParametros({});
    // eslint-disable-next-line
  }, []);

  const refrescarCliente = () => setParametros({});

  return { cargando, refrescarCliente };
};

export const usePutEditarCliente = (fdatos) => {
  const { setParametros, cargando } = usePutConAuth("/cliente", fdatos);
  return { cargando, setCliente: setParametros };
};
