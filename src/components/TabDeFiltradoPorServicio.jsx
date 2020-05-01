import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useServicioDeServicio from "../service/useServicioDeServicio";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    img: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

const TabDeFiltradoPorServicio = ({buscar, tipoDeServicio, setTipoDeServicio}) => {
    const classes = useStyles();
    const [tiposDeServicio, setTiposDeServicio] = useState([]);
    const [{obtenerTiposDeServicio, cargandoTDS}] = useServicioDeServicio();

    useEffect(() => {
        obtenerTiposDeServicio((tiposDeServicio) => setTiposDeServicio(tiposDeServicio))
        // eslint-disable-next-line
    }, []);

    const handleChange = (event, nuevoTipoDeServicio) => {
        setTipoDeServicio(nuevoTipoDeServicio);
        buscar(nuevoTipoDeServicio);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                {!cargandoTDS &&
                <Tabs
                    value={tipoDeServicio}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {tiposDeServicio.map((tipo) =>
                        <Tab label={tipo.nombre}
                             icon={<img className={classes.img}
                                        src={require(`../assets/images/${tipo.id}.jpg`)}
                                        alt="logo"/>}
                             key={tipo.id}
                             value={tipo.id}/>)}
                </Tabs>}
            </AppBar>
        </div>
    );
};

export default TabDeFiltradoPorServicio;