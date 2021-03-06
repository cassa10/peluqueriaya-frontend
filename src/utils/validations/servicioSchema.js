import yup from "./yup";

const servicioSchema = yup.object().shape({
  nombre: yup.string().required().min(10).max(60),
  precio: yup
    .number()
    .transform((cv) => (isNaN(cv) ? undefined : cv))
    .required()
    .min(100)
    .max(5000),
  tipos: yup.array().min(1, "Debe elegir al menos uno"),
});

export default servicioSchema;
