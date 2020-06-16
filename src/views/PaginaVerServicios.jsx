import React from "react";
import TablaConSort from "../components/tabla/TablaConSort";
import {
  TableRow,
  TableCell,
  Container,
  Box,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 500,
    fontSize: "1.75rem",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      textAlign: "left",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.25rem",
    },
  },
}));

const PaginaVerServicios = () => {
  const classes = useStyles();
  const createData = (nombre, tipos, precio) => ({ nombre, tipos, precio });

  const headCells = [
    { id: "nombre", label: "Nombre" },
    { id: "tipos", label: "Tipos" },
    { id: "precio", label: "Precio" },
  ];

  const rows = [
    createData("Cupcake", 305, 3.7),
    createData("Donut", 452, 25.0),
    createData("Eclair", 262, 16.0),
    createData("Frozen yoghurt", 159, 6.0),
    createData("Gingerbread", 356, 16.0),
    createData("Honeycomb", 408, 3.2),
    createData("Ice cream sandwich", 237, 9.0),
    createData("Jelly Bean", 375, 0.0),
    createData("KitKat", 518, 26.0),
    createData("Lollipop", 392, 0.2),
    createData("Marshmallow", 318, 0),
    createData("Nougat", 360, 19.0),
    createData("Oreo", 437, 18.0),
  ];

  return (
    <Container maxWidth="md">
      <Box justifyContent="center" mt={3}>
        <Typography className={classes.heading} variant="h2" gutterBottom>
          Servicios
        </Typography>
        <TablaConSort
          columnas={headCells}
          datos={rows}
          fila={(dato, index) => (
            <TableRow hover key={index}>
              <TableCell>{dato.nombre}</TableCell>
              <TableCell>{dato.tipos}</TableCell>
              <TableCell>{dato.precio}</TableCell>
            </TableRow>
          )}
        />
      </Box>
    </Container>
  );
};

export default PaginaVerServicios;
