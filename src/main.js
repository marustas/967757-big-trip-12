import RouteAndCost from "../src/view/route-and-cost";
import SwitchTripView from "../src/view/switch-trip";
import FilterController from "../src/presenter/filter";
import TripController from "./presenter/trip";
import {events as mockedEvents, cities} from "./mock/event";
import {createRouteAndCostData} from "./utils/components/route-and-cost";
import {render, RenderPosition} from "./utils/render";
import EventsModel from "./model/point";

const eventsModel = new EventsModel();
eventsModel.setEvents(mockedEvents);
eventsModel.setDays();
eventsModel.setCities(cities);

const routeAndCostList = createRouteAndCostData(mockedEvents);

const tripMain = document.querySelector(`.trip-main`);
const tripViewSwitcher = document.querySelector(`.trip-controls h2:first-child`);
const tripFilters = document.querySelector(`.trip-controls h2:last-child`);
const tripEventsHeader = document.querySelector(`.trip-events h2`);
const newEventButton = document.querySelector(`.trip-main__event-add-btn`);

render(tripMain, new RouteAndCost(routeAndCostList), RenderPosition.AFTERBEGIN);
render(tripViewSwitcher, new SwitchTripView(), RenderPosition.AFTEREND);
const filterController = new FilterController(tripFilters, eventsModel);
filterController.render();

const tripController = new TripController(tripEventsHeader, eventsModel);
tripController.render();

newEventButton.addEventListener(`click`, (evt) => {
  evt.target.disabled = !evt.target.disabled;

  tripController.createEvent(evt.target);
  filterController.setFilterToDefault();
});
