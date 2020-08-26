import Abstract from "./abstract.js";


export default class Smart extends Abstract {
  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }

  updateElement() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.restoreHandlers();
  }
}
