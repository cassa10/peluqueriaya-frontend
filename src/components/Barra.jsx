import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import {useHistory} from "react-router";
import {makeStyles} from "@material-ui/core/styles";

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

    const irAPaginaPrincipal = () => push("/");

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
            </Toolbar>
        </AppBar>
    );
};

export default Barra;