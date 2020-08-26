import {FilterType} from "../constant";
import {getEventsByFilter} from "../utils/components/filters";
import {createDaysData} from "../utils/components/trip-day";

export default class Events {
  constructor() {
    this._events = [];
    this._days = [];
    this._cities = [];

    this._activeFilterType = FilterType.EVERYTHING;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getEvents() {
    return getEventsByFilter(this._events, this._activeFilterType);
  }

  getEventsAll() {
    return this._events;
  }

  setEvents(events) {
    this._events = Array.from(events);
    this._callHandlers(this._dataChangeHandlers);
  }

  getDays() {
    return this._days;
  }

  setDays() {
    this._days = createDaysData(this.getEvents());
  }

  getCities() {
    return this._cities;
  }

  setCities(cities) {
    this._cities = Array.from(cities);
  }

  removeEvent(id) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), this._events.slice(index + 1));

    this.setDays();
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateEvent(id, event) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), event, this._events.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addEvent(event) {
    this._events = [].concat(event, this._events);
    this._callHandlers(this._dataChangeHandlers);
    this.setDays();
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
