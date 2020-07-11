const formatNroTelefono = (nroTelefono) => {
  const suffix = nroTelefono.slice(0, 2);

  const number = nroTelefono.slice(2);

  return `+54 9 ${suffix} ${number}`;
};

export default formatNroTelefono;
