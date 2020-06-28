import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useGetConAuth } from "./API";
import {
  CLIENTE,
  PELUQUERO,
  REGISTRADO,
  URI_LOGIN_CLIENTE,
  URI_LOGIN_PELUQUERO,
  VISITANTE,
} from "../utils/constants";
import { useUser } from "../contexts/UserProvider";
import { useAuth0 } from "../contexts/Auth0Provider";

export const useGetPerfil = () => {
  const { setPerfil, setRoles } = useUser();
  const { logout, email } = useAuth0();
  const { pathname } = useLocation();
  const { cargando, setParametros } = useGetConAuth(
    "/perfil",
    async ({ peluquero, cliente }) => {
      setPerfil({ email, peluquero, cliente });
      setRoles({
        [CLIENTE]: cliente ? REGISTRADO : VISITANTE,
        [PELUQUERO]: peluquero ? REGISTRADO : VISITANTE,
      });
      if (
        !cliente &&
        !peluquero &&
        pathname !== URI_LOGIN_CLIENTE &&
        pathname !== URI_LOGIN_PELUQUERO
      ) {
        await logout();
      }
    }
  );

  const fetchPerfil = useCallback(() => {
    setParametros({});
  }, [setParametros]);

  return { cargando, fetchPerfil };
};
