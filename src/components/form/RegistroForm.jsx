import React from "react";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        width: theme.spacing(8),
        height: theme.spacing(8)
    }
}));

const RegistroForm = ({nombre, onSubmit, avatarSrc, children}) => {
    const clases = useStyles();

    return (
        <Container component="main" maxWidth="md">
            <div className={clases.paper}>
                <Avatar className={clases.avatar} src={avatarSrc}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {nombre}
                </Typography>
                <form className={clases.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        {children}
                    </Grid>
                </form>
            </div>
        </Container>);
}

RegistroForm.propTypes = {
    nombre: PropTypes.string.isRequired,
    avatarSrc: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired,
};

export default RegistroForm;