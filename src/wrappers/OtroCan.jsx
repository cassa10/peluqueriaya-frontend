import { useUser } from "../contexts/UserProvider";
import React, { Fragment } from "react";

export const withSegunUserN = (fls) => ({ children, ...props }) => {
  const { esCliente, esPeluquero } = useUser();

  return (
    <Fragment>
      {fls.map(({ f, fProps = {} }) => {
        const childrenProps = { ...fProps, ...props };
        return f({ esCliente, esPeluquero }) && children(childrenProps);
      })}
    </Fragment>
  );
};

export const withSegunUser1 = (f) => withSegunUserN([{ f }]);
