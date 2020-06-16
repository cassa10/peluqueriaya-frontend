import React, { useState } from "react";
import RegistroForm from "../components/form/RegistroForm";
import { Controller, ErrorMessage, useForm } from "react-hook-form";
import Campo from "../components/form/Campo";
import {
  Typography,
  Chip,
  Grid,
  Input,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BotonSubmit from "../components/form/BotonSubmit";
import {
  useGetTiposDeServicios,
  usePostServicio,
} from "../service/ServicioDeServicio";
import servicioSchema from "../utils/validations/servicioSchema";
import { useNotificacion } from "../contexts/NotificacionProvider";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  selected: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  chip: {
    margin: 2,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
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
    validationSchema: servicioSchema,
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
      <Campo sm={6} type="number" name="precio" label="Precio" {...formProps} />
      <Campo sm={6} name="nombre" label="Nombre" {...formProps} />
      <Grid item xs={12}>
        <Typography gutterBottom>
          ¿Que tipo de servicio esta ofreciendo? Elijá al menos uno
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
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      className={classes.chip}
                      color="secondary"
                    />
                  ))}
                </div>
              )}
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
        <ErrorMessage errors={errors} name="tipos">
          {({ message }) => (
            <Typography variant="caption" color="error">
              {message}
            </Typography>
          )}
        </ErrorMessage>
      </Grid>
      <BotonSubmit nombre="Crear" disabled={cargando} />
    </RegistroForm>
  );
};

export default PaginaCrearServicio;
