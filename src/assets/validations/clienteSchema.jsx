import yup from "./yup"

const clienteSchema = yup.object().shape({
    nombre: yup.string().required().min(2).max(30),
    apellido: yup.string().required().min(2).max(30),
    emailOpcional: yup.string().required().email(),
    nroTelefono: yup.string().required()
        .matches(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/g,
            "Numero de telefono no es valido"),
    imgPerfil: yup.string().required().url()
});

export default clienteSchema;