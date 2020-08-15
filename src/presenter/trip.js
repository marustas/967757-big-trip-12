
import {POSITION, renderElement, replaceElement} from '../utils/render';
import Sort from '../view/sort';
import TripEventItem from '../view/trip-event';
import TripEventEditItem from '../view/event-edit';
import TripDaysList from '../view/trip-list';
import TripDaysItem from '../view/trip-days';
import TripEventList from '../view/event-list';
import NoPoints from '../view/no-points';
import {generateTripDays, getTripDaysString} from "../mock/trip-time";

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

const renderTripEventItems = (container, tripDays, eventDataList) => {
  const tripDaysItem = container.querySelectorAll(`.trip-days__item`);
  tripDaysItem.forEach((item) => {
    renderElement(item, new TripEventList(), POSITION.BEFOREEND);
    const tripEventsList = item.querySelector(`.trip-events__list`);

    eventDataList
      .slice()
      .sort((a, b) => new Date(a.date.startDate) - new Date(b.date.startDate))
      .filter((eventItem) => getTripDaysString(eventItem) === tripDays[0])
      .forEach((currentDayEvent) => {
        renderEvent(tripEventsList, currentDayEvent);
      });
    tripDays.shift();
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

    renderElement(container, this._sortComponent, POSITION.BEFOREEND);
    renderElement(container, this._tripDaysListComponent, POSITION.BEFOREEND);

    Array.from(tripDays)
      .forEach((item, i) => {
        renderElement(this._tripDaysListComponent.getElement(), new TripDaysItem(item, i + 1), POSITION.BEFOREEND);
      });

    renderTripEventItems(container, tripDays, eventDataList);
  }
}
