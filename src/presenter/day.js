import TripDay from "../view/trip-days";
import {render, RenderPosition, remove} from "../utils/render";

export default class TripDayController {
  constructor(container, day) {
    this._container = container;
    this._day = day;

    this._tripDayComponent = null;
  }

  render() {
    this._tripDayComponent = new TripDay(this._day);
    render(this._container, this._tripDayComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._tripDayComponent);
  }

  getTripEventsList() {
    return this._tripDayComponent.getEventsList();
  }

  getDay() {
    return this._day;
  }
}
