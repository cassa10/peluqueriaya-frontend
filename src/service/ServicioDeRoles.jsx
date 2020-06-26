import { useGetConAuth } from "./API";
import { useCallback } from "react";

export const useGetPerfil = (fdatos) => {
  const { cargando, setParametros } = useGetConAuth({
    path: "/perfil",
    fdatos,
    cargandoInicial: true,
  });

  const fetchPerfil = useCallback(() => {
    setParametros({});
  }, [setParametros]);

  return { cargando, fetchPerfil };
};
