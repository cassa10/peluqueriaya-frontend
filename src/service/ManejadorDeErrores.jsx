import React, {useEffect, useMemo, useState} from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Typography from "@material-ui/core/Typography";
import PaginaError from "../views/PaginaError";
import {useHistory} from "react-router";

const ManejadorDeErroresContext = React.createContext();
export const useManejadorDeErrores = () => React.useContext(ManejadorDeErroresContext);

const ManejadorDeErrores = ({children}) => {
    const [error, setError] = useState();
    const history = useHistory();

    useEffect(() => {
        const unlisten = history.listen(() => setError(undefined));
        return unlisten;
        // eslint-disable-next-line
    }, [])

    const mostrarPaginaError = (paginaErrorProps) => {
        return <PaginaError {...paginaErrorProps}/>
    }

    const mostrarNotificadorDeErrores = (mensajes) => {
        let abierto = true;
        const manejarClose = (event, reason) => {
            if (reason !== 'clickaway') {
                abierto = false;
                setError(undefined);
            }
        }
        return <div>
            {children}
            <Snackbar open={abierto} autoHideDuration={10000} onClose={manejarClose}>
                <Alert onClose={manejarClose} elevation={6} variant="filled" severity="error">
                    <AlertTitle>{"Error 404 Bad Request"}</AlertTitle>
                    {mensajes.map((mensaje, index) =>
                        <Typography key={index}>{` • ${mensaje}`}</Typography>)}
                </Alert>
            </Snackbar>
        </div>
    }

    const contextPayload = useMemo(
        () => ({setError}),
        [setError]
    );


    const mostrarContenido = () => {
        let contenido = children;

        if (error) {
            console.log(error);
            contenido = mostrarPaginaError({
                titulo: "Error :(",
                mensaje: "Ha ocurrido un error inesperado. Por favor intente nuevamente."
            });
            if (error.response) {
                // eslint-disable-next-line
                switch (error.response.status) {
                    case 400:
                        contenido = mostrarNotificadorDeErrores(error.response.data);
                        break;
                    case 403:
                    case 500:
                        contenido = mostrarPaginaError({
                            titulo: error.response.status,
                            mensaje: error.response.data
                        });
                }
            }
        }
        return contenido;
    }

    return (
        <ManejadorDeErroresContext.Provider value={contextPayload}>
            {mostrarContenido()}
        </ManejadorDeErroresContext.Provider>
    )
}

export default ManejadorDeErrores;