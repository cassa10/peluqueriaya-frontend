import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
  useMemo,
} from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import PropTypes from "prop-types";
import axios from "axios";
import {
  CLIENTE,
  PELUQUERO,
  VISITANTE,
  REGISTRADO,
  URI_CASA,
  URI_LOGIN_CLIENTE,
  URI_LOGIN_PELUQUERO,
  PENDIENTE,
} from "../utils/constants";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const rolesIniciales = {
  [CLIENTE]: VISITANTE,
  [PELUQUERO]: VISITANTE,
};

const UserProvider = ({ history, children, ...initOptions }) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState(rolesIniciales);

  const onRedirectCallback = (appState) => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  };

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);
      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }
      const isAuthenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthenticated);
      if (isAuthenticated) {
        const { email } = await auth0FromHook.getUser();
        const token = await auth0FromHook.getTokenSilently();
        try {
          const { data } = await axios.get("http://localhost:8080/perfil", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { peluquero, cliente } = data;
          setRoles({
            [CLIENTE]: cliente ? REGISTRADO : VISITANTE,
            [PELUQUERO]: peluquero ? REGISTRADO : VISITANTE,
          });
          setUser({ email, peluquero, cliente });
        } catch {
          setRoles({
            [CLIENTE]: VISITANTE,
            [PELUQUERO]: VISITANTE,
          });
        } finally {
          setLoading(false);
        }
      }
      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const rolesHandler = {
    [CLIENTE]: {
      uri_login: URI_LOGIN_CLIENTE,
      noEstaRegistradoEnOtroRol: () => roles[PELUQUERO] !== REGISTRADO,
    },
    [PELUQUERO]: {
      uri_login: URI_LOGIN_PELUQUERO,
      noEstaRegistradoEnOtroRol: () => roles[CLIENTE] !== REGISTRADO,
    },
  };

  const login = async (rol) => {
    if (rolesHandler[rol].noEstaRegistradoEnOtroRol()) {
      await auth0Client.loginWithRedirect({
        appState: { targetUrl: rolesHandler[rol].uri_login },
      });
    } else {
      history.push(rolesHandler[rol].uri_login);
    }
  };

  const logout = () => auth0Client.logout({ returnTo: URI_CASA });

  const empezarRegistro = (rol) => {
    if (roles[rol] === VISITANTE) {
      setRoles((prevState) => ({ ...prevState, [rol]: PENDIENTE }));
    }
  };

  const abandonarRegistro = useCallback(
    (rol) => {
      if (roles[rol] === PENDIENTE) {
        setRoles((prevState) => ({ ...prevState, [rol]: VISITANTE }));
        if (rolesHandler[rol].noEstaRegistradoEnOtroRol()) logout();
      }
    }, // eslint-disable-next-line
    [roles]
  );

  const registrar = (rol) =>
    setRoles((prevState) => ({ ...prevState, [rol]: REGISTRADO }));

  const contextPayload = useMemo(() => ({ setError }), [setError]);

  return (
    <UserContext.Provider
      value={{
        error,
        ...contextPayload,
        user,
        setUser,
        loading,
        roles,
        setRoles,
        login,
        logout,
        empezarRegistro,
        abandonarRegistro,
        isAuthenticated,
        registrar,
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default UserProvider;
