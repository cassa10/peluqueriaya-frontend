import React from "react";
import { Grid, Button } from "@material-ui/core";

const BotonSubmit = ({ ...props }) => {
  return (
    <Grid container item xs={12} justify="center">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        {...props}
      >
        Registrar
      </Button>
    </Grid>
  );
};

export default BotonSubmit;
