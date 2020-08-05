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


function timeDuration(start, end) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const diff = endTime - startTime;
  const days = new Date(endTime).getDay() - new Date(startTime).getDay();
  const hours = new Date(endTime).getHours() - new Date(startTime).getHours();
  const minutes = new Date(diff - (hours * (24 * 3600 * 1000))).getMinutes();
  const duration = {
    days: days > 0 ? `${castTimeFormat(days)}D ` : ``,
    hours: hours > 0 ? `${castTimeFormat(hours)}H ` : ``,
    minutes: minutes > 0 ? `${castTimeFormat(minutes)}M` : ``,
  };

  return `${duration.days}${duration.hours}${duration.minutes}`;
}

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
  checkEventType
};
