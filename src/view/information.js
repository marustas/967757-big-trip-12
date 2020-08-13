import {MONTHS} from '../constant';
import {createElement} from '../utils';

const generateTitle = (array) => {
  if (array.length === 1) {
    return array[0].destinationName;
  }
  if (array.length === 2) {
    return `${array[0].destinationName} — ${array[1].destinationName}`;
  }

  return `${array[0].destinationName} — ... — ${array[array.length - 1].destinationName}`;
};

const generateDates = (array) => {
  const startMonth = MONTHS[new Date(array[0].date.startDate).getMonth()];
  const endMonth = MONTHS[new Date(array[array.length - 1].date.endDate).getMonth()];
  const startDate = array[0].date.startDate.getDate();
  const endDate = array[array.length - 1].date.endDate.getDate();

  return (startMonth === endMonth) ? `${startMonth} ${startDate} — ${endDate}` : `${startDate} ${startMonth} — ${endDate} ${endMonth}`;
};

const createInfo = (eventsArray) => {

  const sortedEvents = eventsArray
    .slice()
    .sort((a, b) => new Date(a.date.startDate) - new Date(b.date.startDate));

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${generateTitle(sortedEvents)}</h1>
        <p class="trip-info__dates">${generateDates(sortedEvents)}</p>
      </div>
    </section>`
  );
};

export default class Info {
  constructor(data) {
    this._infoData = data;
    this._elem = null;
  }

  getTemplate() {
    return createInfo(this._infoData);
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
