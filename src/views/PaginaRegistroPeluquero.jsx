import React, {useEffect} from 'react';
import Can, {Peluquero, Pendiente} from "../wrappers/Can";
import Perfil from "../components/Perfil";
import {PELUQUERO} from "../constants";
import {useUser} from "../contexts/UserProvider";


const PaginaRegistroPeluquero = () => {
    const { empezarRegistro, abandonarRegistro } = useUser();

    useEffect(() => {
        empezarRegistro(PELUQUERO)
        return async () => {
            await abandonarRegistro(PELUQUERO);
        }// eslint-disable-next-line
    },[])

    return (
        <Can>
            <Peluquero>
                <Perfil/>
            </Peluquero>
            <Pendiente>
                <div>
                    <div> Soy pagina de registro de peluquero!</div>
                </div>
            </Pendiente>
        </Can>
    );

};


export default PaginaRegistroPeluquero;