import { useGet } from "./API";

export const useGetTiposDeServicios = (fdatos) => {
  useGet("/servicio/tipos", fdatos, {});
};
