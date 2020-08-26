import {
  getRandomIntegerNumber,
  getRandomArrayItem,
} from "../utils/common";
import {TYPES_OF_ACTIVITY} from "../constant";

const cities = [`Melbourne`, `Chamix`, `Amsterdam`, `Geneva`, `Rome`];

const destinationDescription = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
];

const offersTitles = {
  "taxi": [`Upgrade to business class`, `Choose a radio station`, `Order Uber`, `Talk to a driver`],
  "bus": [`Book tickets`, `Switch to comfort seats`, `Air conditioner`, `Include TV`],
  "train": [`Book tickets`, `Comfort class`, `Include meals`, `Include TV`, `Include shower`],
  "ship": [`Book tickets`, `First class`, `Free alcohol`, `Сaptain's cabin visit`, `One time honk`],
  "transport": [`Book tickets`, `Porter service`, `Taxi to station`, `Include meals`],
  "drive": [`Fuel`, `Toll highway`, `Meals`, `Rent a car`],
  "flight": [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`, `Travel by train`],
  "check-in": [`Add breakfast`, `King bed`, `Add meal`, `Switch to lux`, `Bar`],
  "sightseeing": [`Book tickets`, `Lunch in a city`, `Photosession`, `Guide services`],
  "restaurant": [`Smorgasbord`, `Fish menu`, `Meat menu`, `Vegetarian menu`],
};

const getOffer = (title) => {
  return {
    "title": title,
    "price": getRandomIntegerNumber(10, 300),
  };
};

const getOffers = (offersByTypes) => {
  const offersTypes = Object.keys(offersByTypes);
  const newOffers = {};
  offersTypes.forEach((type) => {
    newOffers[type] = {
      type,
      offers: offersTitles[type].map((offer) => getOffer(offer)),
    };
  });
  return newOffers;
};

const getRandomDate = () => {
  const HOURS_IN_WEEK = 24 * 7;
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, HOURS_IN_WEEK);

  targetDate.setHours(targetDate.getHours() + diffValue);

  return targetDate;
};

const getRandomPhotoArray = (destinationName) => {
  return [...new Array(getRandomIntegerNumber(0, 5))].map(()=> {
    return {
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      description: `${destinationName} any description`,
    };
  });
};

const destinations = cities.reduce((obj, key) => Object.assign(obj, {
  [key]: {
    name: key,
    description: destinationDescription.slice(getRandomIntegerNumber(0, destinationDescription.length - 1), destinationDescription.length).join(` `),
    pictures: getRandomPhotoArray(key),
  }
}), {});

const offers = getOffers(offersTitles);

const generateEvent = (time = getRandomDate()) => {
  const startTime = time;
  const endTime = new Date(
      startTime.getFullYear(),
      startTime.getMonth(),
      startTime.getDate(),
      startTime.getHours() + getRandomIntegerNumber(1, 3),
      getRandomIntegerNumber(0, 59)
  );
  const typeOfEvent = getRandomArrayItem(TYPES_OF_ACTIVITY);
  return {
    basePrice: getRandomIntegerNumber(100, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    destination: destinations[getRandomArrayItem(cities)],
    id: getRandomIntegerNumber(0, Number.MAX_SAFE_INTEGER),
    isFavorite: Math.random() > 0.8,
    offers: Object.assign({}, offers[typeOfEvent], {offers: offers[typeOfEvent].offers.map((offer) => Object.assign({}, offer, {isChecked: Math.random() > 0.5}))}),
    type: typeOfEvent,
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => generateEvent())
    .sort((a, b) => a.dateFrom - b.dateFrom);
};

const events = generateEvents(20);

export {events, cities, offers, destinations};
