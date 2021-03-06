import React, { useState } from "react";
import RegistroForm from "../components/form/RegistroForm";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers";
import Campo from "../components/form/Campo";
import { Typography, Grid, Input, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BotonSubmit from "../components/form/BotonSubmit";
import {
  useGetTiposDeServicios,
  usePostServicio,
} from "../service/ServicioDeServicio";
import servicioSchema from "../utils/validations/servicioSchema";
import { useNotificacion } from "../contexts/NotificacionProvider";
import { useHistory } from "react-router-dom";
import FilaDeChips from "../components/FilaDeChips";
import CampoNumerico from "../components/form/CampoNumerico";

const useStyles = makeStyles((theme) => ({
  selected: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  paper: {
    maxHeight: 224,
    width: 250,
  },
}));

const PaginaCrearServicio = () => {
  const classes = useStyles();
  const [opcionesTipos, setOpcionesTipos] = useState([]);
  useGetTiposDeServicios(setOpcionesTipos);
  const { register, handleSubmit, errors, control } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(servicioSchema),
  });
  const { setNotificacion } = useNotificacion();
  const { push } = useHistory();
  const { cargando, setServicio } = usePostServicio(({ message: mensaje }) => {
    setNotificacion({ mensaje, severidad: "success" });
    push("/peluquero/servicios");
  });

  const onSubmit = (data) => setServicio({ opcionesTipos, ...data });

  const formProps = { errors, inputRef: register };

  return (
    <RegistroForm nombre="Crear servicio" onSubmit={handleSubmit(onSubmit)}>
      <Campo sm={6} name="nombre" label="Nombre" {...formProps} />
      <CampoNumerico
        sm={6}
        name="precio"
        label="Precio"
        prefix="$"
        errores={errors}
        control={control}
      />
      <Grid item xs={12}>
        <Typography gutterBottom>
          ¿Que tipo de servicio está ofreciendo? Elija al menos uno
        </Typography>
        <Controller
          as={
            <Select
              fullWidth
              multiple
              variant="outlined"
              input={<Input color="secondary" />}
              MenuProps={{
                PaperProps: {
                  className: classes.paper,
                },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
              renderValue={(selected) => <FilaDeChips valores={selected} />}
            >
              {opcionesTipos.map(({ nombre, id }) => (
                <MenuItem
                  key={id}
                  value={nombre}
                  classes={{ selected: classes.selected }}
                >
                  {nombre}
                </MenuItem>
              ))}
            </Select>
          }
          name="tipos"
          control={control}
          defaultValue={[]}
        />
        <ErrorMessage
          errors={errors}
          name="tipos"
          as={<Typography variant="caption" color="error" />}
        />
      </Grid>
      <BotonSubmit nombre="Crear" disabled={cargando} />
    </RegistroForm>
  );
};

export default PaginaCrearServicio;
