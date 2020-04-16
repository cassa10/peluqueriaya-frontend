import React from 'react';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LocationAutocomplete from "../components/LocationAutocomplete";

const LoggedOutHomePage = props => {

    return <Box bgcolor="primary.main" color="primary.contrastText" textAlign="center" m={10}>
        <img
            src={'peluqueriaya-logo.png'}
            alt="logo"
        />
        <Typography variant="h6" gutterBottom>
            Plataforma que permite a cualquier peluquero/a brindar sus servicios a domicilio.
        </Typography>
        <Typography variant="h6" gutterBottom>
            Busque su peluquero mas cercano.
        </Typography>
        <Box display="flex" justifyContent="center" p={4}>
            <LocationAutocomplete {...props}/>
        </Box>
        </Box>

};

export default LoggedOutHomePage;
