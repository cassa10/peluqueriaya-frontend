import { useGet, useGetConAuth, usePostConAuth } from "./API";
import intersectionWith from "lodash/intersectionWith";
import map from "lodash/map";

export const useGetTiposDeServicios = (fdatos) => {
  useGet("/servicio/tipos", fdatos, {});
};

export const usePostServicio = (fdatos) => {
  const { cargando, setParametros } = usePostConAuth("/servicio", fdatos);

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
      ({ nombre, precio, tipos: tiposDTO }) => {
        const tipos = map(tiposDTO, "nombre");
        return { nombre, precio, tipos };
      }
    );
    fdatos(servicios);
  };

  const { cargando } = useGetConAuth("/peluquero/servicios", setServicios, {});

  return { cargando };
};
