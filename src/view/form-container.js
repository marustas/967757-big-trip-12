import Abstract from "./abstract.js";

const createFormContainerTemplate = () => {
  return (
    `<li class="trip-events__item"></li>`
  );
};

export default class FormContainer extends Abstract {

  getTemplate() {
    return createFormContainerTemplate();
  }
}
