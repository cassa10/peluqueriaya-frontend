import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const OpcionesList = ({ estaDesconectado, listItems }) => {
  const { pathname } = useLocation();

  return listItems.map(
    ({ listItemWrapper: ListItemWrapper, ...listItem }, index) => {
      const props = { pathname, estaDesconectado, ...listItem };
      return <ListItemWrapper key={index} {...props} />;
    }
  );
};

OpcionesList.propTypes = {
  estaDesconectado: PropTypes.bool,
  listItems: PropTypes.array.isRequired,
};

export default OpcionesList;
