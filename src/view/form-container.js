import AbstractComponent from "./abstract.js";

const createFormContainerTemplate = () => {
  return (
    `<li class="trip-events__item"></li>`
  );
};

export default class FormContainer extends AbstractComponent {

  getTemplate() {
    return createFormContainerTemplate();
  }
}
