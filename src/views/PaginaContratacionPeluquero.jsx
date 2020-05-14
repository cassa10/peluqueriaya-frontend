import React from 'react';
import {useState} from 'react';
import {useGetPeluquero} from "../service/ServicioDePeluquero";
import CirculitoCargando from "../components/CirculoCargando";


const PaginaContratacionPeluquero = () => {

    const [peluquero, setPeluquero] = useState({id: 0, nombre: ''});

    const {cargando} = useGetPeluquero(setPeluquero)
    



    const createView = () => {
        return(
            <div>
                HOLA ...
                Peluquero: {peluquero.nombre}
            </div>
        );
    }

    return(
        <div>
        {console.log(cargando)}
        {console.log(peluquero)}

            {cargando || ! peluquero.id ?
                <CirculitoCargando />:
                createView()
            }
        </div>
    );
}

export default PaginaContratacionPeluquero;