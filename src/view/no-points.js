import Abstract from "./abstract.js";

const createNoPointsTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class NoPoints extends Abstract {
  getTemplate() {
    return createNoPointsTemplate();
  }
}
