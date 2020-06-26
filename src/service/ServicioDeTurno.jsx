import { useGetConAuth, usePostConAuth } from "./API";
import { useEffect } from "react";

export const usePostPedirTurno = (fdatos) => {
  const { cargando, setParametros } = usePostConAuth({
    path: "/turno/pedir",
    fdatos,
  });

  return { cargandoPedirTurno: cargando, setParametros };
};

export const useGetTurnosPeluquero = (tamanioPagina, setterResponseData) => {
  const crearPaginacion = ({ content, pageable, totalPages }) => {
    setterResponseData((prevState) => ({
      ...prevState,
      turnos: content,
      actual: pageable.pageNumber + 1,
      total: totalPages,
    }));
  };

  const { cargando, parametros, setParametros } = useGetConAuth({
    path: `/turno/peluquero`,
    fdatos: crearPaginacion,
  });

  useEffect(() => {
    setParametros({ size: tamanioPagina, sort: "fechaInicio,asc" });
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

  return { cargandoTurnos: cargando, setFiltro, limpiarFiltro };
};

export const usePostConfirmarTurno = (fdatos) => {
  const { cargando, setParametros } = usePostConAuth({
    path: "/turno/confirmar",
    fdatos,
  });

  const setIdTurnoInParamConfirmarTurno = (id) =>
    setParametros({ idTurno: id });

  return { cargandoConfirmarTurno: cargando, setIdTurnoInParamConfirmarTurno };
};

export const usePostFinalizarTurno = (fdatos) => {
  const { cargando, setParametros } = usePostConAuth({
    path: "/turno/finalizar",
    fdatos,
  });

  const setIdTurnoInParamFinalizarTurno = (id) =>
    setParametros({ idTurno: id });

  return { cargandoFinalizarTurno: cargando, setIdTurnoInParamFinalizarTurno };
};

export const useGetTurnosCliente = (tamanioPagina, setterResponseData) => {
  const crearPaginacion = ({ content, pageable, totalPages }) => {
    setterResponseData((prevState) => ({
      ...prevState,
      turnos: content,
      actual: pageable.pageNumber + 1,
      total: totalPages,
    }));
  };

  const { cargando, parametros, setParametros } = useGetConAuth({
    path: `/turno/cliente`,
    fdatos: crearPaginacion,
  });

  useEffect(() => {
    setParametros({ size: tamanioPagina, sort: "fechaInicio,asc" });
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

  return { cargandoTurnos: cargando, setFiltro, limpiarFiltro };
};

export const usePostCancelarTurno = (fdatos) => {
  const { cargando, setParametros } = usePostConAuth({
    path: "/turno/cancelar",
    fdatos,
  });

  const setIdTurnoInParamCancelarTurno = (id) => setParametros({ idTurno: id });

  return { cargandoCancelarTurno: cargando, setIdTurnoInParamCancelarTurno };
};

export const usePostCalificarTurno = (fdatos) => {
  const { cargando, setParametros } = usePostConAuth({
    path: "/turno/calificar",
    fdatos,
  });

  const setIdTurnoYCalificacionInParamCalificarTurno = (id, puntuacion) =>
    setParametros({ idTurno: id, puntaje: puntuacion });

  return {
    cargandoCalificarTurno: cargando,
    setIdTurnoYCalificacionInParamCalificarTurno,
  };
};
