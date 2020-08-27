import TripCostComponent from './view/trip-cost.js';
import MenuComponent from './view/menu.js';
import {getPrice} from './utils/common.js';
import {RenderPosition, render} from './utils/render.js';
import {generateTripPoints} from './mock/way-point.js';
import TripController from './presenter/trip-days.js';
import PointsModel from './model/point.js';
import FilterController from './presenter/filter.js';

// Общие переменные;
const randomPointsList = generateTripPoints();
const headerElement = document.querySelector(`.page-header`);
const tripMenuElement = headerElement.querySelector(`.trip-main`);
const newPointButton = headerElement.querySelector(`.trip-main__event-add-btn`);

const mainElement = document.querySelector(`.page-body__page-main`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);

const pointsList = randomPointsList.slice().sort((a, b) => a.departure > b.departure ? 1 : -1);
const pointsModel = new PointsModel();
pointsModel.setPoints(pointsList);

// Отрисовка пунктов меню: Table, Status;
const renderTripMenuOptions = () => {
  const tripSwitchElement = tripMenuElement.querySelector(`.trip-main__trip-controls h2:first-child`);
  const menuComponent = new MenuComponent();
  render(tripSwitchElement, menuComponent, RenderPosition.AFTEREND);
};

renderTripMenuOptions();

// Отрисовка общей цены поездок в шапке (для всех точек маршрута);
const renderTripCost = () => {
  const tripCost = getPrice(randomPointsList);
  render(tripMenuElement, new TripCostComponent(tripCost), RenderPosition.AFTERBEGIN);
};

renderTripCost();

// Отрисовка отфильтрованных точек маршрута;
const filterController = new FilterController(mainElement, pointsModel);
filterController.render();

// Отрисовка информации о днях путешествия;
const tripController = new TripController(tripEventsElement, pointsModel);
tripController.render();

const newPointClickHandler = (evt) => {
  evt.preventDefault();
  filterController.setDefaultView();
  tripController.createPoint(newPointButton);
};

newPointButton.addEventListener(`click`, newPointClickHandler);
