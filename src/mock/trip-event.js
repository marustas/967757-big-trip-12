import {getRandomItemFromArray, getRandomNumberFromInterval} from '../utils';
import {TRANSPORT_TYPE, ACTIVITY_TYPE, EVENT_DESTINATION, PRICE_SETTINGS} from '../constant';
import {generateTripEventOfferData} from './trip-offer';
import {generateTripEventDateData} from "./trip-time";
import {generateTripEventDestinationData} from "./destination";

const allEventsType = [...TRANSPORT_TYPE, ...ACTIVITY_TYPE];

const generateTripEventItemData = () => {
  const type = getRandomItemFromArray(allEventsType);
  const destinationName = getRandomItemFromArray(EVENT_DESTINATION);
  const offers = generateTripEventOfferData()[type];
  const destinationInfo = generateTripEventDestinationData();
  const price = getRandomNumberFromInterval(PRICE_SETTINGS.MIN_PRICE, PRICE_SETTINGS.MAX_PRICE, PRICE_SETTINGS.MULTIPLE);
  const date = generateTripEventDateData();

  return {
    type,
    destinationName,
    offers,
    destinationInfo,
    price,
    date
  };
};

const generateTripEventsData = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => generateTripEventItemData());
};

export {generateTripEventsData};
