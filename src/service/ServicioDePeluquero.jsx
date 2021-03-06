import { useGet, usePostConAuth, usePutConAuth } from "./API";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import Swal from "sweetalert2";

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

  const setFiltroConPrimerPagina = (filtro) =>
    setParametros((prevState) => ({ ...prevState, ...filtro, page: 0 }));

  const limpiarFiltro = (filtro) => {
    if (filtro in parametros) {
      // eslint-disable-next-line no-unused-vars
      const { [filtro]: value, ...otrosFiltros } = parametros;
      setParametros({ ...otrosFiltros, page: 0 });
    }
  };

  return { cargando, setFiltro, limpiarFiltro, setFiltroConPrimerPagina };
};

export const useGetPeluqueroAContratar = (setterDatos) => {
  const {
    cargando,
    setParametros,
  } = useGet(
    `/peluquero/${sessionStorage.getItem("idPeluqueroAContratar")}`,
    (datos) => setterDatos(datos)
  );
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
  const { setParametros, cargando } = usePostConAuth("/peluquero", fdatos);
  return { cargando, setPeluqueroCreado: setParametros };
};

export const usePutEditarPeluquero = (fdatos) => {
  const fdatosAPeluquero = ({ puntuacion, ...peluqueroEditado }) => {
    fdatos(peluqueroEditado);
  };
  const { setParametros, cargando } = usePutConAuth(
    "/peluquero",
    fdatosAPeluquero
  );
  return { cargando, setPeluqueroAEditar: setParametros };
};

export const usePostDisponibilidad = () => {
  const { disponibilidad, setDisponibilidad, setPeluquero } = useUser();
  const { setParametros: setDesconectar } = usePostConAuth(
    "/peluquero/desconectar",
    () => {
      setPeluquero((prevState) => ({
        ...prevState,
        estaDesconectado: true,
        estaDisponible: false,
      }));
    }
  );
  const { setParametros: setConectar } = usePostConAuth(
    "/peluquero/conectar",
    () => {
      setPeluquero((prevState) => ({
        ...prevState,
        estaDesconectado: false,
        estaDisponible: true,
      }));
    }
  );

  useEffect(() => {
    const cambiarDisponibilidad = async () => {
      if (disponibilidad === "Desconectado") {
        const { value } = await Swal.fire({
          title: "¿Estás a un paso de abrir la peluqueria?",
          html:
            "Al aceptar, aparecerás en la búsquedas y podrás recibir turnos",
          showCancelButton: true,
          cancelButtonColor: "Red",
          confirmButtonColor: "Green",
          cancelButtonText: "Cancelar",
          confirmButtonText: "De acuerdo",
          reverseButtons: true,
        });
        if (value) setConectar({});
      }
      if (disponibilidad === "Disponible") {
        const { value } = await Swal.fire({
          title: "¿Estás seguro?",
          html:
            "Si cerras la peluqueria, dejarás de aparecer en las búsquedas. Además, todos los turnos pendientes y en espera se cancelarán!",
          showCancelButton: true,
          cancelButtonColor: "Red",
          confirmButtonColor: "Green",
          cancelButtonText: "Cancelar",
          confirmButtonText: "De acuerdo",
          reverseButtons: true,
        });
        if (value) setDesconectar({});
      }
      if (
        disponibilidad === "Desconectado" ||
        disponibilidad === "Disponible"
      ) {
        setDisponibilidad(null);
      }
    };
    cambiarDisponibilidad();
  }, [disponibilidad, setConectar, setDesconectar, setDisponibilidad]);
};
