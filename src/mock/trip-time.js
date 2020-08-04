import {getRandom} from '../utils';

const dateSettings = {
  MAX_INTERVAL_FOR_START_DAY: 15,
  MIN_INTERVAL_FOR_END_DAY: 0.1,
  MAX_INTERVAL_FOR_END_DAY: 0.2,
  ONE_DAY_ON_MILLISECONDS: 24 * 3600 * 1000
};

const getStartDate = () => Date.now() + (getRandom(dateSettings.MAX_INTERVAL_FOR_START_DAY) * dateSettings.ONE_DAY_ON_MILLISECONDS);

const getEndDate = (startDateValue) => startDateValue + (getRandom(dateSettings.MAX_INTERVAL_FOR_END_DAY, dateSettings.MIN_INTERVAL_FOR_END_DAY) * dateSettings.ONE_DAY_ON_MILLISECONDS);

const generateTripEventDateData = () => {
  const startDate = getStartDate();

  return {
    startDate: new Date(startDate),
    endDate: new Date(getEndDate(startDate)),
  };
};

const getTripDaysString = (item) => (`${item.date.startDate.getFullYear()}-${item.date.startDate.getMonth() + 1}-${item.date.startDate.getDate()}`);

const generateTripDays = (eventArr) => {
  let tripDays = eventArr
    .slice()
    .sort((a, b) => new Date(a.date.startDate) - new Date(b.date.startDate))
    .map((item) => getTripDaysString(item));

  return [...new Set(tripDays)];
};

export {generateTripEventDateData, generateTripDays, getTripDaysString};
