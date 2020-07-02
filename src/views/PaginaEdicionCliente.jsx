import React from "react";
import { useNotificacion } from "../contexts/NotificacionProvider";
import { usePutEditarCliente } from "../service/ServicioDeCliente";
import FormularioCliente from "../components/FormularioCliente";
import { useUser } from "../contexts/UserProvider";

const PaginaEdicionCliente = () => {
  const { cliente, setCliente } = useUser();
  const { setNotificacion } = useNotificacion();
  const { cargando, setClienteAEditar } = usePutEditarCliente(
    (clienteEditado) => {
      setNotificacion({
        mensaje: "Perfil editado exitosamente!",
        severidad: "success",
      });
      setCliente((prevState) => ({ ...prevState, ...clienteEditado }));
    }
  );

  return (
    <FormularioCliente
      onSubmit={setClienteAEditar}
      nombre="Editar perfil"
      clienteDatos={cliente}
      botonProps={{ disabled: cargando, nombre: "Editar" }}
    />
  );
};

export default PaginaEdicionCliente;
