/* eslint-disable no-unused-vars */
import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {useHistory} from "react-router-dom";
import PaginaError from "../views/PaginaError";

const ErrorAPIContext = createContext();
export const useErrorAPI = () => useContext(ErrorAPIContext);

const ErrorAPIProvider = ({children}) => {
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
            const {status, ...paginaErrorProps} = get(error, "response.data", {});
            return <PaginaError {...paginaErrorProps}/>;
        }
        else {
            return children;
        }
    }

    return (
        <ErrorAPIContext.Provider value={contextPayload}>
            {mostrarContenido()}
        </ErrorAPIContext.Provider>
    )
}

ErrorAPIProvider.propTypes = {
    children: PropTypes.element.isRequired
};

export default ErrorAPIProvider;