import React from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List, ListItem, ListItemIcon, ListItemText, Checkbox } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: "lightblue",
  },
  labelNombre: {
    width: '100%',
    minWidth: '200px'
  },
  labelPrecio: {
    width: '100%'
  }
});

const SelectorDeServicios = ({ servicios, handleChecked}) => {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);

  const handleToggle = (servicio) => () => {
    console.log(servicio)
    const currentIndex = checked.indexOf(servicio);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(servicio);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    
    setChecked(newChecked);
    handleChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {servicios.map((servicio) => {
        const labelId = `checkbox-list-label-${servicio.id}`;
        return (
          <ListItem key={servicio.id} role={undefined} dense button onClick={handleToggle(servicio)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.includes(servicio)}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={servicio.nombre} />
            <ListItemText id={labelId} primary={`$${servicio.precio}`} />
          </ListItem>
        );
      })}
    </List>
  );
}

export default SelectorDeServicios;