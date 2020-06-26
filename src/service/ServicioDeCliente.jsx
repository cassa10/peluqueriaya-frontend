import { usePostConAuth, usePutConAuth } from "./API";

export const usePostCliente = (fdatos) => {
  const { cargando, setParametros } = usePostConAuth({
    path: "/cliente",
    fdatos,
  });
  return { cargando, setCliente: setParametros };
};

export const usePutEditarCliente = (fdatos) => {
  const { setParametros, cargando } = usePutConAuth({
    path: "/cliente",
    fdatos,
  });
  return { cargando, setCliente: setParametros };
};
