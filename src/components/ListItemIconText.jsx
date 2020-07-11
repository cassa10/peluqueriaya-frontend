import React from "react";
import PropTypes from "prop-types";

import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const ListItemIconText = ({ primary, icon: Icon, ...props }) => {
  return (
    <ListItem {...props}>
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

ListItemIconText.propTypes = {
  primary: PropTypes.any.isRequired,
  icon: PropTypes.any.isRequired,
};

export default ListItemIconText;
