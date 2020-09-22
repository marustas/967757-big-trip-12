import {FilterType} from "../presenter/filter.js";
import moment from "moment";

const getOneDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);

  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};

const getFutureDate = (currentDate, pointArrivalDate) => {
  return pointArrivalDate > currentDate && !getOneDay(currentDate, pointArrivalDate);
};

const getPastDate = (currentDate, pointArrivalDate) => {
  return pointArrivalDate < currentDate && !getOneDay(currentDate, pointArrivalDate);
};

const getFutureFilteredPoints = (points, date) => {
  return points.filter((point) => getFutureDate(date, point.arrival));
};

const getPastFilteredPoints = (points, date) => {
  return points.filter((point) => getPastDate(date, point.arrival));
};

export const getPointsByFilter = (points, filterType) => {
  const currentDate = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.FUTURE:
      return getFutureFilteredPoints(points, currentDate);
    case FilterType.PAST:
      return getPastFilteredPoints(points, currentDate);
  }
  return points;
};
