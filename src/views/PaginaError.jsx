import React from 'react';
import {useHistory} from "react-router-dom";
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
    gridItem: {
      margin: "auto"
    }
}));

const PaginaError = ({titulo, mensaje}) => {
    const clases = useStyles();
    let {goBack, push} = useHistory();

    return <Container maxWidth="sm" className={clases.root}>
        <Grid container justify={"center"} direction={"column"} spacing={3}>
            <Grid item>
                <Paper elevation={3}>
                    <Typography variant={"h1"} className={clases.font}>
                        {titulo}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item className={clases.gridItem}>
                <Paper elevation={3}>
                    <Typography className={clases.font} variant={"h6"}>
                        {mensaje}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item className={clases.gridItem}>
                <ButtonGroup variant="contained" color="secondary">
                    {/*<Button onClick={() => goBack()}>Regresar</Button>*/}
                    <Button onClick={() => push("/")}>Home</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    </Container>
}

export const PaginaError404 = () => (
    <PaginaError
        titulo={"404"}
        mensaje={"Error 404 Not Found: La pagina solicitada no existe en nuestro servidor."}
    />
);

export default PaginaError;