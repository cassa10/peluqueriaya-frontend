import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash';
import PaginaError from "./PaginaError";
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

    const contextPayload = useMemo(
        () => ({setError}),
        [setError]
    );

    const mostrarContenido = () => {
        if (error) {
            const errorPorDefecto = {
                status: "Error :(",
                error: "",
                message: "Ha ocurrido un error inesperado. Por favor intente nuevamente",
            };
            const errorInfo = get(error, "error.response.data", errorPorDefecto);
            return <PaginaError {...errorInfo}/>;
        }
        else {
            return children;
        }
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