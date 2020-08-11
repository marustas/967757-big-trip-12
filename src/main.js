import {POSITION} from './constant';
import {render} from './utils';
import {Info} from './view/information';
import {Cost} from './view/cost';
import {Menu} from './view/menu';
import {Filter} from './view/filters';
import {Sort} from './view/sort';
import {TripEventItem} from './view/trip-event';
import {TripEventEditItem} from './view/event-edit';
import {TripDaysList} from './view/trip-list';
import {TripDays} from './view/trip-days';
import {TripEventList} from './view/event-list';
import {generateTripEventsData} from "./mock/trip-event";
import {generateTripDays, getTripDaysString} from "./mock/trip-time";

const TRIP_EVENT_ITEM_QUANTITY = 20;

const tripEventItems = generateTripEventsData(TRIP_EVENT_ITEM_QUANTITY);
const tripDays = generateTripDays(tripEventItems);

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new Info(tripEventItems).getElement(), POSITION.AFTERBEGIN);

const tripMainInfo = tripMain.querySelector(`.trip-main__trip-info`);
render(tripMainInfo, new Cost().getElement(), POSITION.BEFOREEND);

const tripMainControls = tripMain.querySelector(`.trip-main__trip-controls`);
const tripMainControlsTitle = tripMain.querySelector(`.trip-main__trip-controls h2:first-child`);
render(tripMainControls, new Filter().getElement(), POSITION.BEFOREEND);
render(tripMainControlsTitle, new Menu().getElement(), POSITION.AFTEREND);

const tripEvents = document.querySelector(`.trip-events`);
const tripEventsTitle = tripEvents.querySelector(`.trip-events h2:first-child`);
render(tripEventsTitle, new TripDaysList().getElement(), POSITION.AFTEREND);
render(tripEventsTitle, new Sort().getElement(), POSITION.AFTEREND);

const tripDaysList = tripEvents.querySelector(`.trip-days`);
Array.from(tripDays)
  .forEach((item, i) => {
    render(tripDaysList, new TripDays(item, i + 1).getElement(), POSITION.BEFOREEND);
  });

const renderEvent = (eventsContainer, data) => {
  const tripEventItem = new TripEventItem(data);
  const tripEventEditItem = new TripEventEditItem(data);
  const tripEventItemRollupBtn = tripEventItem.getElement().querySelector(`.event__rollup-btn`);
  const tripEventEditForm = tripEventEditItem.getElement();

  const onRollupBtnClick = () => {
    eventsContainer.replaceChild(tripEventEditItem.getElement(), tripEventItem.getElement());
  };

  const onEventEditSubmit = (evt) => {
    evt.preventDefault();
    eventsContainer.replaceChild(tripEventItem.getElement(), tripEventEditItem.getElement());
  };

  tripEventItemRollupBtn.addEventListener(`click`, onRollupBtnClick);
  tripEventEditForm.addEventListener(`submit`, onEventEditSubmit);

  render(eventsContainer, tripEventItem.getElement(), POSITION.BEFOREEND);
};

const tripDaysItem = tripDaysList.querySelectorAll(`.trip-days__item`);
tripDaysItem.forEach((item) => {
  render(item, new TripEventList().getElement(), POSITION.BEFOREEND);
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

