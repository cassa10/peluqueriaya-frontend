import React from "react";
import { useNotificacion } from "../contexts/NotificacionProvider";
import { usePostPeluquero } from "../service/ServicioDePeluquero";
import FormularioPeluquero from "../components/FormularioPeluquero";
import { useUser } from "../contexts/UserProvider";

const PaginaRegistroPeluquero = () => {
  const { setNotificacion } = useNotificacion();
  const { setPeluquero } = useUser();
  const { setPeluqueroCreado, cargando } = usePostPeluquero(
    (peluqueroNuevo) => {
      setNotificacion({
        mensaje: "Cuenta de peluquero creada exitosamente!",
        severidad: "success",
      });
      setPeluquero(peluqueroNuevo);
    }
  );

  return (
    <FormularioPeluquero
      onSubmit={setPeluqueroCreado}
      nombre={"Registro Peluquero"}
      botonProps={{ disabled: cargando }}
    />
  );
};

export default PaginaRegistroPeluquero;
