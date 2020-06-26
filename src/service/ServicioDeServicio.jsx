import { useDeleteConAuth, useGet, useGetConAuth, usePostConAuth } from "./API";
import intersectionWith from "lodash/intersectionWith";
import map from "lodash/map";

export const useGetTiposDeServicios = (fdatos) => {
  useGet({ path: "/servicio/tipos", fdatos: fdatos, parametrosIniciales: {} });
};

export const usePostServicio = (fdatos) => {
  const { cargando, setParametros } = usePostConAuth({
    path: "/servicio",
    fdatos: fdatos,
  });

  const setServicio = ({ opcionesTipos, tipos, ...rest }) => {
    const tiposDto = map(
      intersectionWith(
        opcionesTipos,
        tipos,
        ({ nombre }, othVal) => nombre === othVal
      ),
      "id"
    );
    setParametros({ tipos: tiposDto, ...rest });
  };

  return { cargando, setServicio };
};

export const useGetServicios = (fdatos) => {
  const setServicios = (serviciosDTO) => {
    const servicios = serviciosDTO.map(
      ({ nombre, precio, tipos: tiposDTO, id }) => {
        const tipos = map(tiposDTO, "nombre");
        return { nombre, precio, tipos, id };
      }
    );
    fdatos(servicios);
  };
  const { cargando } = useGetConAuth({
    path: "/peluquero/servicios",
    fdatos: setServicios,
    parametrosIniciales: {},
  });
  return { cargando };
};

export const useDeleteServicio = (fdatos) => {
  const { cargando, setParametros } = useDeleteConAuth({
    path: "/servicio",
    fdatos: fdatos,
  });
  return { cargandoBorrado: cargando, setServicioABorrar: setParametros };
};
