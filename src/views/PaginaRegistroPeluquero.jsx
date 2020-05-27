import React, {useEffect} from 'react';
import Can from "../wrappers/Can";
import Perfil from "../components/Perfil";
import {PELUQUERO, PENDIENTE_DE_REGISTRO} from "../constants";
import Button from "@material-ui/core/Button";
import {useUser} from "../contexts/UserProvider";

const {PendienteDeRegistro, Peluquero} = Can;

const PaginaRegistroPeluquero = () => {
    const {logout, rol, setRol} = useUser();

    useEffect(() => {
        setRol(PENDIENTE_DE_REGISTRO);
        return async () => {
            if (rol === PENDIENTE_DE_REGISTRO) await logout();
        }
    },[setRol, rol, logout])

    return (
        <Can>
            <Peluquero>
                <Perfil/>
            </Peluquero>
            <PendienteDeRegistro>
                <div>
                    <Button onClick={() => setRol(PELUQUERO)}>Setear rol peluquero</Button>
                    <div> Soy pagina de registro de peluquero!</div>
                </div>
            </PendienteDeRegistro>
        </Can>
    );

};


export default PaginaRegistroPeluquero;