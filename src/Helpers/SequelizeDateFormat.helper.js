function sequelizeDateFormat() {
  const year = new Date().getFullYear();
  let month = (new Date().getUTCMonth() + 1).toString();
  let date = new Date().getUTCDate().toString();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (date.length < 2) {
    date = "0" + date;
  }
  return `${year}-${month}-${date}`;
}

export default sequelizeDateFormat;
