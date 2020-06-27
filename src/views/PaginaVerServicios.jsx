import React, { useState } from "react";
import { Container, Box } from "@material-ui/core";
import PaginaTitulo from "../components/PaginaTitulo";
import TablaMaterial from "../components/TablaMaterial";
import formatPrice from "../utils/formatters/formatPrice";
import FilaDeChips from "../components/FilaDeChips";
import {
  useDeleteServicio,
  useGetServicios,
} from "../service/ServicioDeServicio";
import reject from "lodash/reject";

const PaginaVerServicios = () => {
  const [servicios, setServicios] = useState([]);
  const { cargando } = useGetServicios(setServicios);
  const { cargandoBorrado, setServicioABorrar } = useDeleteServicio((id) => {
    setServicios((prevState) => reject(prevState, ["id", id]));
  });

  return (
    <Container maxWidth="md">
      <Box justifyContent="center" mt={3}>
        <TablaMaterial
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
          localization={{
            body: {
              editRow: { deleteText: "¿Quieres borrar este servicio?" },
              emptyDataSourceMessage: "No hay servicios",
            },
          }}
          isLoading={cargando || cargandoBorrado}
          editable={{
            onRowDelete: async ({ id }) => setServicioABorrar({ id }),
            deleteTooltip: () => "Borrar",
          }}
        />
      </Box>
    </Container>
  );
};

export default PaginaVerServicios;
