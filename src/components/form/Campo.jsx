import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";


const Campo = ({sm, name, ...props}) => (
    <Grid item xs={12} sm={sm}>
        <TextField variant="outlined" required fullWidth id={name} name={name} {...props}/>
    </Grid>
);

Campo.propTypes = {
    sm: PropTypes.number,
    name: PropTypes.string.isRequired,
};

export default Campo;