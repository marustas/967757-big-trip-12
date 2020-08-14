
import AbstractComponent from "./abstract.js";

const createTripDaysListTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class TripDaysList extends AbstractComponent {
  getTemplate() {
    return createTripDaysListTemplate();
  }
}
