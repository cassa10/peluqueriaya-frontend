import React from "react";
import { Avatar } from "@material-ui/core";
import { validarImagenUrl } from "../utils/validations/yup";
import PropTypes from "prop-types";

const AvatarValidado = ({ children, src, ...props }) => {
  const avatarProps = validarImagenUrl.isValidSync(src)
    ? { src, ...props }
    : props;

  return children ? (
    <Avatar {...avatarProps}>{children}</Avatar>
  ) : (
    <Avatar {...avatarProps} />
  );
};

AvatarValidado.propTypes = {
  children: PropTypes.node,
  src: PropTypes.string,
};

export default AvatarValidado;
