import yup, { validarImagenUrl } from "./yup";

const clienteSchema = yup.object().shape({
  nombre: yup.string().required().min(2).max(30),
  apellido: yup.string().required().min(2).max(30),
  emailOpcional: yup
    .string()
    .required("Campo correo electrónico es requerido")
    .email(),
  nroTelefono: yup
    .string()
    .required("Campo numero de teléfono es requerido")
    .matches(
      /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/g,
      "Numero de teléfono no es valido"
    ),
  imgPerfil: validarImagenUrl,
});

export default clienteSchema;
