import { useGet, usePostConAuth } from "./API";
import intersectionWith from "lodash/intersectionWith";
import map from "lodash/map";

export const useGetTiposDeServicios = (fdatos) => {
  useGet("/servicio/tipos", fdatos, {});
};

export const usePostServicio = (fdatos) => {
  const { cargando, setParametros } = usePostConAuth("/servicio", fdatos);

  const setServicio = ({ opcionesTipos, tipos, precio }) => {
    const tiposDto = map(
      intersectionWith(
        opcionesTipos,
        tipos,
        ({ nombre }, othVal) => nombre === othVal
      ),
      "id"
    );
    setParametros({ tipos: tiposDto, precio });
  };

  return { cargando, setServicio };
};
