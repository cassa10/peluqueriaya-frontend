import React from 'react';
import Box from "@material-ui/core/Box";
import HairdresserResults from '../components/HairdresserResults';

const SearchResults = props => {

    return (
        <Box bgcolor="primary.main" color="primary.contrastText" textAlign="center" m={2}>
            <img
            src={'peluqueriaya-logo.png'}
            alt="logo"
            />
            <HairdresserResults />
        </Box>
    );
};

export default SearchResults;