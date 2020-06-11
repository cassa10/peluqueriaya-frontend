import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

const useStyles = makeStyles({
    star: {
        color: '#e6aa05'
    },
});

const PuntajeStars = ({ puntaje, puntajeMax }) => {

    const classes = useStyles();
    
    const fullStars = () => Math.floor(puntaje);
    
    const isFloat = (n) => Number(n) === n && n % 1 !== 0;

    const halfStars = () => isFloat(puntaje);

    const maxStar = () => puntajeMax;
    
    const emptyStars = () => halfStars()?maxStar() - fullStars() - 1: maxStar() - fullStars();

    const renderFullStars = () => {
        return (
                Array(fullStars())
                  .fill(null)
                  .map((_, i) => {
                    return <StarIcon className={classes.star} key={`fs${i}`} />
                  })
        );
      }
    
      const renderHalfStars = () => {
        return (
            halfStars() && <StarHalfIcon className={classes.star} />
        );
      }
    
      const renderEmptyStars = () => {
        return(
            emptyStars() !== 0
            && Array(emptyStars())
              .fill(null)
              .map((item, i) => {
                return <StarBorderIcon className={classes.star} key={`es${i}`} />
              })
        );
      }
    

    return(
        <div>
            {renderFullStars()}
            {renderHalfStars()}
            {renderEmptyStars()}
        </div>
    );
}

PuntajeStars.propTypes = {
    puntaje: PropTypes.number,
    puntajeMax: PropTypes.number,
}

export default PuntajeStars;