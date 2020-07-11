import React from "react";
import { useUser } from "../contexts/UserProvider";
import { usePostCliente } from "../service/ServicioDeCliente";
import { useNotificacion } from "../contexts/NotificacionProvider";
import FormularioCliente from "../components/FormularioCliente";

const PaginaRegistroCliente = () => {
  const { setCliente } = useUser();
  const { setNotificacion } = useNotificacion();
  const { cargando, setClienteCreado } = usePostCliente((clienteNuevo) => {
    setNotificacion({
      mensaje: "Cuenta creada exitosamente!",
      severidad: "success",
    });
    setCliente(clienteNuevo);
  });

  return (
    <FormularioCliente
      onSubmit={setClienteCreado}
      nombre="Registro"
      botonProps={{ disabled: cargando }}
    />
  );
};

export default PaginaRegistroCliente;
