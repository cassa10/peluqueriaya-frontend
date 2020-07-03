import { useGetConAuth, usePostConAuth } from "./API";
import { useEffect } from "react";
import { useUser } from "../contexts/UserProvider";

export const usePostPedirTurno = (fdatos) => {
  const { cargando, setParametros } = usePostConAuth("/turno/pedir", fdatos);

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

  const {
    cargando,
    parametros,
    setParametros,
  } = useGetConAuth(`/turno/peluquero`, crearPaginacion, {
    size: tamanioPagina,
    sort: "fechaInicio,asc",
  });
  const { peluquero } = useUser();

  useEffect(() => {
    if (peluquero && peluquero.estaDisponible) {
      setParametros({ size: tamanioPagina, sort: "fechaInicio,asc" });
    }
    // eslint-disable-next-line
  }, [peluquero, setParametros]);

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

export const usePostConfirmarTurno = (setterResponseData) => {
  const { setPeluquero } = useUser();
  const { cargando, setParametros } = usePostConAuth(
    "/turno/confirmar",
    (datos) => {
      setPeluquero((prevState) => ({ ...prevState, estaDisponible: false }));
      setterResponseData(datos);
    }
  );

  const setIdTurnoInParamConfirmarTurno = (id) =>
    setParametros({ idTurno: id });

  return { cargandoConfirmarTurno: cargando, setIdTurnoInParamConfirmarTurno };
};

export const usePostFinalizarTurno = (setterResponseData) => {
  const { setPeluquero } = useUser();
  const { cargando, setParametros } = usePostConAuth(
    "/turno/finalizar",
    (estaDisponible) => {
      setPeluquero((prevState) => ({ ...prevState, estaDisponible }));
      setterResponseData();
    }
  );

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

  const { cargando, parametros, setParametros } = useGetConAuth(
    `/turno/cliente`,
    crearPaginacion
  );

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

export const usePostCancelarTurno = (setterResponseData) => {
  const { cargando, setParametros } = usePostConAuth(
    "/turno/cancelar",
    setterResponseData
  );

  const setIdTurnoInParamCancelarTurno = (id) => setParametros({ idTurno: id });

  return { cargandoCancelarTurno: cargando, setIdTurnoInParamCancelarTurno };
};

export const usePostCalificarTurno = (setterResponseData) => {
  const { cargando, setParametros } = usePostConAuth(
    "/turno/calificar",
    setterResponseData
  );

  const setIdTurnoYCalificacionInParamCalificarTurno = (id, puntuacion) =>
    setParametros({ idTurno: id, puntaje: puntuacion });

  return {
    cargandoCalificarTurno: cargando,
    setIdTurnoYCalificacionInParamCalificarTurno,
  };
};
