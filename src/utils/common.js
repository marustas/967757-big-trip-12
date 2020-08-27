import moment from "moment";
const DATE_LENGTH = 2;
const INPUT_DAY_FORMAT = `DD`;
const INPUT_MONTH_YEAR_FORMAT = `MMM YY`;
const INPUT_MONTH_DAY_FORMAT = `MMM DD`;
const INPUT_YEAR_MONTH_DAY_FORMAT = `YYYY-MM-DD`;
const INPUT_YEAR_MONTH_DAY_TIME_FORMAT = `YYYY-MM-DDTHH:MM`;
const INPUT_TIME_FORMAT = `HH:mm`;

// Корректировка формата времени: добавляет вначале ноль, если число однозначное;
const correctFormat = (number) => {
  const date = number.toString();

  if (date.length < DATE_LENGTH) {
    const newDate = `0` + date;
    return newDate;
  }

  return date;
};

// Корректировка формата даты: год, день, часы, минуты;
const correctDayFormat = (date) => {
  return moment(date).format(INPUT_DAY_FORMAT);
};

const correctMonthAndYearFormat = (date) => {
  return moment(date).format(INPUT_MONTH_YEAR_FORMAT);
};

const correctMonthAndDayFormat = (date) => {
  return moment(date).format(INPUT_MONTH_DAY_FORMAT);
};

const correctDateFormat = (date) => {
  return moment(date).format(INPUT_YEAR_MONTH_DAY_FORMAT);
};

const correctDateISOFormat = (date) => {
  return moment(date).format(INPUT_YEAR_MONTH_DAY_TIME_FORMAT);
};

const correctTimeFormat = (time) => {
  return moment(time).format(INPUT_TIME_FORMAT);
};

const calculateTripDuration = (departure, arrival) => {
  return moment.duration(moment(arrival).diff(moment(departure)));
};

// Расчет длительности путешествия;
const calculateTripTime = (departure, arrival) => {

  const duration = calculateTripDuration(departure, arrival);

  const durationMinutes = duration.minutes();
  const durationHours = duration.hours();
  const durationDays = duration.days();

  if (durationDays < 0 && durationHours < 0) {
    return `${correctFormat(durationMinutes)}М`;
  } else if (durationDays <= 0) {
    return `${correctFormat(durationHours)}H ${correctFormat(durationMinutes)}М`;
  } else {
    return `${correctFormat(durationDays)}D ${correctFormat(durationHours)}H ${correctFormat(durationMinutes)}М`;
  }
};

// Получение цены путешествия (цена путешествия + цена предложений);
const getPrice = (points) => {

  let pointsPrices = 0;
  let offersPrices = 0;

  for (const point of points) {
    pointsPrices += point.price;

    for (const offer of point.offers) {
      if (offer.isChecked) {
        offersPrices += offer.price;
      }
    }
  }

  return pointsPrices + offersPrices;
};

export {
  correctDateFormat,
  correctDateISOFormat,
  correctMonthAndYearFormat,
  correctMonthAndDayFormat,
  correctDayFormat,
  correctTimeFormat,
  getPrice,
  calculateTripTime,
  INPUT_YEAR_MONTH_DAY_FORMAT,
  calculateTripDuration,
};
