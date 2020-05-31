import React from 'react';
import {useHistory} from "react-router-dom";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: "center",
        marginTop: "5%",
        padding: "4%",
        backgroundColor: theme.palette.primary.main
    },
    font: {
        color: theme.palette.secondary.main,
        textAlign: "center",
    },
    paper: {
        padding: "inherit"
    },
    gridItem: {
    margin: "auto"
    }
}));

const PaginaError = ({message, error, status, subErrors = []}) => {
    const clases = useStyles();
    let {goBack} = useHistory();

    return <Container maxWidth="sm" className={clases.root}>
        <Grid container justify={"center"} direction={"column"} spacing={3}>
            <Grid item>
                <Paper elevation={3}>
                    <Typography variant={"h1"} className={clases.font}>
                        {status}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item className={clases.gridItem}>
                <Paper className={clases.paper} elevation={3}>
                    <Typography className={clases.font} variant={"h6"}>
                        {`Error ${error}: ${message}`}
                    </Typography>
                    {subErrors.map((mensaje, index) =>
                        <Typography className={clases.font} variant={"body1"} key={index}>
                            {` • ${mensaje}`}
                        </Typography>)}
                </Paper>
            </Grid>
            <Grid item className={clases.gridItem}>
                <ButtonGroup variant="contained" color="secondary">
                    <Button onClick={() => goBack()}>Atras</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    </Container>
}

PaginaError.propTypes = {
    message: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    status: PropTypes.any,
    subErrors: PropTypes.array,
}

export default PaginaError;