import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";

const ListItemIconText = ({primary, icon: Icon, ...props}) => {
    return <ListItem {...props}>
        <ListItemIcon><Icon/></ListItemIcon>
        <ListItemText primary={primary} primaryTypographyProps={{noWrap: true}}/>
    </ListItem>;
};

ListItemIconText.propTypes = {
    primary: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
};

export default ListItemIconText;