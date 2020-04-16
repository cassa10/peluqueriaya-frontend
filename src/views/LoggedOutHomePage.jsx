import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LocationAutocomplete from "../components/LocationAutocomplete";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

const LoggedOutHomePage = () => {
    const [location, setLocation] = useState(null);

    const searchHairdresser = () => {
        if (location.position) {
            props.history.push({
                pathname: '/search',
                state: {}
            });
        }
    };

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
            <LocationAutocomplete
                {...props}
                location={location}
                setLocation={setLocation}
                optionalButton={(className, disabled) =>
                    <Button variant="contained"
                            className={className}
                            size="large"
                            color="secondary"
                            type="submit"
                            onClick={searchHairdresser}
                            disabled={disabled}>
                        <SearchIcon/>
                    </Button>}/>
        </Box>
        </Box>

};

export default LoggedOutHomePage;
