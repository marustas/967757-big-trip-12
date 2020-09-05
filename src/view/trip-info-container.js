
import Abstract from "./abstract.js";

const createTripInfoContainerTemplate = () => {

  return (
    `<section class="trip-main__trip-info  trip-info"></section>`
  );
};

export default class tripInfoContainer extends Abstract {

  getTemplate() {
    return createTripInfoContainerTemplate();
  }
}
