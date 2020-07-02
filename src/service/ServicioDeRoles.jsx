import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetConAuth } from "./API";
import { URI_LOGIN_CLIENTE, URI_LOGIN_PELUQUERO } from "../utils/constants";
import { useUser } from "../contexts/UserProvider";
import { useAuth0 } from "../contexts/Auth0Provider";

export const useGetPerfil = () => {
  const { setCliente, setPeluquero } = useUser();
  const { logout, isAuthenticated, loading } = useAuth0();
  const { pathname } = useLocation();
  const { cargando, setParametros } = useGetConAuth(
    "/perfil",
    async ({ peluquero, cliente }) => {
      setCliente(cliente);
      setPeluquero(peluquero);
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

  useEffect(() => {
    if (isAuthenticated && !loading) {
      setParametros({});
    }
  }, [isAuthenticated, loading, setParametros]);

  return { cargando };
};
