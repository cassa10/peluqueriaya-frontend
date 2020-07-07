import React from "react";
import get from "lodash/get";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { Grid, TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

const CampoNumerico = ({ sm, name, control, errores, ...props }) => {
  const errorProps = () => {
    const helperText = get(errores, `${name}.message`);
    return helperText ? { error: true, helperText } : {};
  };

  return (
    <Grid item xs={12} sm={sm}>
      <Controller
        control={control}
        name={name}
        render={({ onChange, ...renderProps }) => (
          <NumberFormat
            onValueChange={({ floatValue }) => {
              onChange(floatValue);
            }}
            customInput={TextField}
            decimalScale={3}
            decimalSeparator=","
            thousandSeparator="."
            allowNegative={false}
            variant="outlined"
            color="secondary"
            fullWidth
            id={name}
            {...errorProps()}
            {...props}
            {...renderProps}
          />
        )}
      />
    </Grid>
  );
};

CampoNumerico.propTypes = {
  sm: PropTypes.number,
  errores: PropTypes.object,
  name: PropTypes.string,
  control: PropTypes.object,
};

export default CampoNumerico;
