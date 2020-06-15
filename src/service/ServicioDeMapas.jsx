import { useGet } from "./API";

export const useGetUbicacionConDireccion = (fDatos) => {
  const { cargando, setParametros } = useGet("/mapas/geocoding", fDatos);

  return {
    cargando,
    setDireccion: (title) => setParametros({ direccion: title }),
  };
};
