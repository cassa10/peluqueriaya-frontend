import React, {useState} from 'react';
import {useGetPeluqueroLogeado} from "../service/ServicioDePeluquero";
import CirculitoCargando from "../components/CirculoCargando";

const PaginaGestionPeluquero = () => {

    const [peluquero, setPeluquero] = useState({id: 0, nombre: ''});

    const {cargando} = useGetPeluqueroLogeado(setPeluquero)

    const createView = () => {
        return(
            <div>
                Peluquero {peluquero.id} {peluquero.nombre}
            </div>
        );
    } 

    return(
        
        <div>
            {cargando || ! peluquero.id ?
                <CirculitoCargando />:
                createView()
            }
            
        </div>
    );
}

export default PaginaGestionPeluquero;