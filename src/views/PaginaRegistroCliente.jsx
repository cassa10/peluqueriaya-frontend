import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserProvider";
import Can, { Cliente, Pendiente } from "../wrappers/Can";
import { CLIENTE } from "../assets/constants";
import { Redirect } from "react-router-dom";
import Campo from "../components/form/Campo";
import AutocompletadoDeUbicacion from "../components/AutocompletadoDeUbicacion";
import BotonSubmit from "../components/form/BotonSubmit";
import RegistroForm from "../components/form/RegistroForm";
import { useForm } from "react-hook-form";
import clienteSchema from "../assets/validations/clienteSchema";
import { usePostCliente } from "../service/ServicioDeCliente";
import { useNotificacion } from "../contexts/NotificacionProvider";
import { Grid } from "@material-ui/core";

const PaginaRegistroCliente = () => {
  const { empezarRegistro, abandonarRegistro, registrar } = useUser();
  const [ubicacion, setUbicacion] = useState(null);
  const [valido, setValido] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm({
    reValidateMode: "onChange",
    validationSchema: clienteSchema,
  });
  const { setNotificacion } = useNotificacion();
  const { cargando, setCliente } = usePostCliente(({ message: mensaje }) => {
    registrar(CLIENTE);
    setNotificacion({ mensaje, severidad: "success" });
  });

  useEffect(() => {
    empezarRegistro(CLIENTE);
    return () => {
      abandonarRegistro(CLIENTE);
    }; // eslint-disable-next-line
  }, [abandonarRegistro]);

  const onSubmit = (data) => setCliente({ ubicacion, ...data });

  const formProps = () => ({ errors, inputRef: register });

  return (
    <Can>
      <Cliente>
        <Redirect to="/perfil" />
      </Cliente>
      <Pendiente>
        <RegistroForm
          nombre="Registro"
          onSubmit={handleSubmit(onSubmit)}
          avatarSrc={watch("imgPerfil")}
        >
          <Grid container item xs={12} sm={6} spacing={2}>
            <Campo
              sm={6}
              name="nombre"
              label="Nombre"
              autoComplete="given-name"
              autoFocus
              {...formProps()}
            />
            <Campo
              sm={6}
              name="apellido"
              label="Apellido"
              autoComplete="family-name"
              {...formProps()}
            />
            <Campo
              name="emailOpcional"
              label="Correo Electrónico"
              autoComplete="email"
              {...formProps()}
            />
            <Campo
              name="nroTelefono"
              label="Numero de Teléfono"
              autoComplete="tel"
              {...formProps()}
            />
          </Grid>
          <Grid container item xs={12} sm={6} spacing={2}>
            <Campo
              name="imgPerfil"
              label="Enlace de imagen de perfil"
              autoComplete="photo"
              {...formProps()}
            />
            <Grid item xs={12}>
              <AutocompletadoDeUbicacion
                {...{ ubicacion, setUbicacion, valido, setValido }}
              />
            </Grid>
            <BotonSubmit disabled={!valido || cargando} />
          </Grid>
        </RegistroForm>
      </Pendiente>
    </Can>
  );
};

export default PaginaRegistroCliente;
