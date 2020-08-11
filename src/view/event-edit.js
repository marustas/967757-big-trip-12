import {TRANSPORT_TYPE, ACTIVITY_TYPE, EVENT_DESTINATION} from '../constant';
import {formatTime, checkEventType, castTimeFormat, createElement} from '../utils';

const getCheckedStatus = () => (`${Math.random() > 0.5 ? `checked` : ``}`);

const generatePhoto = (imgSrcArr, destinationName) => {
  return imgSrcArr
    .map((item, i) => (`<img class="event__photo" src="${item}" alt="${destinationName} - photo №${i + 1}">`))
    .join(`\n`);
};

const generateEventTypeItems = (eventTypes) => {
  return eventTypes
    .map((item) => (
      `<div class="event__type-item">
        <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}">
        <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${item}</label>
      </div>`))
    .join(`\n`);
};

const getEventOfferSelector = (offerData) => {
  return offerData
    .map((item, i) => (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${i}" type="checkbox" name="event-offer-luggage" ${getCheckedStatus()}>
        <label class="event__offer-label" for="event-offer-luggage-${i}">
          <span class="event__offer-title">${item.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
        </label>
      </div>`))
    .join(`\n`);
};

const getDateString = (dateObj) => {
  const day = dateObj.getDate();
  const month = castTimeFormat(dateObj.getMonth() + 1);
  const year = String(dateObj.getFullYear()).slice(2);

  return `${day}/${month}/${year}`;
};

const generateOptions = (optValue) => {
  return optValue
    .map((item) => (`<option value="${item}"></option>`))
    .join(`\n`);
};

const createEventEditTemplate = (obj) => {
  const {type, destinationName, offers, destinationInfo, price, date} = obj;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${generateEventTypeItems(TRANSPORT_TYPE)}
            </fieldset>
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${generateEventTypeItems(ACTIVITY_TYPE)}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type} ${checkEventType(type, ACTIVITY_TYPE)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${generateOptions(EVENT_DESTINATION)}
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateString(date.startDate)} ${formatTime(date.startDate)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateString(date.endDate)} ${formatTime(date.endDate)}">
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${getCheckedStatus()}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${getEventOfferSelector(offers)}
          </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destinationInfo.destinationDescription.join(` `)}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${generatePhoto(destinationInfo.destinationPhoto, destinationName)}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

export class TripEventEditItem {
  constructor(data) {
    this._tripEventEditItemData = data;
    this._elem = null;
  }

  getTemplate() {
    return createEventEditTemplate(this._tripEventEditItemData);
  }

  getElement() {
    if (!this._elem) {
      this._elem = createElement(this.getTemplate());
    }

    return this._elem;
  }

  removeElement() {
    this._elem = null;
  }
}
