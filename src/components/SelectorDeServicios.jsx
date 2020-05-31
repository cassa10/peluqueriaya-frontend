import React from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Checkbox, Divider } from '@material-ui/core';
import formatPrice from '../formatters/formatPrice';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 400,
  },
  item: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: "#d1eecc",
  },
  labelNombre: {
    width: '100%',
    minWidth: '200px'
  },
  labelPrecio: {
    width: '100%'
  }
});

//Observacion: corteMin formateado

const SelectorDeServicios = ({ servicios, handleChecked, corteMin}) => {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);

  const handleToggle = (servicio) => () => {
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

  const mostrarServicioMinimoNoElegible = () => {
    return(
      <div>
        <Grid container>
          <ListItem className={classes.item} role={undefined} dense button>
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                defaultChecked
                disabled
                indeterminate
                disableRipple
                color="default"
              />
            </ListItemIcon>
            <ListItemText primary={"Servicio básico"} />
            <Grid>
              <ListItemText primary={corteMin}/>
            </Grid>
          </ListItem>
        </Grid>
        <Divider/>
    </div>
    )
  }

  return (
    <List className={classes.root}>
      {mostrarServicioMinimoNoElegible()}
      {servicios.map((servicio) => {
        const labelId = `checkbox-list-label-${servicio.id}`;
        return (
          <div key={servicio.id}>
            <Grid container>
              <ListItem className={classes.item} role={undefined} dense button onClick={handleToggle(servicio)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.includes(servicio)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    color="default"
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={servicio.nombre} />
                <Grid>
                  <ListItemText id={labelId} primary={formatPrice(servicio.precio)}/>
                </Grid>
              </ListItem>
            </Grid>
            <Divider/>
          </div>
        );
      })}
    </List>
  );
}

SelectorDeServicios.propTypes = {
    servicios: PropTypes.array,
    handleChecked: PropTypes.func,
    corteMin: PropTypes.string,
}


export default SelectorDeServicios;