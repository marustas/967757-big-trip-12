
import {createElement} from '../utils';

const createInfoContainer = () => {
  return (
    `<section class="trip-main__trip-info  trip-info"></section>`
  );
};

export default class InfoContainer {
  constructor() {
    this._elem = null;
  }

  getTemplate() {
    return createInfoContainer();
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
