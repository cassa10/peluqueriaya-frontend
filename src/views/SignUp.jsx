import React, {useState} from 'react';
import RegistroForm from "../components/form/RegistroForm";
import Grid from "@material-ui/core/Grid";
import Campo from "../components/form/Campo";
import CheckBoxsDeTiposDePeluquero from "../components/CheckBoxsDeTiposDePeluquero";
import AutocompletadoDeUbicacion from "../components/AutocompletadoDeUbicacion";
import BotonSubmit from "../components/form/BotonSubmit";
import {useForm} from "react-hook-form";

const SignUp = () => {
    const [setFiltro] = useState(null);
    const [ubicacion, setUbicacion] = useState(null);
    const [valido, setValido] = useState(false);
    const {register, handleSubmit, watch, errors, getValues} = useForm({
        reValidateMode: "onChange"
    });

    const onSubmit = data => console.log(data);

    const formProps = () => ({errors, inputRef: register});

    return <RegistroForm onSubmit={handleSubmit(onSubmit)} nombre="Registro Peluquero" avatarSrc={watch("logo")}>
        <Grid container item xs={12} sm={6} spacing={2}>
            <Campo name="nombre" label="Nombre" autoComplete="organization" autoFocus {...formProps()}/>
            <Campo name="emailOpcional" label="Correo Electrónico" autoComplete="email" {...formProps()}/>
            <Campo name="logo" label="Enlace de logo" autoComplete="photo" {...formProps()}/>
            <Grid item xs={12}>
                <AutocompletadoDeUbicacion {...{ubicacion, setUbicacion, valido, setValido}}/>
            </Grid>
        </Grid>
        <Grid container item xs={12} sm={6} spacing={2}>
            <Campo name="descripcion" label="Descripción" multiline rows={3} {...formProps()}/>
            <Campo sm={6} type="number" name="corteMin" label="Precio fijo por trabajo" {...formProps()}/>
            <Campo sm={6} type="number" name="distanciaMax" label="Distancia maxima a recorrer por cliente"
                   InputLabelProps={{ shrink: true }} {...formProps()}/>
            <Grid container item xs={12} justify={"center"} p={4}>
                <CheckBoxsDeTiposDePeluquero setFiltro={setFiltro}/>
            </Grid>
            <BotonSubmit/>
        </Grid>
        <div>{JSON.stringify(getValues())}</div>
    </RegistroForm>
};

export default SignUp;