import Abstract from "./abstract.js";
import {correctDateFormat, correctMonthAndYearFormat, correctDayFormat} from '../utils/common.js';

const createTripDayTemplate = (tripDayInfo) => {

  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${correctDayFormat(tripDayInfo)}</span>
          <time class="day__date" datetime="${correctDateFormat(tripDayInfo)}">${correctMonthAndYearFormat(tripDayInfo)}</time>
        </div>
        <ul class="trip-events__list"></ul>
      </li>`
  );
};

export default class TripDay extends Abstract {
  constructor(tripDayInfo) {
    super();

    this._tripDayInfo = tripDayInfo;
  }

  getTemplate() {
    return createTripDayTemplate(this._tripDayInfo);
  }
}
