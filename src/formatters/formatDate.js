const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat("es-AR", {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  
  return (formatter.format(date));
};
  
export default formatDate;