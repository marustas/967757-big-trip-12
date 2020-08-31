import Abstract from "./abstract.js";

const createTripDaysTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class TripDays extends Abstract {
  getTemplate() {
    return createTripDaysTemplate();
  }
}
