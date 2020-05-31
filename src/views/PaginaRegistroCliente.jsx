import React, {useEffect} from 'react';
import {useUser} from "../contexts/UserProvider";
import Can, {Cliente, Pendiente} from "../wrappers/Can";
import Perfil from "../components/Perfil";
import {CLIENTE} from "../constants";


const PaginaRegistroCliente = () => {
    const { empezarRegistro, abandonarRegistro} = useUser();

    useEffect(() => {
        empezarRegistro(CLIENTE)
        return async () => {
            await abandonarRegistro(CLIENTE);
        }// eslint-disable-next-line
    },[])


    return (
        <Can>
            <Cliente>
                <Perfil/>
            </Cliente>
            <Pendiente>
                <div>
                    <div> Soy pagina de registro de cliente!</div>
                </div>
            </Pendiente>
        </Can>
    );

};

export default PaginaRegistroCliente;