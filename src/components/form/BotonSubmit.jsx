import React from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";

const BotonSubmit = ({ nombre = "Registrar", ...props }) => {
  return (
    <Grid container item xs={12} justify="center">
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        size="large"
        {...props}
      >
        {nombre}
      </Button>
    </Grid>
  );
};

BotonSubmit.propTypes = {
  nombre: PropTypes.string,
};

export default BotonSubmit;
