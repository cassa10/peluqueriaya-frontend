import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Campo from "./form/Campo";
import AutocompletadoDeUbicacion from "./AutocompletadoDeUbicacion";
import InputAdornment from "@material-ui/core/InputAdornment";
import CampoTiposDePeluquero from "./form/CampoTiposDePeluquero";
import BotonSubmit from "./form/BotonSubmit";
import RegistroForm from "./form/RegistroForm";
import { useForm } from "react-hook-form";
import peluqueroSchema from "../utils/validations/peluqueroSchema";
import PropTypes from "prop-types";

const FormularioPeluquero = ({
  nombre,
  peluqueroDatos = {},
  onSubmit,
  botonProps,
}) => {
  const {
    ubicacion: otraUbicacion = null,
    tipos: defaultTipos,
    ...defaultValues
  } = peluqueroDatos;
  const { disabled, ...restoBotonProps } = botonProps;
  const [ubicacion, setUbicacion] = useState(otraUbicacion);
  const [valido, setValido] = useState(!!otraUbicacion);
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
    defaultValues: defaultValues,
  });

  const formProps = { errors, inputRef: register };

  return (
    <RegistroForm
      onSubmit={handleSubmit((data) => onSubmit({ ubicacion, ...data }))}
      nombre={nombre}
      avatarSrc={watch("logo")}
    >
      <Grid container item xs={12} sm={6} spacing={2}>
        <Campo
          name="nombre"
          label="Nombre"
          autoComplete="organization"
          autoFocus
          {...formProps}
        />
        <Campo
          name="emailOpcional"
          label="Correo Electrónico"
          autoComplete="email"
          {...formProps}
        />
        <Campo
          name="logo"
          label="Enlace de logo"
          autoComplete="photo"
          {...formProps}
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
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          {...formProps}
        />
        <Campo
          sm={6}
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">Km</InputAdornment>,
          }}
          name="distanciaMax"
          label="Distancia max a recorrer por cliente"
          InputLabelProps={{ shrink: true }}
          {...formProps}
        />
        <Campo
          name="descripcion"
          label="Descripción"
          multiline
          rows={3}
          {...formProps}
        />
        <CampoTiposDePeluquero
          {...{
            register,
            unregister,
            setValue,
            errors,
            name: "tipos",
            defaultTipos,
          }}
        />
        <BotonSubmit disabled={!valido || disabled} {...restoBotonProps} />
      </Grid>
    </RegistroForm>
  );
};

FormularioPeluquero.propTypes = {
  nombre: PropTypes.string.isRequired,
  peluqueroDatos: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  botonProps: PropTypes.object.isRequired,
};

export default FormularioPeluquero;
