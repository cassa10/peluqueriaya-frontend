import yup from "./yup";


const peluqueroSchema = yup.object().shape({
    nombre: yup.string().required().min(2).max(30),
    emailOpcional: yup.string().required("Campo correo electrónico es requerido").email(),
    logo: yup.string().required().url(),
    descripcion: yup.string()
        .required("Campo descripción es requerido").min(20).max(200),
    corteMin: yup.number().transform( cv => isNaN(cv) ? undefined : cv).min(70).max(300),
    distanciaMax: yup.number().transform( cv => isNaN(cv) ? undefined : cv).min(1).max(25),
    tipos: yup.array().min(1,"Debe elegir al menos un tipo de clientela")
});

export default peluqueroSchema;