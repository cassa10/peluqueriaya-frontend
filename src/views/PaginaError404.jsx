import React from "react";
import PaginaError from "../service/errores/PaginaError";

const PaginaError404 = () => {
    const error = {
        status: 404,
        error: "Not Found",
        message: "La pagina solicitada no existe"
    };

    return <PaginaError {...error}/>;
};

export default PaginaError404;