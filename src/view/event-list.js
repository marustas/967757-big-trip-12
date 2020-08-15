import AbstractComponent from "./abstract.js";

const createTripEventsListTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export default class TripEventList extends AbstractComponent {
  getTemplate() {
    return createTripEventsListTemplate();
  }
}
