/* eslint-disable no-template-curly-in-string */
import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "Campo ${path} es requerido",
  },
  string: {
    min: "Largo mayor a ${min} digitos",
    max: "Largo menor a ${max} digitos",
    email: "Email no es valido",
    url: "Enlace no es valido",
  },
  number: {
    min: "Campo debe ser mayor o igual a ${min}",
    max: "Campo debe ser menor o igual a ${max}",
  },
});

export const validarImagenUrl = yup
  .string()
  .matches(
    /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/g,
    "Enlace no es valido"
  )
  .required("Campo enlace es requerido");

export default yup;
