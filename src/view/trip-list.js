import {createElement} from '../utils';

const createTripDaysList = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export class TripDaysList {
  constructor() {
    this._elem = null;
  }

  getTemplate() {
    return createTripDaysList();
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
