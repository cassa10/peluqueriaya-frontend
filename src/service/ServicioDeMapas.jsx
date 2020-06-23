import { useGet } from "./API";
import { useEffect } from "react";

export const useGetUbicacionConDireccion = (fDatos) => {
  const { cargando, setParametros } = useGet("/mapas/geocoding", fDatos);

  return {
    cargando,
    setDireccion: (title) => setParametros({ direccion: title }),
  };
};

export const useGetDireccionConCoords = (ubicacion, fDatos) => {
  const {cargando, setParametros} = useGet("/mapas/reversegeocoding", fDatos);

  useEffect(() => {
    setParametros(ubicacion)
    // eslint-disable-next-line
  }, []);

  return {cargandoUDC: cargando};
};
