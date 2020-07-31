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

const TRIP_EVENT_ITEM_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
render(tripMainElement, createInfo(), `afterBegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, createCost(), `beforeEnd`);

const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripControlsTitleElement = tripMainElement.querySelector(`.trip-main__trip-controls h2:first-child`);
render(tripControlsElement, createFilter(), `beforeEnd`);
render(tripControlsTitleElement, createMenu(), `afterEnd`);

const tripEventsElement = document.querySelector(`.trip-events`);
const tripEventsTitleElement = tripEventsElement.querySelector(`.trip-events h2:first-child`);
render(tripEventsTitleElement, createSort(), `afterEnd`);
render(tripEventsElement, createEventEdit(), `beforeEnd`);
render(tripEventsElement, createTripDaysList(), `beforeEnd`);

const tripDaysList = tripEventsElement.querySelector(`.trip-days`);
render(tripDaysList, createTripDaysItem(), `afterBegin`);

const tripDaysItem = tripDaysList.querySelector(`.trip-days__item`);
render(tripDaysItem, createTripEventsList(), `beforeEnd`);

const tripEventsList = tripDaysItem.querySelector(`.trip-events__list`);
new Array(TRIP_EVENT_ITEM_COUNT)
  .fill(``)
  .forEach(() => {
    render(tripEventsList, createTripEventItem(), `beforeEnd`);
  });
