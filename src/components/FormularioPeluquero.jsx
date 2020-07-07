import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { Grid } from "@material-ui/core";
import Campo from "./form/Campo";
import AutocompletadoDeUbicacion from "./AutocompletadoDeUbicacion";
import CampoTiposDePeluquero from "./form/CampoTiposDePeluquero";
import BotonSubmit from "./form/BotonSubmit";
import RegistroForm from "./form/RegistroForm";
import peluqueroSchema from "../utils/validations/peluqueroSchema";
import CampoNumerico from "./form/CampoNumerico";

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
    control,
  } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(peluqueroSchema),
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
        <CampoNumerico
          sm={6}
          name="corteMin"
          label="Precio fijo por trabajo"
          prefix="$"
          errores={errors}
          control={control}
        />
        <CampoNumerico
          sm={6}
          name="distanciaMax"
          label="Distancia max a recorrer por cliente"
          suffix=" Km"
          InputLabelProps={{ shrink: true }}
          errores={errors}
          control={control}
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
