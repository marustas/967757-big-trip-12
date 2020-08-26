
import Abstract from "./abstract";

const createTripDaysMarkup = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class TripDays extends Abstract {
  getTemplate() {
    return createTripDaysMarkup();
  }
}
