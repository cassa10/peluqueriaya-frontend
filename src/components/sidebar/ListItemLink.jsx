/* eslint-disable react/display-name */
import React, {forwardRef, useMemo} from "react";
import {Link as RouterLink} from 'react-router-dom';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";

const ListItemLink = ({icon: Icon, primary, to}) => {

    const renderLink = useMemo(
        () => forwardRef((itemProps, ref) =>
            <RouterLink to={to} ref={ref} {...itemProps} />),
        [to]
    );

    return <ListItem button component={renderLink}>
            <ListItemIcon><Icon/></ListItemIcon>
            <ListItemText primary={primary} primaryTypographyProps={{noWrap: true}}/>
        </ListItem>;
};

ListItemLink.propTypes = {
    icon: PropTypes.object.isRequired,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default ListItemLink;