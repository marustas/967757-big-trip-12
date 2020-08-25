import moment from 'moment';

const getRandomItemFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomItemsFromArray = (arr, quantity) => {
  const randomItems = arr.map(() => getRandomItemFromArray(arr)).slice(0, quantity);

  return removeDuplicatesFromArray(randomItems);
};

const getRandom = (max, min = 1) => Math.random() * (max - min) + min;

const getRandomInt = (max, min = 1) => Math.floor(Math.random() * (max - min)) + min;

const removeDuplicatesFromArray = (arr) => Array.from(new Set(arr));

const getRandomNumberFromInterval = (min, max, multy) => Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / multy) * multy;

const castTimeFormat = (value) => value < 10 ? `0${value}` : String(value);

const formatTime = (date) => moment(date).format(`hh:mm`);

const formatDate = (date) => moment(date).format(`DD MMMM`);

const timeDuration = (start, end) => {
  const momentDiff = moment(end).diff(moment(start));
  const momentDuration = moment.duration(momentDiff);

  const duration = {
    days: momentDuration.get(`days`) > 0 ? `${castTimeFormat(momentDuration.get(`days`))}D` : ``,
    hours: momentDuration.get(`hours`) > 0 ? `${castTimeFormat(momentDuration.get(`hours`))}H` : ``,
    minutes: momentDuration.get(`minutes`) > 0 ? `${castTimeFormat(momentDuration.get(`minutes`))}M` : ``,
  };

  return `${duration.days} ${duration.hours} ${duration.minutes}`;
};

const checkEventType = (type, arr) => {
  const isActivityType = arr.some((item) => item === type);

  return isActivityType ? `in` : `to`;
};

export {
  getRandomItemFromArray,
  getRandomItemsFromArray,
  getRandom,
  getRandomInt,
  removeDuplicatesFromArray,
  getRandomNumberFromInterval,
  castTimeFormat,
  formatTime,
  formatDate,
  timeDuration,
  checkEventType,
};
