const formatDate = (date) => {
  const dateParsed = new Date(date);
  const formatter = new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(dateParsed);
};

export default formatDate;
