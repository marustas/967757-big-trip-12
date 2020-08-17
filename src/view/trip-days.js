import {MONTHS} from '../constant';
import AbstractComponent from "./abstract.js";

const createTripDaysItem = (tripDay = ``, count = ``) => {
  const month = tripDay ? MONTHS[new Date(tripDay).getMonth()] : ``;
  const dateNum = tripDay ? new Date(tripDay).getDate() : ``;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${count}</span>
        <time class="day__date" datetime="${tripDay}">${month} ${dateNum}</time>
      </div>
    </li>`
  );
};

export default class TripDaysItem extends AbstractComponent {
  constructor(data, count) {
    super();
    this._tripDaysItemData = data;
    this._count = count;
  }

  getTemplate() {
    return createTripDaysItem(this._tripDaysItemData, this._count);
  }
}
