import {
  createEventTitle,
  createDateTimeFormat,
  createTimeFormat,
  createTimeDurationFormat
} from "../utils/components/trip-event";
import AbstractComponent from "./abstract-component";

const createTripEventOfferMarkup = (offer) => {
  return (
    offer.isChecked ?
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        +
        €&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>` : ``
  );
};

const createTripEventMarkup = (event) => {
  const {type, basePrice, dateFrom, dateTo, destination, offers} = event;
  const offersMarkup = offers.offers.filter((it) => it.isChecked).map((it) => createTripEventOfferMarkup(it)).slice(0, 3).join(`\n`);
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${createEventTitle(type, destination.name)}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${createDateTimeFormat(dateFrom)}">${createTimeFormat(dateFrom)}</time>
            —
            <time class="event__end-time" datetime="${createDateTimeFormat(dateTo)}">${createTimeFormat(dateTo)}</time>
          </p>
          <p class="event__duration">${createTimeDurationFormat(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          €&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersMarkup}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class TripEvent extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return createTripEventMarkup(this._event);
  }

  setRollupButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
