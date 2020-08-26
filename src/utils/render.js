const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREBEGIN: `beforebegin`,
  BEFOREEND: `beforeend`,
};
/**
 * @param {Element} container an HTML-element like <div> or <span>
 * @param {Function} component a class with a certain constructor and methods. One of them (getTemplate()) returns a template of the component it represents
 * @param {method} place inserts nodes in the certain place of the container
 */
const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.AFTEREND:
      container.after(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(component.getElement());
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export {
  render,
  RenderPosition,
  createElement,
  replace,
  remove,
};
