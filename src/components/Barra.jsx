/* eslint-disable no-undef */
import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {useUser} from "../contexts/UserProvider";
import Can from "../hocs/Can";
import {URI_LOGIN_CLIENTE, URI_LOGIN_PELUQUERO} from "../constants";
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


const Barra = () => {
    const classes = useStyles();
    const {push} = useHistory();
    const {loginWithRedirect, logout} = useUser();

    const BotonesDeSesion = () => {
        const botonProps = {
            size: "small",
            variant:"contained",
            color:"secondary"
        }
        return (
            <Can>
                <Visitante>
                    <ButtonGroup {...botonProps}>
                        <Button onClick={() => loginWithRedirect({redirect_uri: URI_LOGIN_CLIENTE})}>
                            Iniciar Sesion
                        </Button>
                        <Button onClick={() => loginWithRedirect({redirect_uri: URI_LOGIN_PELUQUERO})}>
                            Soy Peluquero
                        </Button>
                    </ButtonGroup>
                </Visitante>
                <Registrado>
                    <Button onClick={() => logout()} {...botonProps}>
                        Cerrar Sesion
                    </Button>
                </Registrado>
            </Can>);
    };


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
                <BotonesDeSesion/>
            </Toolbar>
        </AppBar>
    );
};

export default Barra;