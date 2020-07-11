import { usePostConAuth, usePutConAuth } from "./API";

export const usePostCliente = (fdatos) => {
  const { cargando, setParametros } = usePostConAuth("/cliente", fdatos);
  return { cargando, setClienteCreado: setParametros };
};

export const usePutEditarCliente = (fdatos) => {
  const { setParametros, cargando } = usePutConAuth("/cliente", fdatos);
  return { cargando, setClienteAEditar: setParametros };
};
