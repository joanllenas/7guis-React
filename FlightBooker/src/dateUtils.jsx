const DATE_SEPARATOR = ".";

function fromShortDate(dateString) {
  let [day, month, year] = dateString.split(DATE_SEPARATOR).map( (n) => parseInt(n,10) );
  month = month-1;
  var date = new Date(year, month, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

export {DATE_SEPARATOR, fromShortDate};
