import React from "react";
import { useUser } from "../contexts/UserProvider";
import { getDefaultScheme, Root } from "@mui-treasury/layout";
import theme from "../assets/theme";
import { CssBaseline } from "@material-ui/core";

const scheme = getDefaultScheme();
const initialState = {
  sidebar: { primarySidebar: { collapsed: true, open: true } },
};

const withRoot = (app) => () => {
  const App = app;
  const { esCliente, esPeluquero } = useUser();
  scheme.configureEdgeSidebar((builder) => {
    builder.hide("primarySidebar", !esCliente && !esPeluquero);
  });
  return (
    <Root theme={theme} scheme={scheme} initialState={initialState}>
      {({ state: { sidebar } }) => (
        <>
          <CssBaseline />
          <App collapsed={sidebar.primarySidebar.collapsed} />
        </>
      )}
    </Root>
  );
};

export default withRoot;
