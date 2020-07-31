import createRouteAndCostMarkup from "../src/view/cost-and-route";
import createSwitchTripViewMarkup from "../src/view/switch-and-view";
import createFiltersMarkup from "../src/view/filters";
import createSortMarkup from "../src/view/sort";
import createTripDaysMarkup from "../src/view/trip";


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`);
const tripViewSwitcher = document.querySelector(`.trip-controls h2:first-child`);
const tripFilters = document.querySelector(`.trip-controls h2:last-child`);
const tripEvents = document.querySelector(`.trip-events`);
const tripEventsSort = document.querySelector(`.trip-events h2`);

render(tripMain, createRouteAndCostMarkup(), `afterbegin`);
render(tripViewSwitcher, createSwitchTripViewMarkup(), `afterend`);
render(tripFilters, createFiltersMarkup(), `afterend`);
render(tripEventsSort, createSortMarkup(), `afterend`);
render(tripEvents, createTripDaysMarkup(), `beforeend`);
