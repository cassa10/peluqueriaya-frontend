import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import FormularioPeluquero from "../components/FormularioPeluquero";
import { useNotificacion } from "../contexts/NotificacionProvider";
import { usePutEditarPeluquero } from "../service/ServicioDePeluquero";
import { useUser } from "../contexts/UserProvider";

const PaginaEdicionPeluquero = () => {
  const { peluquero, setPeluquero } = useUser();
  const { setNotificacion } = useNotificacion();
  const { cargando, setPeluqueroAEditar } = usePutEditarPeluquero(
    (peluqueroEditado) => {
      setNotificacion({
        mensaje: "Perfil editado exitosamente!",
        severidad: "success",
      });
      setPeluquero((prevState) => ({
        ...prevState,
        ...peluqueroEditado,
      }));
    }
  );

  useEffect(() => {
    if (!peluquero.estaDesconectado) {
      setNotificacion({
        mensaje: "Debe estar desconectado para editar su perfil!",
        severidad: "warning",
      });
    }
  }, [peluquero.estaDesconectado, setNotificacion]);

  if (!peluquero.estaDesconectado) {
    return <Redirect to="/peluquero/turnos" />;
  }

  return (
    <FormularioPeluquero
      onSubmit={setPeluqueroAEditar}
      nombre="Registro Peluquero"
      peluqueroDatos={peluquero}
      botonProps={{ disabled: cargando, nombre: "Editar" }}
    />
  );
};

export default PaginaEdicionPeluquero;
