import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import AddLocationIcon from '@material-ui/icons/AddLocation';
import SearchIcon from "@material-ui/icons/Search";
import React, {useEffect, useState} from "react";
import MapsAPI from "../service/mapsApi";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'stretch',
        justify: "space-evenly",
        width: "80%",
    },
    input: {
        flex: 1,
    },
    classButton: {
        width: "100%",
        height: "100%"
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

const SearchInput = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
         if (!loading && selected !== null && selected.title.length > 10) {
            setLoading(true);
            MapsAPI.getLocationByAddress(selected.title)
                .then(({data}) => setLocations(data[0].items))
                .catch((error) => console.log(error))
            setLoading(false);
        }
    }, [loading, selected])

    const getLocationByCoords = () => {
        setLoading(true)
        navigator.geolocation.getCurrentPosition(({coords}) => {
            const {latitude, longitude} = coords;
            MapsAPI.getLocationByCoords({latitude, longitude})
                .then(({data}) => setSelected(data.items[0]))
                .catch((error) => console.log(error))
        });
        setLoading(false);
    };

    const handleOnChange = (e, value) => {
        setSelected(value);
    }

    const handleOnInputChange = (e, value) => {
        setSelected({
            title: value,
            position: {
                lat: "",
                lng: ""
            }
        });
    };

    const searchHairdresser = () => {
        if (selected.position) {
            //TODO: enviar get request de peluqueros con la ubicacion
            // y mostrarme a los peluqueros mas cercanos
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
                    value={selected}
                    onChange={handleOnChange}
                    onInputChange={handleOnInputChange}
                    options={locations}
                    loading={loading}
                    getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            color={"secondary"}
                            variant={"outlined"}
                            placeholder="Ingrese su direccion, ej: Mitre 123 Quilmes"
                        />}
                />
            </Paper>
        </Grid>
        <Grid item xs={1}>
            <Button variant="contained"
                    className={classes.classButton}
                    size="large"
                    color="secondary"
                    type="submit"
                    onClick={() => searchHairdresser()}
                    disabled={loading}>
                <SearchIcon/>
            </Button>
        </Grid>
    </Grid>
}

export default SearchInput;