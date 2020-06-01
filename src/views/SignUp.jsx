import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import RegistroForm from "../components/form/RegistroForm";
import Campo from "../components/form/Campo";
import BotonSubmit from "../components/form/BotonSubmit";
import AutocompletadoDeUbicacion from "../components/AutocompletadoDeUbicacion";


const SignUp = () => {
    const [ubicacion, setUbicacion] = useState({
        title: "",
        position: {
            lat: null,
            lng: null
        }
    });

    return (
        <RegistroForm nombre="Registro">
            <Grid container item xs={12} sm={6} spacing={2}>
                <Campo sm={6} name="nombre" label="Nombre" autoComplete="given-name" autoFocus/>
                <Campo sm={6} name="apellido" label="Apellido" autoComplete="family-name"/>
                <Campo name="emailOpcional" label="Correo Electronico" autoComplete="email"/>
                <Campo name="nroTelefono" label="Numero de Telefono" autoComplete="tel"/>
            </Grid>
            <Grid container item xs={12} sm={6} spacing={2}>
                <Campo name="imgPerfil" label="Enlace de imagen de perfil" autoComplete="photo"/>
                <Campo name="password" label="Password" type="password" autoComplete="current-password"/>
                <Grid container item display="flex">
                    <AutocompletadoDeUbicacion ubicacion={ubicacion} setUbicacion={setUbicacion}/>
                </Grid>
                <BotonSubmit/>
            </Grid>
        </RegistroForm>
    );
};

export default SignUp;