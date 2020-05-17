import React, {useState} from 'react';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


const SeleccionOrdenarPor = ({setFiltro, limpiarFiltro}) => {
    const [ordenarPor, setOrdenarPor] = useState("");

    const handleChange = event => {
        const nuevoOrdenarPor = event.target.value
        setOrdenarPor(nuevoOrdenarPor);
        if (nuevoOrdenarPor !== "Ninguno") setFiltro({sort: nuevoOrdenarPor});
        else limpiarFiltro("sort");
    };

    return <FormControl>
        <Select value={ordenarPor} onChange={handleChange} displayEmpty>
            <MenuItem aria-label="None" value={""} disabled> Ordenar por</MenuItem>
            <MenuItem value={"Ninguno"}>Ninguno</MenuItem>
            <MenuItem value={"corteMin,asc"}>Menor Corte Minimo</MenuItem>
            <MenuItem value={"corteMin,desc"}>Mayor Corte Minimo</MenuItem>
        </Select>
    </FormControl>
};

SeleccionOrdenarPor.propTypes = {
    setFiltro: PropTypes.func,
    limpiarFiltro: PropTypes.func
}


export default SeleccionOrdenarPor;