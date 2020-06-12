import React from 'react';
import {useUser} from "../contexts/UserProvider";
import {CLIENTE, PELUQUERO, REGISTRADO} from "../assets/constants";
import {getDefaultScheme, Root} from "@mui-treasury/layout";
import theme from "../assets/theme";
import CssBaseline from "@material-ui/core/CssBaseline";

const scheme = getDefaultScheme();
const initialState = {sidebar: {primarySidebar: {collapsed: true, open: true}}};

const withRoot = (app) => () => {
    const App = app;
    const {roles} = useUser();
    scheme.configureEdgeSidebar(builder => {
        builder.hide('primarySidebar',
            roles[CLIENTE] !== REGISTRADO && roles[PELUQUERO] !== REGISTRADO);
    });
    return <Root theme={theme} scheme={scheme} initialState={initialState}>
        {({state: {sidebar}}) => <>
            <CssBaseline/>
            <App collapsed={sidebar.primarySidebar.collapsed}/>
        </>
        }
    </Root>;
};

export default withRoot;