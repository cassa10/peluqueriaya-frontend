import React from 'react';
import {useState} from 'react';
import {useHistory} from "react-router";
import {useGetPeluquero} from "../service/ServicioDePeluquero";
import { usePostPedirTurno } from "../service/ServicioDeTurno";
import { Button } from "@material-ui/core";
import CirculitoCargando from "../components/CirculoCargando";
import SelectorDeServicios from "../components/SelectorDeServicios";
import Swal from 'sweetalert2';

const PaginaContratacionPeluquero = () => {
    
    const {push} = useHistory();

    const [cliente] = useState({id: 1});

    const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

    const [turnoPedido, setTurnoPedido] = useState({id: 0})

    const [peluquero, setPeluquero] = useState({id: 0, nombre: ''});

    const {cargando} = useGetPeluquero(setPeluquero)
    
    const {setParametros} = usePostPedirTurno(setTurnoPedido)

    const precioTotal = () => {
        if(serviciosSeleccionados.length === 0)
            return peluquero.corteMin;
        else
            return sumPrice(serviciosSeleccionados)
    }

    const sumPrice = (servicios) => {
        let acc = peluquero.corteMin;
        for (const s of servicios) {
            acc = acc + s.precio;
        }
        return acc;
    }

    const handleCrearTurno = (value) => {
        if(value){
            const body = {
                idPeluquero: peluquero.id,
                idCliente: cliente.id,
                serviciosSolicitadosId: serviciosSeleccionados.map(s => s.id)
            }
            console.log(body)
            setParametros(body)
        }
    }

    const handleIrAlSearch = () => {
        push("/search")
    }

    const handleDialogCrearTurno = () => {
        let crearTextoDentroDialogPedirTurno = 
        `Se solicitara un turno al peluquero "${peluquero.nombre}" inmediatamente. <hr />
         <br /> <hr /> El precio final es $${precioTotal()}
        `;

        console.log(serviciosSeleccionados)
        Swal.fire({
            title: '¿Estás seguro?',
            html: `${crearTextoDentroDialogPedirTurno}`,
            showCancelButton: true,
            cancelButtonColor: 'Red',
            confirmButtonColor: 'Green',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Dale!',
            reverseButtons: true,
        }).then((target) => handleCrearTurno(target.value))
    }

    const createView = () => {
        return(
            <div>
                HOLA soy el
                Peluquero: {peluquero.nombre} con corteMin: ${peluquero.corteMin}
                <SelectorDeServicios servicios={peluquero.servicios} handleChecked={setServiciosSeleccionados}/>
                <Button color="primary" onClick={handleIrAlSearch}>Volver atrás</Button>
                <Button color="primary" onClick={handleDialogCrearTurno}>CREAR TURNO TEST</Button>
                Turno Pedido: {turnoPedido.id}
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

export default PaginaContratacionPeluquero;