/* eslint-disable no-undef */
import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {useUser} from "../contexts/UserProvider";
import Can from "../wrappers/Can";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const {Visitante, Registrado} = Can;

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    img: {
        margin: 'auto',
        display: 'block',
        width: '350px',
        minWidth: '150px',
        cursor: 'pointer'
    }
}));

const botonProps = {
    size: "small",
    variant: "contained",
    color: "secondary"
};

const Barra = () => {
    const classes = useStyles();
    const {push} = useHistory();
    const {loginComoCliente, loginComoPeluquero, logout} = useUser();

    return (
        <AppBar position="static">
            <Toolbar>
                <img
                    className={classes.img}
                    src={require('../assets/images/peluqueriaya-logo.png')}
                    alt="logo"
                    onClick={() => push("/")}
                />
                <Typography variant="h6" className={classes.title}>
                </Typography>
                <Can>
                    <Visitante>
                        <ButtonGroup {...botonProps}>
                            <Button onClick={() => loginComoCliente()}> Iniciar Sesion </Button>
                            <Button onClick={() => loginComoPeluquero()}> Soy Peluquero </Button>
                        </ButtonGroup>
                    </Visitante>
                    <Registrado>
                        <Button onClick={() => logout()} {...botonProps}>Cerrar Sesion</Button>
                    </Registrado>
                </Can>
            </Toolbar>
        </AppBar>);
};

export default Barra;