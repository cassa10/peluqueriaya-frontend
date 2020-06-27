import React from "react";
import { useUser } from "../contexts/UserProvider";
import { usePostCliente } from "../service/ServicioDeCliente";
import { useNotificacion } from "../contexts/NotificacionProvider";
import FormularioCliente from "../components/FormularioCliente";

const PaginaRegistroCliente = () => {
  const { fetchPerfil } = useUser();
  const { setNotificacion } = useNotificacion();
  const { cargando, setCliente } = usePostCliente(({ message: mensaje }) => {
    setNotificacion({ mensaje, severidad: "success" });
    fetchPerfil();
  });

  return (
    <FormularioCliente
      onSubmit={setCliente}
      nombre={"Registro"}
      botonProps={{ disabled: cargando }}
    />
  );
};

export default PaginaRegistroCliente;
