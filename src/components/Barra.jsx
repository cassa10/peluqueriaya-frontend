/* eslint-disable no-undef */
import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {useUser} from "../contexts/UserProvider";
import Can, {NoCliente, NoPeluquero, Registrado} from "../wrappers/Can";
import {CLIENTE, PELUQUERO} from "../assets/constants";


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
    const {login, logout} = useUser();

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
                    <NoCliente>
                        <Button {...botonProps} onClick={() => login(CLIENTE)}> Soy Cliente </Button>
                    </NoCliente>
                    <NoPeluquero>
                        <Button {...botonProps} onClick={() => login(PELUQUERO)}> Soy Peluquero </Button>
                    </NoPeluquero>
                    <Registrado>
                        <Button onClick={() => logout()} {...botonProps}>Cerrar Sesion</Button>
                    </Registrado>
                </Can>
            </Toolbar>
        </AppBar>);
};

export default Barra;