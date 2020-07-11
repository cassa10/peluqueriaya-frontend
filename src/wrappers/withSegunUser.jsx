import { useUser } from "../contexts/UserProvider";
import { Children, cloneElement, isValidElement } from "react";

export const withSegunUserN = (fls) => ({ children, ...props }) => {
  const { esCliente, esPeluquero } = useUser();

  return fls.map(({ f, fProps = {} }, index) => {
    const childrenProps = { index, ...fProps, ...props };
    return f({ esCliente, esPeluquero }) && children(childrenProps);
  });
};

export const withSegunUser1 = (f) => ({ children, ...props }) => {
  const { esCliente, esPeluquero } = useUser();

  const pasarProps = (children, props) => {
    return Children.map(children, (child) => {
      if (isValidElement(child)) {
        return cloneElement(child, props);
      }
      return child;
    });
  };

  return f({ esCliente, esPeluquero }) && pasarProps(children, props);
};
