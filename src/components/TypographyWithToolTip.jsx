import React from "react";
import PropTypes from "prop-types";
import { Tooltip, Typography } from "@material-ui/core";

const TypographyWithToolTip = ({ children, title, ...props }) => (
  <Tooltip title={children}>
    <Typography noWrap {...props}>
      {children}
    </Typography>
  </Tooltip>
);

TypographyWithToolTip.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default TypographyWithToolTip;
