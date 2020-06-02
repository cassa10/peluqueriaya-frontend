import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import RegistroForm from "../components/form/RegistroForm";
import Campo from "../components/form/Campo";
import BotonSubmit from "../components/form/BotonSubmit";
import AutocompletadoDeUbicacion from "../components/AutocompletadoDeUbicacion";
import {useForm} from "react-hook-form";
import clienteSchema from "../assets/validations/clienteSchema";


const SignUp = () => {
    const [ubicacion, setUbicacion] = useState(null);
    const [valido, setValido] = useState(false);
    const {register, handleSubmit, watch, errors} = useForm({
        reValidateMode: "onChange",
        validationSchema: clienteSchema
    });

    const onSubmit = data => console.log(data);
    const formProps = () => ({errors, inputRef: register});

    return (
        <RegistroForm nombre="Registro" onSubmit={handleSubmit(onSubmit)} avatarSrc={watch("imgPerfil")}>
            <Grid container item xs={12} sm={6} spacing={2}>
                <Campo sm={6} name="nombre" label="Nombre" autoComplete="given-name" autoFocus {...formProps()}/>
                <Campo sm={6} name="apellido" label="Apellido" autoComplete="family-name" {...formProps()}/>
                <Campo name="emailOpcional" label="Correo Electronico" autoComplete="email" {...formProps()}/>
                <Campo name="nroTelefono" label="Numero de Telefono" autoComplete="tel" {...formProps()}/>
            </Grid>
            <Grid container item xs={12} sm={6} spacing={2}>
                <Campo name="imgPerfil" label="Enlace de imagen de perfil" autoComplete="photo" {...formProps()}/>
                <Grid item xs={12}>
                    <AutocompletadoDeUbicacion {...{ubicacion, setUbicacion, valido, setValido}}/>
                </Grid>
                <BotonSubmit disabled={!valido}/>
            </Grid>
        </RegistroForm>
    );
};

export default SignUp;