import React, { useEffect, useState, useCallback } from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid"
import HairdresserResults from '../components/HairdresserResults';
import Button from "@material-ui/core/Button";
import API from '../service/api';
import '../dist/css/SearchResults.css'

const SearchResults = (props) => {

    const [userLocation] = useState(
        {
            latitude: sessionStorage.getItem('userLocationLatitude'),
            longitude: sessionStorage.getItem('userLocationLongitude')
        });

    const [results, setResults] = useState([])

    const goHome = useCallback(() => {
        props.history.push({
            pathname: '/',
            state: {}
        });
    },[props.history]);

    useEffect(() => {
        
        if (!userLocation.latitude || !userLocation.longitude) {
            goHome()
        }

        API.get('/peluquero/search', userLocation)
            .then((response) => searchResults(response))
            .catch((error) => console.log(error))

        const searchResults = (response) => {
            setResults(response)
        }


    },[userLocation,goHome]);



    return (
        <div>
            <Box bgcolor="primary.main" color="primary.contrastText" textAlign="center" m={2}>
                <img
                    className="logo_redirector"
                    src={'peluqueriaya-logo.png'}
                    alt="logo"
                    onClick={goHome}
                />
            </Box>
            <Grid
                container
                direction="column"
                justify="flex-end"
                alignItems="center"
            >
                <HairdresserResults 
                    results={results} 
                    buttonGoHome={
                        <Button size="small" color="secondary" onClick={goHome}>
                            Volver e intentar con otra ubicación
                        </Button>
                    }
                />
            </Grid>
        </div>
    );
};

export default SearchResults;