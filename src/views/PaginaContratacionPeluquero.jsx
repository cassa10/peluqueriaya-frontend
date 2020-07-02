import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useGetPeluqueroAContratar } from "../service/ServicioDePeluquero";
import { usePostPedirTurno } from "../service/ServicioDeTurno";
import { Button, Grid, Typography } from "@material-ui/core";
import CirculitoCargando from "../components/CirculoCargando";
import SelectorDeServicios from "../components/SelectorDeServicios";
import { makeStyles } from "@material-ui/core/styles";
import { sumBy } from "lodash";
import Swal from "sweetalert2";
import formatPrice from "../utils/formatters/formatPrice";
import StyledRating from "../components/PuntajePeluquero";
import { withSegunUserN } from "../wrappers/OtroCan";
import { useAuth0 } from "../contexts/Auth0Provider";
import { URI_LOGIN_CLIENTE } from "../utils/constants";
import getLogoOrDefault from "../utils/getLogoOrDefault";

const useStyles = makeStyles({
  gridInfoPeluquero: {
    marginTop: "45px",
    backgroundColor: "#0eacd4",
    borderLeft: "10px solid #017787",
    borderRight: "10px solid #017787",
  },
  gridLogoItem: {
    marginTop: "10px",
    marginBottom: "5px",
  },
  logoImg: {
    minWidth: 150,
    maxWidth: 150,
    minHeight: 150,
    maxHeight: 150,
    border: "solid",
    borderColor: "#017787",
  },
  selectorServicios: {
    marginTop: "100px",
  },
  demoradoBox: {
    marginTop: "2px",
    marginBottom: "-15px",
    color: "#6f0000",
  },
  peluqueroNombre: {
    color: "#ffffff",
  },
  botonesNav: {
    backgroundColor: "#0eacd4",
    borderLeft: "10px solid #017787",
    borderRight: "10px solid #017787",
  },
  gridSelectorServices: {
    backgroundColor: "#0eacd4",
    borderLeft: "10px solid #017787",
    borderRight: "10px solid #017787",
    marginTop: "10px",
  },
});

const PaginaContratacionPeluquero = () => {
  const classes = useStyles();

  const { push } = useHistory();

  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

  const [peluquero, setPeluquero] = useState({ id: 0, nombre: "" });

  const { cargando } = useGetPeluqueroAContratar(setPeluquero);

  const { login } = useAuth0();

  const handleTurnoPedidoSuccess = (turno) => {
    if (turno.estado === "PENDIENTE") {
      Swal.fire(
        "Turno solicitado!",
        "En unos minutos, se recibirá un email cuando el peluquero confirme el turno.",
        "success"
      ).then(() => push("/search"));
    } else {
      Swal.fire(
        "Turno en espera",
        "Su turno fue agregado en la cola de espera del peluquero, puede demorar mucho. Igualmente puede cancelar el turno mientras este se encuentre en espera.",
        "success"
      ).then(() => push("/search"));
    }
  };

  const { setParametros } = usePostPedirTurno(handleTurnoPedidoSuccess);

  const precioTotal = () =>
    peluquero.corteMin + sumBy(serviciosSeleccionados, "precio");

  const handleCrearTurno = (value) => {
    if (value) {
      const body = {
        ubicacion: JSON.parse(sessionStorage.getItem("ubicacion")),
        idPeluquero: peluquero.id,
        serviciosSolicitadosId: serviciosSeleccionados.map((s) => s.id),
      };
      setParametros(body);
    }
  };

  const handleIrAlSearch = () => {
    push("/search");
  };

  const showDialogServicio = (servicio) => {
    return `- ${servicio.nombre}: ${formatPrice(servicio.precio)} <br />`;
  };

  const showDialogServicios = (serviciosSeleccionados) => {
    let servicioBasicoItem = `- Servicio basico: ${formatPrice(
      peluquero.corteMin
    )}`;
    if (serviciosSeleccionados.length > 0) {
      const servicesItems = serviciosSeleccionados.map((s) =>
        showDialogServicio(s)
      );
      return `${servicesItems.join(" ")}
                    ${servicioBasicoItem}`;
    }
    return servicioBasicoItem;
  };

  const handleDialogCrearTurno = () => {
    let crearTextoDentroDialogPedirTurno = `Se solicitará un turno al peluquero "${
      peluquero.nombre
    }" inmediatamente. <hr />
        ${showDialogServicios(serviciosSeleccionados)}
         <br /> <hr /> El precio final es ${formatPrice(precioTotal())}
        `;

    Swal.fire({
      title: "¿Estás seguro?",
      html: `${crearTextoDentroDialogPedirTurno}`,
      showCancelButton: true,
      cancelButtonColor: "Red",
      confirmButtonColor: "Green",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Dale!",
      reverseButtons: true,
    }).then((target) => handleCrearTurno(target.value));
  };

  const handleMostrarDemora = (peluquero) => {
    if (peluquero.estado === "OCUPADO") {
      return (
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography className={classes.demoradoBox} textalign="center">
            OCUPADO
          </Typography>
        </Grid>
      );
    }
    return <div />;
  };

  const mostrarDatosPeluquero = (peluquero) => {
    return (
      <Grid
        container
        item
        className={classes.gridInfoPeluquero}
        direction="row"
        justify="center"
        alignItems="center"
        spacing={4}
      >
        {handleMostrarDemora(peluquero)}
        <Grid item className={classes.gridLogoItem}>
          <img
            className={classes.logoImg}
            src={getLogoOrDefault(peluquero.logo)}
            alt="logo"
          />
        </Grid>
        <Grid item>
          {peluquero.puntuacionPromedio > 0 && (
            <StyledRating defaultValue={peluquero.puntuacionPromedio} />
          )}
          <Typography
            className={classes.peluqueroNombre}
            textalign="center"
            variant="h5"
            component="h2"
          >
            {peluquero.nombre}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const CanClienteNoCliente = withSegunUserN([
    {
      f: ({ esCliente }) => esCliente,
      fProps: {
        onClick: () => login(URI_LOGIN_CLIENTE),
        nombre: "Registrate y pedí turno!",
      },
    },
    {
      f: ({ esCliente }) => !esCliente,
      fProps: { onClick: handleDialogCrearTurno, nombre: "Pedir turno" },
    },
  ]);

  const createView = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs />
        <Grid item xs={6}>
          {mostrarDatosPeluquero(peluquero)}
          <Grid
            container
            className={classes.gridSelectorServices}
            direction="row"
            justify="center"
            alignItems="center"
            spacing={4}
          >
            <SelectorDeServicios
              servicios={peluquero.servicios}
              handleChecked={setServiciosSeleccionados}
              corteMin={peluquero.corteMin}
            />
          </Grid>
          <Grid
            container
            className={classes.botonesNav}
            direction="row"
            justify="center"
            alignItems="center"
            spacing={4}
          >
            <Grid item>
              <Button color="default" onClick={handleIrAlSearch}>
                Volver atrás
              </Button>
            </Grid>
            <Grid item>
              <CanClienteNoCliente>
                {({ onClick, nombre }) => (
                  <Button color="default" onClick={onClick} key={nombre}>
                    {nombre}
                  </Button>
                )}
              </CanClienteNoCliente>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs />
      </Grid>
    );
  };

  return (
    <div>
      {cargando || !peluquero.id ? <CirculitoCargando /> : createView()}
    </div>
  );
};

export default PaginaContratacionPeluquero;
