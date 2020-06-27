import { useGetConAuth } from "./API";
import { useCallback } from "react";

export const useGetPerfil = (fdatos) => {
  const { cargando, setParametros } = useGetConAuth("/perfil", fdatos);

  const fetchPerfil = useCallback(() => {
    setParametros({});
  }, [setParametros]);

  return { cargando, fetchPerfil };
};
