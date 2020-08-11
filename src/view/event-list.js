import {createElement} from '../utils';

const createTripEventsList = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export class TripEventList {
  constructor() {
    this._elem = null;
  }

  getTemplate() {
    return createTripEventsList();
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
