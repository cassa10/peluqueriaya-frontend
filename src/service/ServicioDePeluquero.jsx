import { useGet, usePostConAuth, usePutConAuth } from "./API";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const useGetPeluqueros = (tamanioPagina, fDatos) => {
  const crearPaginacion = ({ content, pageable, totalPages }) => {
    fDatos((prevState) => ({
      ...prevState,
      peluqueros: content,
      actual: pageable.pageNumber + 1,
      total: totalPages,
    }));
  };
  const { cargando, parametros, setParametros } = useGet(
    "/peluquero/search",
    crearPaginacion
  );
  const { push } = useHistory();

  useEffect(() => {
    const ubicacion = JSON.parse(sessionStorage.getItem("ubicacion"));
    if (ubicacion) {
      setParametros({
        ...ubicacion,
        size: tamanioPagina,
        sort: "nombre,asc",
      });
    } else {
      push("/");
    }
    // eslint-disable-next-line
  }, []);

  const setFiltro = (filtro) =>
    setParametros((prevState) => ({ ...prevState, ...filtro }));

  const limpiarFiltro = (filtro) => {
    if (filtro in parametros) {
      // eslint-disable-next-line no-unused-vars
      const { [filtro]: value, ...otrosFiltros } = parametros;
      setParametros(otrosFiltros);
    }
  };

  return { cargando, setFiltro, limpiarFiltro };
};

export const useGetPeluqueroAContratar = (fdatos) => {
  const { cargando, setParametros } = useGet({
    path: `/peluquero/${sessionStorage.getItem("idPeluqueroAContratar")}`,
    fdatos,
  });
  const { push } = useHistory();

  //Si no aplico el setParametros no se me setean los datos
  useEffect(() => {
    const idPeluqueroStorage = sessionStorage.getItem("idPeluqueroAContratar");
    idPeluqueroStorage === null ? push("/search") : setParametros({});
    // eslint-disable-next-line
  }, [push]);

  return { cargando };
};

export const usePostPeluquero = (fdatos) => {
  const { setParametros, cargando } = usePostConAuth({
    path: "/peluquero",
    fdatos,
  });
  return { cargando, setPeluquero: setParametros };
};

export const usePutEditarPeluquero = (fdatos) => {
  const fdatosAPeluquero = ({
    id,
    logo,
    nombre,
    corteMin,
    distanciaMax,
    emailOpcional,
    ubicacion,
    estado,
    descripcion,
    tipos,
    estaDesconectado,
    estaDisponible,
    puntuacion,
  }) => {
    fdatos({
      id,
      logo,
      nombre,
      corteMin,
      distanciaMax,
      emailOpcional,
      ubicacion,
      estado,
      descripcion,
      tipos,
      estaDesconectado,
      estaDisponible,
      puntuacion,
    });
  };
  const { setParametros, cargando } = usePutConAuth({
    path: "/peluquero",
    fdatos: fdatosAPeluquero,
  });
  return { cargando, setPeluquero: setParametros };
};

export const usePostPeluqueroDesconectar = (fdatos) => {
  const { setParametros } = usePostConAuth({
    path: "/peluquero/desconectar",
    fdatos: fdatos,
  });
  const desconectarPeluquero = () => setParametros({});
  return { desconectarPeluquero };
};

export const usePostPeluqueroConectar = (fdatos) => {
  const { setParametros } = usePostConAuth({
    path: "/peluquero/conectar",
    fdatos: fdatos,
  });
  const conectarPeluquero = () => setParametros({});
  return { conectarPeluquero };
};
