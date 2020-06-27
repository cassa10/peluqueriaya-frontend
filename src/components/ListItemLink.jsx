import React, { forwardRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const ListItemLink = ({ icon: Icon, primary, to, location, ...props }) => {
  const renderLink = useMemo(
    () =>
      forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem
      button
      component={renderLink}
      selected={location === to}
      {...props}
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText
        primary={primary}
        primaryTypographyProps={{ noWrap: true }}
      />
    </ListItem>
  );
};

ListItemLink.propTypes = {
  icon: PropTypes.object.isRequired,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default ListItemLink;
