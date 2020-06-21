import React, { memo, useEffect } from "react";
import CheckBoxsDeTiposDePeluquero from "../CheckBoxsDeTiposDePeluquero";
import PropTypes from "prop-types";
import { ErrorMessage } from "react-hook-form";

import { Grid, Typography } from "@material-ui/core";

const CampoTiposDePeluquero = memo(
  ({ register, unregister, setValue, errors, name, defaultValues = {hombre: false, mujer: false, kids: false} }) => {
    useEffect(() => {
      register({ name });
      return () => unregister(name);
    }, [name, register, unregister]);

    return (
      <Grid container item xs={12} justify="center">
        <Grid item xs={12}>
          <Typography align="center" color="secondary">
            ¿Cuál es su clientela?
          </Typography>
        </Grid>
        <CheckBoxsDeTiposDePeluquero
          defaultValues={defaultValues}
          setFiltro={({ tipos }) => setValue(name, tipos)}
        />
        <ErrorMessage errors={errors} name="tipos">
          {({ message }) => (
            <Typography variant="caption" color="error">
              {message}
            </Typography>
          )}
        </ErrorMessage>
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
  defaultValues: PropTypes.object,
};

export default CampoTiposDePeluquero;
