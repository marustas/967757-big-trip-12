import {formatDate} from '../utils/common';
import AbstractComponent from "./abstract.js";

const createTripDaysItem = (tripDay, count) => {
  const date = tripDay ? formatDate(new Date(tripDay)) : ``;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${count}</span>
        <time class="day__date" datetime="${tripDay}">${date}</time>
      </div>
    </li>`
  );
};

export default class TripDays extends AbstractComponent {
  constructor(data, count) {
    super();
    this._tripDaysItemData = data || ``;
    this._count = count || ``;
  }

  getTemplate() {
    return createTripDaysItem(this._tripDaysItemData, this._count);
  }
}
