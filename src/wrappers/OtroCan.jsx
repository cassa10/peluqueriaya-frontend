import { useUser } from "../contexts/UserProvider";
import React, { Fragment } from "react";

export const withSegunUserN = (fls) => ({ children, ...props }) => {
  const { esCliente, esPeluquero } = useUser();

  return (
    <Fragment>
      {fls.map(({ f, fProps = {} }, index) => {
        const childrenProps = { ...fProps, ...props };
        return (
          f({ esCliente, esPeluquero }) && (
            <Fragment key={index}>{children(childrenProps)}</Fragment>
          )
        );
      })}
    </Fragment>
  );
};

export const withSegunUser1 = (f) => withSegunUserN([{ f }]);
