import Abstract from "./abstract.js";

const createTripCostTemplate = (cost) => {

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>`
  );
};

export default class TripCost extends Abstract {
  constructor(cost) {
    super();

    this._tripCost = cost;
  }

  getTemplate() {
    return createTripCostTemplate(this._tripCost);
  }
}
