import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import RegistroForm from "../components/form/RegistroForm";
import Campo from "../components/form/Campo";
import BotonSubmit from "../components/form/BotonSubmit";
import AutocompletadoDeUbicacion from "../components/AutocompletadoDeUbicacion";
import {useForm} from "react-hook-form";
import * as yup from "yup";

yup.setLocale({
    mixed: {
        required: 'Campo ${path} es requerido'
    },
    string: {
        min: 'Largo mayor a ${min} digitos',
        max: 'Largo menor a ${max} digitos'
    }
});

const schema = yup.object().shape({
    nombre: yup.string().required().min(2).max(30),
    apellido: yup.string().required().min(2).max(30)
});

const SignUp = () => {
    const [ubicacion, setUbicacion] = useState({
        title: "",
        position: {
            lat: null,
            lng: null
        }
    });
    const [valido, setValido] = useState(false);
    const {register, handleSubmit, watch, errors, getValues} = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        validationSchema: schema
    });

    const onSubmit = data => console.log(data);

    return (
        <RegistroForm nombre="Registro" onSubmit={handleSubmit(onSubmit)} avatarSrc={watch("imgPerfil")}>
            <Grid container item xs={12} sm={6} spacing={2}>
                <Campo sm={6} name="nombre" label="Nombre" autoComplete="given-name"
                       inputRef={register()} autoFocus errors={errors}/>
                <Campo sm={6} name="apellido" label="Apellido" autoComplete="family-name" inputRef={register()}/>
                <Campo name="emailOpcional" label="Correo Electronico" autoComplete="email" inputRef={register()}/>
                <Campo name="nroTelefono" label="Numero de Telefono" autoComplete="tel" inputRef={register()}/>
            </Grid>
            <Grid container item xs={12} sm={6} spacing={2}>
                <Campo name="imgPerfil" label="Enlace de imagen de perfil" autoComplete="photo" inputRef={register()}/>
                <Grid item xs={12}>
                    <AutocompletadoDeUbicacion {...{ubicacion, setUbicacion, valido, setValido}}
                                               name="ubicacion" inputRef={register()}/>
                </Grid>
                <BotonSubmit/>
            </Grid>
            <div>{JSON.stringify(getValues())}</div>
            <div>{JSON.stringify(errors)}</div>
        </RegistroForm>
    );
};

export default SignUp;