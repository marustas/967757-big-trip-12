import {MONTHS} from '../constant';
import {createElement} from '../utils';

const createTripDaysItem = (tripDay, count) => {
  const month = MONTHS[new Date(tripDay).getMonth()];
  const dateNum = new Date(tripDay).getDate();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${count}</span>
        <time class="day__date" datetime="${tripDay}">${month} ${dateNum}</time>
      </div>
    </li>`
  );
};

export default class TripDays {
  constructor(data, count) {
    this._tripDaysItemData = data;
    this._count = count;
    this._elem = null;
  }

  getTemplate() {
    return createTripDaysItem(this._tripDaysItemData, this._count);
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
