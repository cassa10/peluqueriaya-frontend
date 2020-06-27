import React, { useEffect } from "react";
import { useUser } from "../contexts/UserProvider";
import Can, { Cliente, Pendiente } from "../wrappers/Can";
import { CLIENTE } from "../utils/constants";
import { Redirect } from "react-router-dom";
import { usePostCliente } from "../service/ServicioDeCliente";
import { useNotificacion } from "../contexts/NotificacionProvider";
import FormularioCliente from "../components/FormularioCliente";

const PaginaRegistroCliente = () => {
  const { empezarRegistro, abandonarRegistro, registrar } = useUser();
  const { setNotificacion } = useNotificacion();
  const { cargando, setCliente } = usePostCliente(({ message: mensaje }) => {
    registrar(CLIENTE);
    setNotificacion({ mensaje, severidad: "success" });
    window.location.reload();
  });

  useEffect(() => {
    empezarRegistro(CLIENTE);
    return () => {
      abandonarRegistro(CLIENTE);
    }; // eslint-disable-next-line
  }, [abandonarRegistro]);

  return (
    <Can>
      <Cliente>
        <Redirect to="/perfil" />
      </Cliente>
      <Pendiente>
        <FormularioCliente
          onSubmit={setCliente}
          nombre={"Registro"}
          botonProps={{ disabled: cargando }}
        />
      </Pendiente>
    </Can>
  );
};

export default PaginaRegistroCliente;
