import TripDaysComponent from "../view/trip-days";
import NoEventsComponent from "../view/no-points";
import {render, RenderPosition} from "../utils/render";
import {SortType} from "../utils/components/sort";
import EventController, {Mode as EventControllerMode, EmptyEvent} from "./event";
import TripDayController from "./day";
import SortController from "./sort";

const renderSort = (container, onSortTypeChange) => {
  const sortController = new SortController(container, onSortTypeChange);
  sortController.render();

  return sortController;
};

const calculateDuration = (timeStart, timeEnd) => timeEnd.getTime() - timeStart.getTime();

const getSortedEvents = (events, sortType) => {
  const sortByTime = (a, b) => calculateDuration(b.dateFrom, b.dateTo) - calculateDuration(a.dateFrom, a.dateTo);
  const sortByPrice = (a, b) => b.basePrice - a.basePrice;
  const sortByDefault = (a, b) => a.dateFrom.getTime() - b.dateFrom.getTime();

  const eventsBySortType = {
    [SortType.TIME_DOWN]: [...events].sort(sortByTime),
    [SortType.PRICE_DOWN]: [...events].sort(sortByPrice),
    [SortType.DEFAULT]: [...events].sort(sortByDefault),
  };

  return eventsBySortType[sortType];
};

const renderTripDays = (container, days) => {
  if (!days) {
    const tripDayController = new TripDayController(container);
    tripDayController.render();
    return [tripDayController];
  }

  return days.map((day) => {
    const tripDayController = new TripDayController(container, day);
    tripDayController.render();

    return tripDayController;
  });
};

const renderEvents = (events, cities, tripDayControllers, onDataChange, onViewChange) => {
  return events.map((event) => {
    const eventController = new EventController(tripDayControllers[0].getTripEventsList(), onDataChange, onViewChange);
    eventController.render(event, cities, EventControllerMode.DEFAULT);

    return eventController;
  });
};

const renderEventsPerDay = (events, cities, dayControllers, onDataChange, onViewChange) => {
  const eventControllers = [];
  dayControllers.forEach((controller) => {
    const currentDayEvents = events.filter((event) => {
      return event.dateFrom.toDateString() === new Date(controller.getDay().date).toDateString();
    });

    if (currentDayEvents.length === 0) {
      return;
    }

    currentDayEvents.forEach((event) => {
      const eventController = new EventController(controller.getTripEventsList(), onDataChange, onViewChange);
      eventController.render(event, cities, EventControllerMode.DEFAULT);
      eventControllers.push(eventController);
    });
  });
  return eventControllers;
};

export default class TripController {
  /**
   * Makes the trip component (route and sort) and adds it on the page
   * @param {Element} container An element that the controller will draw everything to
   * @param {Events} eventsModel An instance of the Events class
   */
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._eventControllers = [];
    this._tripDayControllers = [];
    this._creatingEventController = null;
    this._sortController = null;

    this._noEventsComponent = new NoEventsComponent();
    this._tripDaysComponent = new TripDaysComponent();
    this._newEventButton = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const events = this._eventsModel.getEvents();

    if (events.length > 0) {
      render(this._container, this._tripDaysComponent, RenderPosition.AFTEREND);
      this._sortController = renderSort(this._container, this._onSortTypeChange);
    } else {
      render(this._container, this._noEventsComponent, RenderPosition.AFTEREND);
    }

    this._renderEventsPerDay(events);
  }

  createEvent(newEventButton) {
    this._onViewChange();
    this._sortController.setSortToDefault();
    this._newEventButton = newEventButton;

    const cities = this._eventsModel.getCities();

    const eventsListElement = this._tripDaysComponent.getElement();
    this._creatingEventController = new EventController(eventsListElement, this._onDataChange, this._onViewChange);
    this._creatingEventController.render(EmptyEvent, cities, EventControllerMode.ADDING);
  }

  _removeEvents() {
    this._eventControllers.forEach((eventController) => eventController.destroy());
    this._eventControllers = [];
    this._tripDayControllers.forEach((tripDayController) => tripDayController.destroy());
    this._tripDayControllers = [];
  }

  _renderTripDays(days) {
    this._tripDayControllers = renderTripDays(this._tripDaysComponent.getElement(), days);
  }

  _renderEventsPerDay(events) {
    const cities = this._eventsModel.getCities();
    const days = this._eventsModel.getDays();

    this._renderTripDays(days);
    this._eventControllers = renderEventsPerDay(events, cities, this._tripDayControllers, this._onDataChange, this._onViewChange);
  }

  _renderEvents(events) {
    const cities = this._eventsModel.getCities();

    this._renderTripDays();
    this._eventControllers = renderEvents(events, cities, this._tripDayControllers, this._onDataChange, this._onViewChange);
  }

  _rerenderEvents(events, sortType) {
    this._removeEvents();

    switch (sortType) {
      case SortType.DEFAULT:
        this._renderEventsPerDay(getSortedEvents(events, SortType.DEFAULT));
        break;
      case SortType.TIME_DOWN:
        this._renderEvents(getSortedEvents(events, SortType.TIME_DOWN));
        break;
      case SortType.PRICE_DOWN:
        this._renderEvents(getSortedEvents(events, SortType.PRICE_DOWN));
        break;
    }
  }

  _onSortTypeChange(sortType) {
    const events = this._eventsModel.getEvents();

    switch (sortType) {
      case SortType.DEFAULT:
        this._rerenderEvents(events, SortType.DEFAULT);
        break;
      case SortType.TIME_DOWN:
        this._rerenderEvents(events, SortType.TIME_DOWN);
        break;
      case SortType.PRICE_DOWN:
        this._rerenderEvents(events, SortType.PRICE_DOWN);
        break;
    }
  }

  _updateEvents() {
    const events = this._eventsModel.getEvents();
    const currentSortType = this._sortController.getActiveSortType();

    this._rerenderEvents(events, currentSortType);
  }

  _onDataChange(eventController, oldData, updatedData) {
    const cities = this._eventsModel.getCities();
    const newData = Object.assign({}, oldData, updatedData);
    if (oldData === EmptyEvent) { // Adding
      this._removeCreatingEvent();
      if (updatedData === null) { // Deleting opened adding card
        eventController.destroy();
        this._updateEvents();
      } else { // Adding new data from opened adding card
        this._eventsModel.addEvent(newData);
        this._updateEvents();
      }
    } else if (updatedData === null) { // Deleting
      this._eventsModel.removeEvent(oldData.id);
      this._updateEvents();
    } else { // Renewing
      const isSuccess = this._eventsModel.updateEvent(oldData.id, newData);

      if (isSuccess && eventController !== null) {
        eventController.render(newData, cities, EventControllerMode.DEFAULT);
      }
    }
  }

  _onViewChange() {
    if (this._creatingEventController) {
      this._removeCreatingEvent();
    }

    this._eventControllers.forEach((eventController) => eventController.setDefaultView());
  }

  _onFilterChange() {
    this._eventsModel.setDays();
    this._updateEvents();
    this._sortController.setSortToDefault();
  }

  _removeCreatingEvent() {
    this._creatingEventController.destroy();
    this._creatingEventController = null;
    this._newEventButton.disabled = false;
  }
}
