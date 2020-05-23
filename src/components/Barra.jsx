import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {useAuth0} from "../service/ProveedorAuth0";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    img: {
        margin: 'auto',
        display: 'block',
        width: '350px',
        minWidth: '150px',
        cursor: 'pointer'
    },
}));


const Barra = () => {
    const classes = useStyles();
    const {push} = useHistory();
    const { isAuthenticated, loginWithPopup, logout } = useAuth0();

    const irAPaginaPrincipal = () => push("/");

    const handleOnClickLogin = () => loginWithPopup();

    const handleOnClickLogout = () => logout();

    return (
        <AppBar position="static">
            <Toolbar>
                 <img
                    className={classes.img}
                    src={require('../assets/images/peluqueriaya-logo.png')}
                    alt="logo"
                    onClick={irAPaginaPrincipal}
                 />
                <Typography variant="h6" className={classes.title}>
                </Typography>
                {!isAuthenticated &&
                <Button onClick={handleOnClickLogin} variant="contained" color="secondary">Login</Button>}
                {isAuthenticated &&
                <Button onClick={handleOnClickLogout} variant="contained" color="secondary">Logout</Button>}

            </Toolbar>
        </AppBar>
    );
};

export default Barra;