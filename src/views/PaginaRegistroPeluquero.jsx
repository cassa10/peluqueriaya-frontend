import React, { useEffect } from "react";
import Can, { Peluquero, Pendiente } from "../wrappers/Can";
import { PELUQUERO } from "../utils/constants";
import { useUser } from "../contexts/UserProvider";
import { Redirect } from "react-router-dom";
import { useNotificacion } from "../contexts/NotificacionProvider";
import { usePostPeluquero } from "../service/ServicioDePeluquero";
import FormularioPeluquero from "../components/FormularioPeluquero";

const PaginaRegistroPeluquero = () => {
  const { empezarRegistro, abandonarRegistro, registrar } = useUser();
  const { setNotificacion } = useNotificacion();
  const { setPeluquero, cargando } = usePostPeluquero(
    ({ message: mensaje }) => {
      registrar(PELUQUERO);
      setNotificacion({ mensaje, severidad: "success" });
      window.location.reload();
    }
  );

  useEffect(() => {
    empezarRegistro(PELUQUERO);
    return () => {
      abandonarRegistro(PELUQUERO);
    }; // eslint-disable-next-line
  }, [abandonarRegistro]);

  return (
    <Can>
      <Peluquero>
        <Redirect to="/peluquero/turnos" />
      </Peluquero>
      <Pendiente>
        <FormularioPeluquero
          onSubmit={setPeluquero}
          nombre={"Registro Peluquero"}
          botonProps={{ disabled: cargando }}
        />
      </Pendiente>
    </Can>
  );
};

export default PaginaRegistroPeluquero;
