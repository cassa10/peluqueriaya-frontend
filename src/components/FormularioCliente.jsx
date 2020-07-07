import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Campo from "./form/Campo";
import AutocompletadoDeUbicacion from "./AutocompletadoDeUbicacion";
import BotonSubmit from "./form/BotonSubmit";
import RegistroForm from "./form/RegistroForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import clienteSchema from "../utils/validations/clienteSchema";

const FormularioCliente = ({
  nombre,
  clienteDatos = {},
  onSubmit,
  botonProps,
}) => {
  const { ubicacion: otraUbicacion = null, ...defaultValues } = clienteDatos;
  const { disabled, ...restoBotonProps } = botonProps;
  const [ubicacion, setUbicacion] = useState(otraUbicacion);
  const [valido, setValido] = useState(!!otraUbicacion);
  const { register, handleSubmit, watch, errors } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(clienteSchema),
    defaultValues: defaultValues,
  });

  const formProps = { errors, inputRef: register };

  return (
    <RegistroForm
      nombre={nombre}
      onSubmit={handleSubmit((data) => onSubmit({ ubicacion, ...data }))}
      avatarSrc={watch("imgPerfil")}
    >
      <Grid container item xs={12} sm={6} spacing={2}>
        <Campo
          sm={6}
          name="nombre"
          label="Nombre"
          autoComplete="given-name"
          autoFocus
          {...formProps}
        />
        <Campo
          sm={6}
          name="apellido"
          label="Apellido"
          autoComplete="family-name"
          {...formProps}
        />
        <Campo
          name="emailOpcional"
          label="Correo Electrónico"
          autoComplete="email"
          {...formProps}
        />
        <Campo
          name="nroTelefono"
          label="Numero de Teléfono"
          autoComplete="tel"
          {...formProps}
        />
      </Grid>
      <Grid container item xs={12} sm={6} spacing={2}>
        <Campo
          name="imgPerfil"
          label="Enlace de imagen de perfil"
          autoComplete="photo"
          {...formProps}
        />
        <Grid item xs={12}>
          <AutocompletadoDeUbicacion
            {...{ ubicacion, setUbicacion, valido, setValido }}
          />
        </Grid>
        <BotonSubmit disabled={!valido || disabled} {...restoBotonProps} />
      </Grid>
    </RegistroForm>
  );
};

FormularioCliente.propTypes = {
  nombre: PropTypes.string.isRequired,
  clienteDatos: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  botonProps: PropTypes.object.isRequired,
};

export default FormularioCliente;
