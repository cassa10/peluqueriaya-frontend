import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Typography from "@material-ui/core/Typography";
import PaginaError, {PaginaError404, PaginaErrorPeluqueroLimiteMaxTurnos} from "../views/PaginaError";
import {useHistory} from "react-router";

const ManejadorDeErroresContext = React.createContext();
export const useManejadorDeErrores = () => React.useContext(ManejadorDeErroresContext);

const ManejadorDeErrores = ({children}) => {
    const [error, setError] = useState();
    const history = useHistory();

    useEffect(() => {
        return history.listen(() => setError(undefined));
        // eslint-disable-next-line
    }, [])

    const mostrarPaginaError = (paginaErrorProps) => {
        return <PaginaError {...paginaErrorProps}/>
    }

    const mostrarNotificadorDeErrores = (message) => {
        let mensajes;
        if (typeof mensajes === 'string') mensajes = [message];
        else mensajes = message;
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
            contenido = mostrarPaginaError({
                titulo: "Error :(",
                mensaje: "Ha ocurrido un error inesperado. Por favor intente nuevamente."
            });
            if (error.response) {
                const {status, data} = error.response;
                // eslint-disable-next-line
                switch (status) {
                    case 400:
                        contenido = mostrarNotificadorDeErrores(data.message);
                        break;
                    case 403:
                        contenido = mostrarPaginaError({
                            titulo: status,
                            mensaje: "403 Forbidden: Usted no tiene permiso para ingresar a la pagina solicitada."
                        });
                        break;
                    case 404:
                        contenido = <PaginaError404/>;
                        break;
                    case 406:
                        contenido = <PaginaErrorPeluqueroLimiteMaxTurnos />
                        break;
                    case 500:
                        contenido = mostrarPaginaError({
                            titulo: status,
                            mensaje: "Error 500 Internal Server Error: Un error inesperado a ocurrido. Por favor intente nuevamente."
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

ManejadorDeErrores.propTypes = {
    children: PropTypes.element.isRequired
};

export default ManejadorDeErrores;