import Abstract from "./abstract";

const createNoEventsMarkup = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class NoEvents extends Abstract {
  getTemplate() {
    return createNoEventsMarkup();
  }
}
