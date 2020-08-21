
const TRANSPORT_TYPE = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`
];
const ACTIVITY_TYPE = [
  `check-in`,
  `sightseeing`,
  `restaurant`
];
const DESTINATION = [
  `Chamonix`,
  `Geneva`,
  `Amsterdam`
];
const MONTHS = [
  `JANUARY`,
  `FEBRUARY`,
  `MARCH`,
  `APRIL`,
  `MAY`,
  `JUNE`,
  `JULY`,
  `AUGUST`,
  `SEPTEMBER`,
  `OCTOBER`,
  `NOVEMBER`,
  `DECEMBER`
];

const PRICE_SETTINGS = {
  MIN_PRICE: 1000,
  MAX_PRICE: 10000,
  MULTIPLE: 10
};

const SORT_TYPE = {
  EVENT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

export {TRANSPORT_TYPE, ACTIVITY_TYPE, DESTINATION, MONTHS, PRICE_SETTINGS, SORT_TYPE};
