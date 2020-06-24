import React from "react";
import { useNotificacion } from "../contexts/NotificacionProvider";
import { usePostEditarDatosCliente } from "../service/ServicioDeCliente";
import FormularioCliente from "../components/FormularioCliente";
import { useUser } from "../contexts/UserProvider";

const PaginaEdicionCliente = () => {
  const {
    user: {
      cliente: { estado, id, fullName, ...clienteDatos },
    },
  } = useUser();
  const { setNotificacion } = useNotificacion();
  const { cargando, setCliente } = usePostEditarDatosCliente(
    ({ message: mensaje }) => {
      setNotificacion({ mensaje, severidad: "success" });
    }
  );

  return (
    <FormularioCliente
      onSubmit={setCliente}
      nombre={"Editar perfil"}
      clienteDatos={clienteDatos}
      botonProps={{ disabled: cargando, nombre: "Editar" }}
    />
  );
};

export default PaginaEdicionCliente;
