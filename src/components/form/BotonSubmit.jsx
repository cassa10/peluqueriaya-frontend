import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";


const BotonSubmit = ({...props}) => {
    return <Grid item container xs={12} justify="center">
        <Button type="submit" variant="contained" color="primary" size="large" {...props}>
            Registrar
        </Button>
    </Grid>
}

export default BotonSubmit;