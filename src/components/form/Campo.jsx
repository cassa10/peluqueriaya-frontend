import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import get from 'lodash/get';
import PropTypes from "prop-types";


const Campo = ({sm, name, errors, ...props}) => {

    const errorProps = () => {
        const helperText = get(errors, `${name}.message`);
         return helperText? {error: true, helperText}: {};
    }

    return (
        <Grid item xs={12} sm={sm}>
            <TextField variant="outlined" color="secondary" fullWidth id={name} name={name}
                       {...errorProps()} {...props}/>
        </Grid>
    );
};

Campo.propTypes = {
    sm: PropTypes.number,
    errors: PropTypes.object,
    name: PropTypes.string.isRequired,
};

export default Campo;