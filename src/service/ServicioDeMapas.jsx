import { useGet } from "./API";

export const useGetUbicacionConDireccion = (fDatos) => {
  const { cargando, setParametros } = useGet("/mapas/geocoding", fDatos);

  const setDireccion = (direccion) => setParametros({ direccion });

  return { cargando, setDireccion };
};

export const useGetDireccionConCoords = (ubicacion, fDatos) => {
  const { cargando } = useGet("/mapas/reversegeocoding", fDatos, ubicacion);
  return { cargandoUDC: cargando };
};
