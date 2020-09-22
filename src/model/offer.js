export default class Offer {
  constructor() {
    this._offers = [];
  }

  static setOffers(data) {
    this._offers = data;
  }

  static getOffers() {
    return this._offers;
  }
}
