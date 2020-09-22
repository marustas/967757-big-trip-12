import API from './api.js';
import MenuComponent, {MenuItem} from './view/menu.js';
import {getPrice} from './utils/common.js';
import {RenderPosition, render, remove} from './utils/render.js';
import TripDays from './presenter/trip-days.js';
import PointsModel from './model/points.js';
import DestinationsModel from './model/destination.js';
import OffersModel from './model/offer.js';
import Filter from './presenter/filter.js';
import Statistics from './view/statistics.js';

import TripCost from './view/trip-cost.js';
import {tripInfoContainer, renderTripInfo} from './utils/trip-info.js';

const AUTORISATION = `Basic dsfsfe3redgdg`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const api = new API(END_POINT, AUTORISATION);

const headerElement = document.querySelector(`.page-header`);
const tripMenuElement = headerElement.querySelector(`.trip-main`);
const newPointButton = headerElement.querySelector(`.trip-main__event-add-btn`);
const mainElement = document.querySelector(`.page-body__page-main`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);
const pointsModel = new PointsModel();

const menuComponent = new MenuComponent();
const renderTripMenuOptions = () => {
  const tripSwitchElement = tripMenuElement.querySelector(`.trip-main__trip-controls h2:first-child`);
  render(tripSwitchElement, menuComponent, RenderPosition.AFTEREND);
};

renderTripMenuOptions();

export const renderTripCost = (model) => {
  const tripCost = getPrice(model);
  const tripCostComponent = new TripCost(tripCost);

  if (tripInfoContainer) {
    remove(tripInfoContainer);
  }

  render(tripInfoContainer.getElement(), tripCostComponent);
  render(tripMenuElement, tripInfoContainer, RenderPosition.AFTERBEGIN);
};

const filterController = new Filter(mainElement, pointsModel);
filterController.render();

const tripController = new TripDays(tripEventsElement, pointsModel, api);

const newPointClickHandler = (evt) => {
  evt.preventDefault();
  filterController.setDefaultView();
  tripController.createPoint(newPointButton);
};

newPointButton.addEventListener(`click`, newPointClickHandler);

const statisticsComponent = new Statistics(pointsModel);
render(tripEventsElement, statisticsComponent, RenderPosition.AFTEREND);
statisticsComponent.hide();

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      menuComponent.setActiveItem(MenuItem.TABLE);
      statisticsComponent.hide();
      tripController.show();
      break;
    case MenuItem.STATISTICS:
      menuComponent.setActiveItem(MenuItem.STATISTICS);
      filterController.setDefaultView();
      tripController.hide();
      statisticsComponent.show();
      break;
  }
});

api.getPoints()
  .then((points) => {
    renderTripInfo(points);
    tripController.renderSortMenu();
    tripController.renderPreloader();

    pointsModel.setPoints(points);
    for (const point of points) {
      if (point.offers.length > 0) {
        for (const offer of point.offers) {
          offer.isChecked = true;
        }
      }
    }

    const pointsOfDeparture = points.slice().sort((a, b) => a.departure > b.departure ? 1 : -1);
    renderTripCost(pointsModel.getPoints(pointsOfDeparture));
    tripController.render();
  });

api.getDestinations()
  .then((destinations) => {
    DestinationsModel.setDestinations(destinations);
  });

api.getOffers()
  .then((offers) => {
    OffersModel.setOffers(offers);
  });
