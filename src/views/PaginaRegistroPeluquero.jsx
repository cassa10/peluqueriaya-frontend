import React from "react";
import { useNotificacion } from "../contexts/NotificacionProvider";
import { usePostPeluquero } from "../service/ServicioDePeluquero";
import FormularioPeluquero from "../components/FormularioPeluquero";
import { useUser } from "../contexts/UserProvider";

const PaginaRegistroPeluquero = () => {
  const { setNotificacion } = useNotificacion();
  const { fetchPerfil } = useUser();
  const { setPeluquero, cargando } = usePostPeluquero(
    ({ message: mensaje }) => {
      setNotificacion({ mensaje, severidad: "success" });
      fetchPerfil();
    }
  );

  return (
    <FormularioPeluquero
      onSubmit={setPeluquero}
      nombre={"Registro Peluquero"}
      botonProps={{ disabled: cargando }}
    />
  );
};

export default PaginaRegistroPeluquero;
