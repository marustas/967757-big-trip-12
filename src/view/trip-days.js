import AbstractComponent from "./abstract.js";

const createTripDaysTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class TripDays extends AbstractComponent {
  getTemplate() {
    return createTripDaysTemplate();
  }
}
