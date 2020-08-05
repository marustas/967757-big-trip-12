import {createInfo} from './view/information';
import {createCost} from './view/cost';
import {createMenu} from './view/menu';
import {createFilter} from './view/filters';
import {createSort} from './view/sort';
import {createEventEdit} from './view/event-edit';
import {createTripDaysList} from './view/trip-list';
import {createTripDaysItem} from './view/trip-days';
import {createTripEventsList} from './view/event-list';
import {createTripEventItem} from './view/trip-event';
import {generateTripEventsData} from "./mock/trip-event";
import {generateTripDays, getTripDaysString} from "./mock/trip-time";

const TRIP_EVENT_ITEM_QUANTITY = 20;

const tripEventItems = generateTripEventsData(TRIP_EVENT_ITEM_QUANTITY);
const tripDays = generateTripDays(tripEventItems);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
render(tripMainElement, createInfo(tripEventItems), `afterBegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, createCost(), `beforeEnd`);

const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripControlsTitleElement = tripMainElement.querySelector(`.trip-main__trip-controls h2:first-child`);
render(tripControlsElement, createFilter(), `beforeEnd`);
render(tripControlsTitleElement, createMenu(), `afterEnd`);

const tripEventsElement = document.querySelector(`.trip-events`);
const tripEventsTitleElement = tripEventsElement.querySelector(`.trip-events h2:first-child`);
render(tripEventsTitleElement, createSort(), `afterEnd`);
render(tripEventsElement, createTripDaysList(), `beforeEnd`);

const tripDaysList = tripEventsElement.querySelector(`.trip-days`);
Array.from(tripDays)
  .forEach((item, i) => {
    render(tripDaysList, createTripDaysItem(item, i + 1), `beforeEnd`);
  });

const tripDaysItem = tripDaysList.querySelectorAll(`.trip-days__item`);
tripDaysItem.forEach((item, i) => {
  render(item, createTripEventsList(), `beforeEnd`);
  const tripEventsList = item.querySelector(`.trip-events__list`);

  tripEventItems
    .slice()
    .sort((a, b) => new Date(a.date.startDate) - new Date(b.date.startDate))
    .filter((eventItem) => getTripDaysString(eventItem) === tripDays[0])
    .forEach((dayEvent, count) => {
      if (i === 0) {
        if (count === 0) {
          render(tripEventsList, createEventEdit(dayEvent), `beforeEnd`);
          return;
        }
        render(tripEventsList, createTripEventItem(dayEvent), `beforeEnd`);
        return;
      }
      render(tripEventsList, createTripEventItem(dayEvent), `beforeEnd`);
    });
  tripDays.shift();
});
