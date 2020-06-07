const formatTime = (date) => {
    const dateParsed = new Date(date);
    const formatter = new Intl.DateTimeFormat("es-AR", {
      hour: '2-digit',
      minute: '2-digit',
    });
    
    return (formatter.format(dateParsed));
  };
    
  export default formatTime;