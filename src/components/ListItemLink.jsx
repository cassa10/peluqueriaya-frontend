import React, { forwardRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const ListItemLink = ({ icon: Icon, primary, to, pathname, disabled }) => {
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
      selected={pathname === to}
      disabled={disabled}
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
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ListItemLink;
