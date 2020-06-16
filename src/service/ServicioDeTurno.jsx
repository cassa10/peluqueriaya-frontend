import { useGetConAuth, usePostConAuth } from "./API";
import { useEffect } from "react";

export const usePostPedirTurno = (setterResponseData) => {
  const { cargando, setParametros } = usePostConAuth(
    "/turno/pedir",
    setterResponseData
  );

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

  const { cargando, parametros, setParametros } = useGetConAuth(
    `/turno/peluquero`,
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

export const usePostConfirmarTurno = (setterResponseData) => {
  const { cargando, setParametros } = usePostConAuth(
    "/turno/confirmar",
    setterResponseData
  );

  const setIdTurnoInParamConfirmarTurno = (id) =>
    setParametros({ idTurno: id });

  return { cargandoConfirmarTurno: cargando, setIdTurnoInParamConfirmarTurno };
};

export const usePostFinalizarTurno = (setterResponseData) => {
  const { cargando, setParametros } = usePostConAuth(
    "/turno/finalizar",
    setterResponseData
  );

  const setIdTurnoInParamFinalizarTurno = (id) =>
    setParametros({ idTurno: id });

    return {cargandoFinalizarTurno: cargando, setIdTurnoInParamFinalizarTurno};
}

export const useGetTurnosCliente = (tamanioPagina, setterResponseData) => {
    

    const crearPaginacion = ({content, pageable,  totalPages}) => {
        setterResponseData((prevState) => ({
            ...prevState,
            turnos: content,
            actual: pageable.pageNumber+1,
            total: totalPages,
        }))
    }

    const {cargando, parametros, setParametros} = useGetConAuth(`/turno/cliente`,crearPaginacion);

    useEffect(() => {
        setParametros({size: tamanioPagina, sort: 'fechaInicio,asc'});
        // eslint-disable-next-line
    }, [])

    const setFiltro = (filtro) => setParametros((prevState) => ({...prevState, ...filtro}));

    const limpiarFiltro = (filtro) => {
        if (filtro in parametros) {
            // eslint-disable-next-line no-unused-vars
            const {[filtro]: value, ...otrosFiltros} = parametros;
            setParametros(otrosFiltros);
        }
    }
    
    return {cargandoTurnos: cargando, setFiltro, limpiarFiltro}
}

export const usePostCancelarTurno = (setterResponseData) => {
    const {cargando, setParametros} = usePostConAuth("/turno/cancelar", setterResponseData);

    const setIdTurnoInParamCancelarTurno = (id) => setParametros({idTurno: id});

    return {cargandoCancelarTurno: cargando, setIdTurnoInParamCancelarTurno};
}

export const usePostCalificarTurno = (setterResponseData) => {
  const {cargando, setParametros} = usePostConAuth("/turno/calificar", setterResponseData);

  const setIdTurnoYCalificacionInParamCalificarTurno = (id, puntuacion) => setParametros({idTurno: id, puntaje: puntuacion});

  return {cargandoCalificarTurno: cargando, setIdTurnoYCalificacionInParamCalificarTurno};
}

