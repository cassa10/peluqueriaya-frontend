import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import AddLocationIcon from '@material-ui/icons/AddLocation';
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "50%",
    },
    input: {
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

const SearchInput = () => {
    const classes = useStyles();

    return <Paper component="form" className={classes.root}>
        <IconButton color="secondary" className={classes.iconButton} aria-label="menu">
            <AddLocationIcon/>
        </IconButton>
        <InputBase
            className={classes.input}
            placeholder="Ingrese su direccion, ej: Mitre 123 Quilmes"
            inputProps={{ 'aria-label': 'buscar peluquero' }}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton type="submit" color="secondary" className={classes.iconButton} aria-label="search">
            <SearchIcon />
        </IconButton>
    </Paper>
}

export default SearchInput;