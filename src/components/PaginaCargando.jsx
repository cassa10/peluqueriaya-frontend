import React from "react";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import Container from "@material-ui/core/Container";

const PaginaCargando = () => (
  <Container maxWidth="md">
    <Box my={5}>
      <Skeleton variant="rect" height={350} />
    </Box>
  </Container>
);

export default PaginaCargando;
