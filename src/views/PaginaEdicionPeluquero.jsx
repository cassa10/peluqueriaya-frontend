import React from "react";
import FormularioPeluquero from "../components/FormularioPeluquero";
import { useNotificacion } from "../contexts/NotificacionProvider";
import { usePutEditarPeluquero } from "../service/ServicioDePeluquero";
import { useUser } from "../contexts/UserProvider";

const PaginaEdicionPeluquero = () => {
  const {
    setUser,
    user: {
      peluquero: { estado, id, ...peluqueroDatos },
    },
  } = useUser();
  const { setNotificacion } = useNotificacion();
  const { cargando, setPeluquero } = usePutEditarPeluquero((perfilNuevo) => {
    setNotificacion({
      mensaje: "Perfil editado exitosamente!",
      severidad: "success",
    });
    setUser((prevState) => ({ ...prevState, peluquero: perfilNuevo }));
  });

  return (
    <FormularioPeluquero
      onSubmit={setPeluquero}
      nombre={"Registro Peluquero"}
      peluqueroDatos={peluqueroDatos}
      botonProps={{ disabled: cargando, nombre: "Editar" }}
    />
  );
};

export default PaginaEdicionPeluquero;
