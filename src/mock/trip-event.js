import {getRandomItemFromArray, getRandomNumberFromInterval} from '../utils/common';
import {TRANSPORT_TYPE, ACTIVITY_TYPE, DESTINATION, PRICE_SETTINGS} from '../constant';
import {generateTripEventOfferData} from './trip-offer';
import {generateTripEventDate} from "./trip-time";
import {generateTripEventDestinationData} from "./destination";

const allEventsType = [...TRANSPORT_TYPE, ...ACTIVITY_TYPE];

const generateTripEventItemData = () => {
  const type = getRandomItemFromArray(allEventsType);
  const destinationName = getRandomItemFromArray(DESTINATION);
  const offers = generateTripEventOfferData()[type];
  const destinationInfo = generateTripEventDestinationData();
  const price = getRandomNumberFromInterval(PRICE_SETTINGS.MIN_PRICE, PRICE_SETTINGS.MAX_PRICE, PRICE_SETTINGS.MULTIPLE);
  const date = generateTripEventDate();
  const isFavorite = Math.random() > 0.5;

  return {
    type,
    destinationName,
    offers,
    destinationInfo,
    price,
    date,
    isFavorite
  };
};

const generateTripEventsData = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => generateTripEventItemData());
};

export {generateTripEventsData};
