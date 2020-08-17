
import {POSITION, renderElement, replaceElement} from '../utils/render';
import Sort, {SORT_TYPE} from '../view/sort';
import TripEventItem from '../view/trip-event';
import TripEventEditItem from '../view/event-edit';
import TripDaysList from '../view/trip-list';
import TripDaysItem from '../view/trip-days';
import TripEventList from '../view/event-list';
import NoPoints from '../view/no-points';
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

const renderEvent = (eventsContainer, eventItemData) => {
  const tripEventItem = new TripEventItem(eventItemData);
  const tripEventEditItem = new TripEventEditItem(eventItemData);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceElement(tripEventItem, tripEventEditItem);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  tripEventItem.setEditButtonClickHandler(() => {
    replaceElement(tripEventEditItem, tripEventItem);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripEventEditItem.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceElement(tripEventItem, tripEventEditItem);
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderElement(eventsContainer, tripEventItem, POSITION.BEFOREEND);
};

const renderTripEventItems = (container, eventDataList, tripDay) => {
  renderElement(container, new TripEventList(), POSITION.BEFOREEND);
  const tripEventsList = container.querySelector(`.trip-events__list`);
  const dataList = tripDay ?
    eventDataList.slice().filter((eventItem) => getTripDaysString(eventItem) === tripDay) :
    eventDataList.slice();

  dataList.forEach((currentDayEvent) => {
    renderEvent(tripEventsList, currentDayEvent);
  });
};

export default class Trip {
  constructor(container) {
    this._container = container;

    this._sortComponent = new Sort();
    this._tripDaysListComponent = new TripDaysList();
    this._noPointsComponent = new NoPoints();
  }

  render(eventDataList) {
    const container = this._container;
    const tripDays = generateTripDays(eventDataList);

    if (!eventDataList.length) {
      renderElement(container, this._noPointsComponent, POSITION.BEFOREEND);
      return;
    }

    const renderDefaultEvents = () => {
      tripDays.forEach((item, i) => {
        renderElement(this._tripDaysListComponent.getElement(), new TripDaysItem(item, i + 1), POSITION.BEFOREEND);
      });

      const tripDaysItem = container.querySelectorAll(`.trip-days__item`);
      tripDaysItem.forEach((tripDayItem, i) => {
        renderTripEventItems(tripDayItem, eventDataList, tripDays[i]);
      });
    };

    renderElement(container, this._sortComponent, POSITION.BEFOREEND);
    renderElement(container, this._tripDaysListComponent, POSITION.BEFOREEND);
    renderDefaultEvents();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._sortComponent.getElement().querySelector(`#${sortType}`).checked = true;
      this._tripDaysListComponent.getElement().innerHTML = ``;

      if (sortType === SORT_TYPE.EVENT) {
        renderDefaultEvents();
        return;
      }

      renderElement(this._tripDaysListComponent.getElement(), new TripDaysItem(), POSITION.BEFOREEND);
      const dataList = getSortedEventsData(eventDataList, sortType);
      const newContainer = container.querySelector(`.trip-days__item`);
      renderTripEventItems(newContainer, dataList);
    });
  }
}
