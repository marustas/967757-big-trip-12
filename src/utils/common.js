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

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const timeDuration = (start, end) => {
  const diff = end.getTime() - start.getTime();
  const minutes = Math.floor(diff / 60000 % 60);
  const hours = Math.floor(diff / 3600000 % 24);
  const days = Math.floor(diff / 86400000);

  const duration = {
    days: days > 0 ? `${castTimeFormat(days)}D ` : ``,
    hours: hours > 0 ? `${castTimeFormat(hours)}H ` : ``,
    minutes: minutes > 0 ? `${castTimeFormat(minutes)}M` : ``,
  };

  return `${duration.days}${duration.hours}${duration.minutes}`;
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
  timeDuration,
  checkEventType,
};
