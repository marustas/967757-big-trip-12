import {POSITION, renderElement} from './utils/render';
import InfoContainer from './view/info-container';
import MainInfo from './view/main-info';
import Cost from './view/cost';
import Menu from './view/menu';
import Filter from './view/filters';
import TripController from './presenter/trip';
import {generateTripEventsData} from "./mock/trip-event";

const TRIP_EVENT_ITEM_QUANTITY = 20;
const tripMain = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);

const renderInfo = (infoData) => {
  const infoContainer = new InfoContainer();
  renderElement(tripMain, infoContainer, POSITION.AFTERBEGIN);
  renderElement(infoContainer.getElement(), new Cost(), POSITION.BEFOREEND);
  if (infoData.length) {
    renderElement(tripMain, new MainInfo(infoData), POSITION.AFTERBEGIN);
  }
};

const renderTripMainControls = () => {
  const tripMainControls = tripMain.querySelector(`.trip-main__trip-controls`);
  const tripMainControlsTitle = tripMain.querySelector(`.trip-main__trip-controls h2:first-child`);

  renderElement(tripMainControls, new Filter(), POSITION.BEFOREEND);
  renderElement(tripMainControlsTitle, new Menu(), POSITION.AFTEREND);
};

const tripEventItems = generateTripEventsData(TRIP_EVENT_ITEM_QUANTITY);

const mainTripListController = new TripController(tripEvents);

renderTripMainControls();
renderInfo(tripEventItems);
mainTripListController.render(tripEventItems);
