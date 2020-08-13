
import {createElement} from '../utils';

const createNoPoints = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class NoPoints {
  constructor() {
    this._elem = null;
  }

  getTemplate() {
    return createNoPoints();
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
