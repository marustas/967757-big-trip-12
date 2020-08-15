import AbstractComponent from "./abstract.js";

const createInfoContainerTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info"></section>`
  );
};

export default class InfoContainer extends AbstractComponent {
  getTemplate() {
    return createInfoContainerTemplate();
  }
}
