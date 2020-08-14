const POSITION = {
  BEFOREBEGIN: `beforeBegin`,
  AFTERBEGIN: `afterBegin`,
  BEFOREEND: `beforeEnd`,
  AFTEREND: `afterEnd`,
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const renderElement = (container, component, place) => {
  container.insertAdjacentElement(place, component.getElement());
};

const replaceElement = (newComponent, oldComponent) => {
  const newElem = newComponent.getElement();
  const oldElem = oldComponent.getElement();
  const parentContainer = oldElem.parentElement;

  const isExistElements = !!(parentContainer && newElem && oldElem);

  if (isExistElements) {
    parentContainer.replaceChild(newElem, oldElem);
  }
};

const removeElement = (component) => {
  component.remove();
  component.removeElement();
};

export {POSITION, createElement, renderElement, replaceElement, removeElement};
