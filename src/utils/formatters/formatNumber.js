const formatNumber = (number) => {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "decimal",
  });

  return formatter.format(number);
};

export default formatNumber;
