import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";

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

const PaginaTitulo = ({ titulo, ...props }) => {
  const classes = useStyles();

  return (
    <Typography
      className={classes.heading}
      variant="h3"
      gutterBottom
      {...props}
    >
      {titulo}
    </Typography>
  );
};

PaginaTitulo.propTypes = {
  titulo: PropTypes.string.isRequired,
};

export default PaginaTitulo;
