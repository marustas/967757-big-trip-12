import {POSITION} from './constant';
import {renderElement} from './utils';
import Cost from './view/cost';
import Menu from './view/menu';
import Filter from './view/filters';
import Sort from './view/sort';
import TripEventItem from './view/trip-event';
import TripEventEditItem from './view/event-edit';
import TripDaysList from './view/trip-list';
import TripDays from './view/trip-days';
import TripEventList from './view/event-list';
import {generateTripEventsData} from "./mock/trip-event";
import {generateTripDays, getTripDaysString} from "./mock/trip-time";
import InfoContainer from './view/info-container';
import MainInfo from './view/main-info';
import NoPoints from './view/no-points';

const TRIP_EVENT_ITEM_QUANTITY = 20;
const tripMain = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);
const tripEventsTitle = tripEvents.querySelector(`.trip-events h2:first-child`);

const renderInfo = (infoData) => {
  const infoContainer = new InfoContainer();
  renderElement(tripMain, infoContainer.getElement(), POSITION.AFTERBEGIN);
  renderElement(infoContainer.getElement(), new Cost().getElement(), POSITION.BEFOREEND);
  if (infoData.length) {
    renderElement(tripMain, new MainInfo(infoData).getElement(), POSITION.AFTERBEGIN);
  }
};

const renderTripMainControls = () => {
  const tripMainControls = tripMain.querySelector(`.trip-main__trip-controls`);
  const tripMainControlsTitle = tripMain.querySelector(`.trip-main__trip-controls h2:first-child`);

  renderElement(tripMainControls, new Filter().getElement(), POSITION.BEFOREEND);
  renderElement(tripMainControlsTitle, new Menu().getElement(), POSITION.AFTEREND);
};

const renderTripDays = (tripDays) => {
  const tripDaysList = new TripDaysList();
  renderElement(tripEventsTitle, tripDaysList.getElement(), POSITION.AFTEREND);

  Array.from(tripDays)
    .forEach((item, i) => {
      renderElement(tripDaysList.getElement(), new TripDays(item, i + 1).getElement(), POSITION.BEFOREEND);
    });
};

const renderTripEventItems = (tripDays) => {
  const tripDaysItem = tripEvents.querySelectorAll(`.trip-days__item`);
  tripDaysItem.forEach((item) => {
    renderElement(item, new TripEventList().getElement(), POSITION.BEFOREEND);
    const tripEventsList = item.querySelector(`.trip-events__list`);

    tripEventItems
      .slice()
      .sort((a, b) => new Date(a.date.startDate) - new Date(b.date.startDate))
      .filter((eventItem) => getTripDaysString(eventItem) === tripDays[0])
      .forEach((currentDayEvent) => {
        renderEvent(tripEventsList, currentDayEvent);
      });
    tripDays.shift();
  });
};

const renderEvent = (eventsContainer, data) => {
  const tripEventItem = new TripEventItem(data);
  const tripEventEditItem = new TripEventEditItem(data);
  const tripEventItemRollupBtn = tripEventItem.getElement().querySelector(`.event__rollup-btn`);
  const tripEventEditForm = tripEventEditItem.getElement();

  const replaceEventToEdit = () => {
    eventsContainer.replaceChild(tripEventEditItem.getElement(), tripEventItem.getElement());
  };

  const replaceEditToEvent = () => {
    eventsContainer.replaceChild(tripEventItem.getElement(), tripEventEditItem.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  tripEventItemRollupBtn.addEventListener(`click`, () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripEventEditForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderElement(eventsContainer, tripEventItem.getElement(), POSITION.BEFOREEND);
};

const renderMainContent = (data) => {
  const tripDays = generateTripDays(data);

  renderTripMainControls();
  renderInfo(data);

  if (!tripEventItems.length) {
    renderElement(tripEventsTitle, new NoPoints().getElement(), POSITION.AFTEREND);
    return;
  }

  renderElement(tripEventsTitle, new Sort().getElement(), POSITION.BEFOREBEGIN);
  renderTripDays(tripDays);
  renderTripEventItems(tripDays);
};

const tripEventItems = generateTripEventsData(TRIP_EVENT_ITEM_QUANTITY);
renderMainContent(tripEventItems);
