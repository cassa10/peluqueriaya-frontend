import React, { useState } from "react";
import { Container, Box } from "@material-ui/core";
import PaginaTitulo from "../components/PaginaTitulo";
import TablaConIconos from "../components/TablaConIconos";
import formatPrice from "../utils/formatters/formatPrice";
import FilaDeChips from "../components/FilaDeChips";
import { useGetServicios } from "../service/ServicioDeServicio";

const PaginaVerServicios = () => {
  const [servicios, setServicios] = useState([]);
  const { cargando } = useGetServicios(setServicios);

  return (
    <Container maxWidth="md">
      <Box justifyContent="center" mt={3}>
        <TablaConIconos
          isLoading={cargando}
          title={<PaginaTitulo titulo="Servicios" />}
          columns={[
            { field: "nombre", title: "Nombre" },
            {
              field: "precio",
              title: "Precio",
              type: "currency",
              render: ({ precio }) => formatPrice(precio),
            },
            {
              field: "tipos",
              title: "Tipos",
              render: (rowData) => (
                <FilaDeChips valores={rowData.tipos} size="small" />
              ),
            },
          ]}
          data={servicios}
        />
      </Box>
    </Container>
  );
};

export default PaginaVerServicios;
