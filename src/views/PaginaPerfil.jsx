import React from 'react';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));


const PaginaPerfil = () => {
    const classes = useStyles();

    return <div className={classes.root}>
        <Container component="main" maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Pagina de Perfil
            </Typography>
        </Container>
    </div>;
};

export default PaginaPerfil;