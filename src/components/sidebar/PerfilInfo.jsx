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


const PerfilInfo = ({collapsed}) => {
    const classes = useStyles();

    const rootStyles = clsx(classes.divTransition, collapsed && classes.rootCollapsed,
        !collapsed && classes.root);

    const avatarStyles = clsx(classes.divTransition, collapsed && classes.avatarCollapsed,
        !collapsed && classes.avatar);

    return <div className={rootStyles}>
        <Avatar className={avatarStyles}>N</Avatar>
        <div className={classes.avatarPadding}/>
            <Typography variant="h6" noWrap> Lisa Romero</Typography>
            <Typography color="textSecondary" noWrap gutterBottom> lisar.3467@gmail.com</Typography>
            <Divider/>
    </div>;
};

PerfilInfo.propTypes = {
    collapsed: PropTypes.bool
};

export default PerfilInfo;