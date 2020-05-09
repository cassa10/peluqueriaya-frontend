import React, {useState} from 'react';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";


const SeleccionOrdenarPor = ({setFiltro, limpiarFiltro}) => {
    const [ordenarPor, setOrdenarPor] = useState("");

    const handleChange = event => {
        const nuevoOrdenarPor = event.target.value
        setOrdenarPor(nuevoOrdenarPor);
        if (nuevoOrdenarPor !== "Ninguno") setFiltro({sort: nuevoOrdenarPor});
        else limpiarFiltro("sort");
    };

    return <FormControl variant="outlined">
        <Paper elevation={0}>
            <Select native value={ordenarPor} onChange={handleChange} autoWidth>
                <option aria-label="None" value={""} disabled> Ordenar por</option>
                <option value={null}>Ninguno</option>
                <option value={"corteMin,asc"}>Menor Corte Minimo</option>
                <option value={"corteMin,desc"}>Mayor Corte Minimo</option>
            </Select>
        </Paper>
    </FormControl>
};

SeleccionOrdenarPor.propTypes = {
    setFiltro: PropTypes.func,
    limpiarFiltro: PropTypes.func
}


export default SeleccionOrdenarPor;