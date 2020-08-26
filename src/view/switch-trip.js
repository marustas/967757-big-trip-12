
import Abstract from "./abstract";

const createSwitchTripViewMarkup = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

export default class SwitchTripView extends Abstract {
  getTemplate() {
    return createSwitchTripViewMarkup();
  }
}
