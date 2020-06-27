import React from "react";
import { Switch } from "@material-ui/core";
import Swal from "sweetalert2";
import {
  usePostPeluqueroConectar,
  usePostPeluqueroDesconectar,
} from "../service/ServicioDePeluquero";
import { useUser } from "../contexts/UserProvider";

const SwitchEstadoPeluquero = () => {
  const { desconectarPeluquero } = usePostPeluqueroDesconectar(() => {});
  const { conectarPeluquero } = usePostPeluqueroConectar(() => {});
  const {
    perfil: {
      peluquero: { estaDesconectado, estaDisponible },
    },
  } = useUser();

  const handleCerrarPeluqueria = (accept) => {
    if (accept) {
      desconectarPeluquero();
      window.location.reload();
    }
  };

  const handleAbrirPeluqueria = (accept) => {
    if (accept) {
      conectarPeluquero();
      window.location.reload();
    }
  };

  const dialogCerrarPeluqueria = (event) => {
    !event.target.checked
      ? Swal.fire({
          title: "¿Estás seguro?",
          html:
            "Si cerras la peluqueria, dejarás de aparecer en las búsquedas. Además, todos los turnos pendientes y en espera se cancelarán!",
          showCancelButton: true,
          cancelButtonColor: "Red",
          confirmButtonColor: "Green",
          cancelButtonText: "Cancelar",
          confirmButtonText: "De acuerdo",
          reverseButtons: true,
        }).then((result) => handleCerrarPeluqueria(result.value))
      : Swal.fire({
          title: "¿Estás a un paso de abrir la peluqueria?",
          html:
            "Al aceptar, aparecerás en la búsquedas y podrás recibir turnos",
          showCancelButton: true,
          cancelButtonColor: "Red",
          confirmButtonColor: "Green",
          cancelButtonText: "Cancelar",
          confirmButtonText: "De acuerdo",
          reverseButtons: true,
        }).then((result) => handleAbrirPeluqueria(result.value));
  };

  return (
    <Switch
      edge="start"
      checked={!estaDesconectado}
      onChange={dialogCerrarPeluqueria}
      disabled={!(estaDisponible || estaDesconectado)}
    />
  );
};

export default SwitchEstadoPeluquero;
