import React from 'react';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const HairdresserResults = ({ results, buttonGoHome }) => {

    const classes = useStyles();

    const emptyResult = () => {
        return (
            <Box bgcolor="primary.main" color="primary.contrastText" textAlign="center" m={14}>
                <Box bgcolor="primary.main" color="primary.contrastText" m={4}>
                    <Typography variant="h5" component="h2">
                        No hay peluqueros disponibles en tu zona :C
                    </Typography>
                    <Box m={1}>
                        {buttonGoHome}  
                    </Box>    
                </Box>
                
                
            </Box>
        )
    }

    const buildStatusHairdresser = (status) => {
        if(status === "DISPONIBLE"){
            return (
                <Typography className={classes.title} color="secondary" gutterBottom>
                        {status}
                </Typography>
            );
        }
        return(
            <Typography className={classes.title} color="error" gutterBottom>
                        {status}
            </Typography>
        );
    }

    const defaultLogoIfNeed = (logoSrc) => {
        if (logoSrc.length > 0){
            return logoSrc
        }
        return "https://2.bp.blogspot.com/-JmAJ1XEBGfE/UTPme5-0HpI/AAAAAAAAARE/bT_fEs-9vQ4/s1600/No-Logo-Available.png"
    }

    const buildCardHairdresser = (hairdresser) => {
        console.log(hairdresser)
        return (
            <Box key={hairdresser.id} textAlign="center" m={2}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        {buildStatusHairdresser(hairdresser.estado)}
                        <img
                            src={defaultLogoIfNeed(hairdresser.logo)}
                            width="150"
                            alt="logo"
                        />
                        <Typography variant="h5" component="h2">
                            {hairdresser.nombre}
                        </Typography>
                        <hr />
                        <Typography variant="body2" component="p">
                            Corte minimo | ${hairdresser.corteMin}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Servicios</Button>
                    </CardActions>
                </Card>
            </Box>
        );
    }

    const buildResults = () => {
        return (
            <div>
                {results.map(h => buildCardHairdresser(h))}
            </div>
        );
    }

    const lookupResults = (results) => {
        console.log(results.length)
        if (results.length <= 0) {
            return (emptyResult());
        }else {
            return (buildResults());
        }
    }

    return (
        <Box>
            {lookupResults(results)}
        </Box>
    );
};

export default HairdresserResults;