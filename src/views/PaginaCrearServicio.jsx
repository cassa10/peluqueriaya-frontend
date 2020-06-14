import React, { useState } from "react";
import RegistroForm from "../components/form/RegistroForm";
import { Controller, useForm } from "react-hook-form";
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
import { useGetTiposDeServicios } from "../service/ServicioDeServicio";
import intersectionWith from "lodash/intersectionWith";
import map from "lodash/map";

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
  const { register, handleSubmit, errors, control, getValues } = useForm({
    reValidateMode: "onChange",
  });
  const [opcionesTipos, setOpcionesTipos] = useState([]);
  useGetTiposDeServicios(setOpcionesTipos);

  const onSubmit = ({ tipos }) => {
    const tiposDto = intersectionWith(
      opcionesTipos,
      tipos,
      ({ nombre }, othVal) => nombre === othVal
    );
    console.log(map(tiposDto, "id"));
  };

  const formProps = () => ({ errors, inputRef: register });

  return (
    <RegistroForm nombre="Crear servicio" onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12}>
        <Typography gutterBottom>
          ¿Que tipo de servicio es? Elijá al menos uno
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
      </Grid>
      <Campo
        sm={6}
        type="number"
        name="precio"
        label="Precio de servicio"
        {...formProps()}
      />
      <Grid container item xs={12} sm={6} justify="center">
        <BotonSubmit nombre="Crear" />
      </Grid>
      <div>{JSON.stringify(getValues())}</div>
    </RegistroForm>
  );
};

export default PaginaCrearServicio;
