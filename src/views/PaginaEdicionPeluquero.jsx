import React from "react";
import { Redirect } from "react-router-dom";
import FormularioPeluquero from "../components/FormularioPeluquero";
import { useNotificacion } from "../contexts/NotificacionProvider";
import { usePutEditarPeluquero } from "../service/ServicioDePeluquero";
import { useUser } from "../contexts/UserProvider";

const PaginaEdicionPeluquero = () => {
  const {
    setPerfil,
    perfil: {
      peluquero: {
        estado,
        id,
        estaDesconectado,
        estaDisponible,
        puntuacion,
        ...peluqueroDatos
      },
    },
  } = useUser();
  const { setNotificacion } = useNotificacion();
  const { cargando, setPeluquero } = usePutEditarPeluquero((perfilNuevo) => {
    setNotificacion({
      mensaje: "Perfil editado exitosamente!",
      severidad: "success",
    });
    setPerfil((prevState) => ({ ...prevState, peluquero: perfilNuevo }));
  });

  if (!estaDesconectado) {
    setNotificacion({
      mensaje: "Debe estar desconectado para editar su perfil!",
      severidad: "warning",
    });
    return <Redirect to="/peluquero/turnos" />;
  }

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
