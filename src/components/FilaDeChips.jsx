import React from "react";
import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  chip: {
    margin: 2,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const FilaDeChips = ({ valores, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.chips}>
      {valores.map((valor) => (
        <Chip
          key={valor}
          label={valor}
          className={classes.chip}
          color="secondary"
          {...props}
        />
      ))}
    </div>
  );
};

FilaDeChips.propTypes = {
  valores: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FilaDeChips;
