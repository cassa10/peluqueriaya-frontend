/* eslint-disable no-template-curly-in-string */
import * as yup from "yup";

yup.setLocale({
    mixed: {
        required: 'Campo ${path} es requerido'
    },
    string: {
        min: 'Largo mayor a ${min} digitos',
        max: 'Largo menor a ${max} digitos',
        email: 'Email no es valido',
        url: 'Enlace no es valido'
    }
});

export default yup;