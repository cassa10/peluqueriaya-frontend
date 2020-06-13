import React, { useEffect, useState } from "react";
import Can, { Peluquero, Pendiente } from "../wrappers/Can";
import { PELUQUERO } from "../assets/constants";
import { useUser } from "../contexts/UserProvider";
import { useForm } from "react-hook-form";
import peluqueroSchema from "../assets/validations/peluqueroSchema";
import Campo from "../components/form/Campo";
import AutocompletadoDeUbicacion from "../components/AutocompletadoDeUbicacion";
import CampoTiposDePeluquero from "../components/form/CampoTiposDePeluquero";
import BotonSubmit from "../components/form/BotonSubmit";
import RegistroForm from "../components/form/RegistroForm";
import { Redirect } from "react-router-dom";
import { useNotificacion } from "../contexts/NotificacionProvider";
import { usePostPeluquero } from "../service/ServicioDePeluquero";
import { Grid } from "@material-ui/core";

const PaginaRegistroPeluquero = () => {
  const { empezarRegistro, abandonarRegistro, registrar } = useUser();
  const [ubicacion, setUbicacion] = useState(null);
  const [valido, setValido] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    errors,
    unregister,
    setValue,
  } = useForm({
    reValidateMode: "onChange",
    validationSchema: peluqueroSchema,
    defaultValues: { tipos: [] },
  });
  const { setNotificacion } = useNotificacion();
  const { setPeluquero, cargando } = usePostPeluquero(
    ({ message: mensaje }) => {
      registrar(PELUQUERO);
      setNotificacion({ mensaje, severidad: "success" });
    }
  );

  useEffect(() => {
    empezarRegistro(PELUQUERO);
    return () => {
      abandonarRegistro(PELUQUERO);
    }; // eslint-disable-next-line
  }, [abandonarRegistro]);

  const onSubmit = (data) => setPeluquero({ ubicacion, ...data });

  const formProps = () => ({ errors, inputRef: register });

  return (
    <Can>
      <Peluquero>
        <Redirect to="/peluquero/turnos" />
      </Peluquero>
      <Pendiente>
        <RegistroForm
          onSubmit={handleSubmit(onSubmit)}
          nombre="Registro Peluquero"
          avatarSrc={watch("logo")}
        >
          <Grid container item xs={12} sm={6} spacing={2}>
            <Campo
              name="nombre"
              label="Nombre"
              autoComplete="organization"
              autoFocus
              {...formProps()}
            />
            <Campo
              name="emailOpcional"
              label="Correo Electrónico"
              autoComplete="email"
              {...formProps()}
            />
            <Campo
              name="logo"
              label="Enlace de logo"
              autoComplete="photo"
              {...formProps()}
            />
            <Grid item xs={12}>
              <AutocompletadoDeUbicacion
                {...{ ubicacion, setUbicacion, valido, setValido }}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={6} spacing={2}>
            <Campo
              sm={6}
              type="number"
              name="corteMin"
              label="Precio fijo por trabajo"
              {...formProps()}
            />
            <Campo
              sm={6}
              type="number"
              name="distanciaMax"
              label="Distancia maxima a recorrer por cliente"
              InputLabelProps={{ shrink: true }}
              {...formProps()}
            />
            <Campo
              name="descripcion"
              label="Descripción"
              multiline
              rows={3}
              {...formProps()}
            />
            <CampoTiposDePeluquero
              {...{ register, unregister, setValue, errors, name: "tipos" }}
            />
            <BotonSubmit disabled={!valido || cargando} />
          </Grid>
        </RegistroForm>
      </Pendiente>
    </Can>
  );
};

export default PaginaRegistroPeluquero;
