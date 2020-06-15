import React from "react";
import { Avatar } from "@material-ui/core";
import { validarImagenUrl } from "../assets/validations/yup";

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

export default AvatarValidado;
