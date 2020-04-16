import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import AddLocationIcon from '@material-ui/icons/AddLocation';
import SearchIcon from "@material-ui/icons/Search";
import ErrorIcon from "@material-ui/icons/Error";
import DoneIcon from "@material-ui/icons/Done";
import React, {useEffect, useState} from "react";
import MapsAPI from "../service/mapsApi";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'stretch',
        justify: "space-evenly",
        width: "80%",
    },
    classButton: {
        width: "100%",
        height: "100%"
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    fabProgress: {
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    }
}));

const LocationAutocomplete = (props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const [locations, setLocations] = useState([]);

    const hasSelectedAPosition = () => {
        return location !== null &&
            location.position.lat !== "" &&
            location.position.lng !== "";
    }

    const hasValidInputAddress = () => {
        return location !== null && location.title.length > 10;
    }

    useEffect(() => {
        // eslint-disable-next-line
        console.log(props);
        if (!loading && !hasSelectedAPosition() && hasValidInputAddress()) {
            setLoading(true);
            MapsAPI.getLocationByAddress(location.title)
                .then(({data}) => setLocations(data[0].items))
                .catch((error) => console.log(error))
                .finally(() => setLoading(false))
        }
        // eslint-disable-next-line
    }, [loading, location])

    const getLocationByCoords = () => {
        setLoading(true)
        navigator.geolocation.getCurrentPosition(({coords}) => {
            const {latitude, longitude} = coords;
            MapsAPI.getLocationByCoords({latitude, longitude})
                .then(({data}) => {
                    setLocation(data.items[0]);
                })
                .catch((error) => console.log(error))
                .finally(() => setLoading(false))
        });
    };

    const handleOnChange = (e, value) => {
        setLocation(value);
    }

    const handleOnInputChange = (e, value, reason) => {
        if (reason !== "reset") {
            setLocation({
                title: value,
                position: {
                    lat: "",
                    lng: ""
                }
            });
        }
    };

    const searchHairdresser = () => {
        if (location.position) {
            props.history.push({
                pathname: '/search',
                state: {}
            });
        }
    };

    return <Grid container className={classes.root}>
        <Grid item xs={1}>
            <IconButton color="secondary" className={classes.classButton}
                        onClick={() => getLocationByCoords()} disabled={loading}>
                <AddLocationIcon fontSize="large"/>
            </IconButton>
        </Grid>
        <Grid item xs={10}>
            <Paper>
                <Autocomplete
                    id="combo-box-demo"
                    disablePortal
                    freeSolo
                    value={location}
                    onChange={handleOnChange}
                    onInputChange={handleOnInputChange}
                    noOptionsText={"No se encontraron resultados, escriba una dirección con más de 10 dígitos"}
                    options={locations}
                    loading={loading}
                    getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
                    renderInput={(params) => {
                        return <TextField
                            {...params}
                            color={"secondary"}
                            variant={"outlined"}
                            placeholder="Ingrese su direccion, ej: Mitre 123 Quilmes"
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <div className={classes.wrapper}>
                                            {hasSelectedAPosition()? <DoneIcon color="secondary"/>: <ErrorIcon color="secondary"/>}
                                        </div>
                                    </InputAdornment>
                                )
                            }}
                        />;
                    }}
                />
            </Paper>
        </Grid>
        <Grid item xs={1}>
            <Button variant="contained"
                    className={classes.classButton}
                    size="large"
                    color="secondary"
                    type="submit"
                    onClick={searchHairdresser}
                    disabled={loading || !hasSelectedAPosition()}>
                <SearchIcon/>
            </Button>
        </Grid>
    </Grid>
}

export default LocationAutocomplete;