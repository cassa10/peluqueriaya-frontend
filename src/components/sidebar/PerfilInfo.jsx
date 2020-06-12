import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import clsx from "clsx";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";


const useStyles = makeStyles(() => ({
    root: {
        padding: 16
    },
    rootCollapsed: {
        padding: 8
    },
    divTransition: {
        transition: '0.3s'
    },
    avatar: {
        width: 80,
        height: 80
    },
    avatarCollapsed: {
        width: 48,
        height: 48
    },
    avatarPadding: {
        paddingBottom: 16
    }
}));


const PerfilInfo = ({collapsed, imagenSrc, titulo, textoSecundario}) => {
    const classes = useStyles();

    const rootStyles = clsx(classes.divTransition, collapsed && classes.rootCollapsed,
        !collapsed && classes.root);

    const avatarStyles = clsx(classes.divTransition, collapsed && classes.avatarCollapsed,
        !collapsed && classes.avatar);

    return <div className={rootStyles}>
        <Avatar className={avatarStyles} src={imagenSrc}>P</Avatar>
        <div className={classes.avatarPadding}/>
            <Typography variant="h6" noWrap>{titulo}</Typography>
            <Typography color="textSecondary" noWrap gutterBottom>{textoSecundario}</Typography>
            <Divider/>
    </div>;
};

PerfilInfo.propTypes = {
    collapsed: PropTypes.bool,
    imagenSrc: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    textoSecundario: PropTypes.string.isRequired
};

export const ClientePerfilInfo = ({collapsed, imgPerfil, fullName, email}) => (
    <PerfilInfo collapsed={collapsed} textoSecundario={email} titulo={fullName} imagenSrc={imgPerfil}/>
)

ClientePerfilInfo.propTypes = {
    collapsed: PropTypes.bool,
    imgPerfil: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};

export const PeluqueroPerfilInfo = ({collapsed, logo, nombre, email}) => (
    <PerfilInfo collapsed={collapsed} textoSecundario={email} titulo={nombre} imagenSrc={logo}/>
)

PeluqueroPerfilInfo.propTypes = {
    collapsed: PropTypes.bool,
    logo: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};
