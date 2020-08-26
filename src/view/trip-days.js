import Abstract from "./abstract";
import {createDateFormat, createMonthDayFormat} from "../utils/common";

const createDayInfoMarkup = (day) => {
  return (
    `<span class="day__counter">${day.dayNumber}</span>
     <time class="day__date" datetime="${createDateFormat(day.date)}">${createMonthDayFormat(day.date)}</time>`
  );
};

const createTripDayMarkup = (day) => {
  const dayInfoMarkup = day ? createDayInfoMarkup(day) : ``;
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        ${dayInfoMarkup}
      </div>
      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class TripDay extends Abstract {
  constructor(day) {
    super();

    this._day = day;
  }

  getTemplate() {
    return createTripDayMarkup(this._day);
  }

  getEventsList() {
    return this.getElement().querySelector(`.trip-events__list`);
  }
}
