import React from 'react';
import {withStyles} from "@material-ui/styles";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const StyledRating = withStyles({
    iconFilled: {
        color: "#e6aa05"
    },
    iconHover: {
        color: "#e6aa05"
    }
})(Rating);

const PuntajePeluquero = (props) => (
    <StyledRating readOnly name="puntaje-peluquero" precision={0.5}
                  emptyIcon={<StarBorderIcon fontSize="inherit"/>} {...props}/>
)

export default PuntajePeluquero;