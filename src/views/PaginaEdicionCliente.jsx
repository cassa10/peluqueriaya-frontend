import React from "react";
import { useNotificacion } from "../contexts/NotificacionProvider";
import { usePutEditarCliente } from "../service/ServicioDeCliente";
import FormularioCliente from "../components/FormularioCliente";
import { useUser } from "../contexts/UserProvider";

const PaginaEdicionCliente = () => {
  const {
    setPerfil,
    perfil: {
      cliente: { estado, id, fullName, ...clienteDatos },
    },
  } = useUser();
  const { setNotificacion } = useNotificacion();
  const { cargando, setCliente } = usePutEditarCliente((perfilNuevo) => {
    setNotificacion({
      mensaje: "Perfil editado exitosamente!",
      severidad: "success",
    });
    setPerfil((prevState) => ({ ...prevState, cliente: perfilNuevo }));
  });

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
