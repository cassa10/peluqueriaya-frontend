import { useGet } from "./API";

export const useGetUbicacionConDireccion = (fDatos) => {
  const { cargando, setParametros } = useGet({
    path: "/mapas/geocoding",
    fDatos,
  });

  const setDireccion = (direccion) => setParametros({ direccion });

  return { cargando, setDireccion };
};

export const useGetDireccionConCoords = (ubicacion, fDatos) => {
  const { cargando } = useGet({
    path: "/mapas/reversegeocoding",
    fDatos,
    parametrosIniciales: ubicacion,
  });
  return { cargandoUDC: cargando };
};
