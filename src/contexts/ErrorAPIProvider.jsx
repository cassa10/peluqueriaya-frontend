/* eslint-disable no-unused-vars */
import React, {createContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {useHistory} from "react-router-dom";
import PaginaError from "../views/PaginaError";
import {useUser} from "./UserProvider";

const ErrorAPIContext = createContext();

const ErrorAPIProvider = ({children}) => {
    const {error, setError} = useUser();
    const history = useHistory();

    useEffect(() => {
        return history.listen(() => setError(undefined));
        // eslint-disable-next-line
    }, [])

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
        <ErrorAPIContext.Provider value={{}}>
            {mostrarContenido()}
        </ErrorAPIContext.Provider>
    )
}

ErrorAPIProvider.propTypes = {
    children: PropTypes.element.isRequired
};

export default ErrorAPIProvider;