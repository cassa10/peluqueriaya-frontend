import React, { memo, useEffect } from "react";
import CheckBoxsDeTiposDePeluquero from "../CheckBoxsDeTiposDePeluquero";
import PropTypes from "prop-types";
import { ErrorMessage } from "@hookform/error-message";
import { Grid, Typography } from "@material-ui/core";

const CampoTiposDePeluquero = memo(
  ({ register, unregister, setValue, errors, name, defaultTipos = [] }) => {
    useEffect(() => {
      register({ name });
      return () => unregister(name);
    }, [name, register, unregister]);

    const aTipos = {
      hombre: defaultTipos.includes("HOMBRE"),
      mujer: defaultTipos.includes("MUJER"),
      kids: defaultTipos.includes("KIDS"),
    };

    return (
      <Grid container item xs={12} justify="center">
        <Grid item xs={12}>
          <Typography align="center" color="secondary">
            ¿Cuál es su clientela?
          </Typography>
        </Grid>
        <CheckBoxsDeTiposDePeluquero
          defaultValues={aTipos}
          setFiltro={({ tipos }) => setValue(name, tipos)}
        />
        <ErrorMessage
          errors={errors}
          name="tipos"
          as={<Typography variant="caption" color="error" />}
        />
      </Grid>
    );
  }
);

CampoTiposDePeluquero.propTypes = {
  register: PropTypes.func.isRequired,
  unregister: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  defaultTipos: PropTypes.array,
};

export default CampoTiposDePeluquero;
