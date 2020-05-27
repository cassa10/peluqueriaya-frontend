import React, {useEffect} from 'react';
import {useUser} from "../contexts/UserProvider";
import Can from "../wrappers/Can";
import Perfil from "../components/Perfil";
import Button from "@material-ui/core/Button";
import {CLIENTE, PENDIENTE_DE_REGISTRO} from "../constants";

const {Cliente, PendienteDeRegistro} = Can;

const PaginaRegistroCliente = () => {
    const {rol, setRol, logout} = useUser();

    useEffect(() => {
        setRol(PENDIENTE_DE_REGISTRO);
        return async () => {
            if (rol === PENDIENTE_DE_REGISTRO) await logout();
        }
    },[setRol, rol, logout])

    return (
        <Can>
            <Cliente>
                <Perfil/>
            </Cliente>
            <PendienteDeRegistro>
                <div>
                    <Button onClick={() => setRol(CLIENTE)}>Setear rol cliente</Button>
                    <div> Soy pagina de registro de cliente!</div>
                </div>
            </PendienteDeRegistro>
        </Can>
    );

};

export default PaginaRegistroCliente;