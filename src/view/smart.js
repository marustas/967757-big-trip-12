import Abstract from "./abstract.js";

export default class Smart extends Abstract {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    if (oldElement && parent && newElement) {
      parent.replaceChild(newElement, oldElement);
    }

    this.recoveryListeners();
  }
}
