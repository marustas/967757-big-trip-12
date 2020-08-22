
import {POSITION, renderElement} from '../utils/render';
import Sort, {SORT_TYPE} from '../view/sort';
import TripDaysList from '../view/trip-list';
import TripDaysItem from '../view/trip-days';
import TripEventList from '../view/event-list';
import NoPoints from '../view/no-points';
import Point from "./point.js";
import {generateTripDays, getTripDaysString} from "../mock/trip-time";

const getSortedEventsData = (eventDataList, sortType) => {
  let sortedEvents;
  const showingEvents = eventDataList.slice();

  switch (sortType) {
    case SORT_TYPE.EVENT:
      sortedEvents = showingEvents;
      break;
    case SORT_TYPE.TIME:
      sortedEvents = showingEvents.sort((a, b) => (new Date(b.date.endDate) - new Date(b.date.startDate)) - (new Date(a.date.endDate) - new Date(a.date.startDate)));
      break;
    case SORT_TYPE.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      break;
  }

  return sortedEvents;
};

export default class Trip {
  constructor(container) {
    this._container = container;

    this._eventsData = [];
    this._showedEventControllers = [];
    this._tripDays = null;
    this._sortComponent = new Sort();
    this._tripDaysListComponent = new TripDaysList();
    this._noPointsComponent = new NoPoints();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _renderDay(eventsData, tripDay, dayCount) {
    const dayComponent = tripDay
      ? new TripDaysItem(tripDay, dayCount + 1)
      : new TripDaysItem();
    const eventList = new TripEventList();

    renderElement(this._tripDaysListComponent.getElement(), dayComponent, POSITION.BEFOREEND);
    renderElement(dayComponent.getElement(), eventList, POSITION.BEFOREEND);

    eventsData.forEach((event) => {
      const pointController = new Point(eventList.getElement(), this._onDataChange, this._onViewChange);
      this._showedEventControllers.push(pointController);
      pointController.render(event);
    });
  }

  _generateRenderDays(daysArr) {
    daysArr
      .slice()
      .forEach((currentTripDay, count) => {
        const currentEventData = this._eventsData
          .filter((eventItem) => getTripDaysString(eventItem) === currentTripDay);
        this._renderDay(currentEventData, currentTripDay, count);
      });
  }

  render(eventDataList) {
    this._eventsData = eventDataList;
    this._tripDays = generateTripDays(this._eventsData);
    const container = this._container;

    if (!this._eventsData.length) {
      renderElement(container, this._noPointsComponent, POSITION.BEFOREEND);
      return;
    }

    renderElement(container, this._sortComponent, POSITION.BEFOREEND);
    renderElement(container, this._tripDaysListComponent, POSITION.BEFOREEND);

    this._generateRenderDays(this._tripDays);
  }

  _onSortTypeChange(sortType) {
    this._sortComponent.getElement().querySelector(`#${sortType}`).checked = true;
    this._tripDaysListComponent.getElement().innerHTML = ``;
    this._showedEventControllers = [];

    if (sortType === SORT_TYPE.EVENT) {
      this._generateRenderDays(this._tripDays);
      return;
    }

    const sortedDataList = getSortedEventsData(this._eventsData, sortType);
    this._renderDay(sortedDataList);
  }

  _onDataChange(oldData, newData) {
    const index = this._eventsData.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._eventsData = [].concat(this._eventsData.slice(0, index), newData, this._eventsData.slice(index + 1));

    this._showedEventControllers[index].render(this._eventsData[index]);
  }

  _onViewChange() {
    this._showedEventControllers.forEach((it) => it.setDefaultView());
  }
}
