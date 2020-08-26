import moment from "moment";

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const shuffleArray = (anyArray) => {
  for (let i = anyArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = anyArray[i];
    anyArray[i] = anyArray[j];
    anyArray[j] = temp;
  }
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  shuffleArray(array);
  return array[randomIndex];
};

const capitalize = (anyString) => anyString.replace(/^./, (str) => str.toUpperCase());

const createDateFormat = (date) => moment(date).format(`YYYY-MM-DD`);

const createMonthDayFormat = (date) => moment(date).format(`MMM D`).toUpperCase();

export {
  getRandomIntegerNumber,
  getRandomArrayItem,
  capitalize,
  shuffleArray,
  createDateFormat,
  createMonthDayFormat,
};
