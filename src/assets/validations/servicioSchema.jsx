import yup from "./yup";

const servicioSchema = yup.object().shape({
  precio: yup
    .number()
    .transform((cv) => (isNaN(cv) ? undefined : cv))
    .required()
    .min(100)
    .max(4000),
  tipos: yup.array().min(1, "Debe elegir al menos uno"),
});

export default servicioSchema;
