import TripInfoContainerComponent from '../view/trip-info-container.js';
import TripInfoComponent from '../view/trip-info.js';
import {render, RenderPosition} from './render';
import {correctMonthAndDayFormat} from './common';

export const tripInfoContainer = new TripInfoContainerComponent();
export const renderTripInfo = (points) => {
  if (points.length > 0) {

    const sortedLists = points.slice().sort((a, b) => a.date > b.date ? 1 : -1);

    const firstPointDestination = sortedLists[0].destinationInfo.name;
    const firstDate = sortedLists[0].departure;

    if (sortedLists.length === 1) {
      const tripInfo = `${firstPointDestination}`;
      const tripDate = `${correctMonthAndDayFormat(firstDate)}`;

      render(tripInfoContainer.getElement(), new TripInfoComponent(tripInfo, tripDate), RenderPosition.AFTERBEGIN);
    }

    if (sortedLists.length === 2) {
      const lastPointDestination = sortedLists[sortedLists.length - 1].destinationInfo.name;
      const lastDate = sortedLists[sortedLists.length - 1].departure;

      const tripInfo = `${firstPointDestination} — ${lastPointDestination}`;
      const tripDate = `${correctMonthAndDayFormat(firstDate)} — ${correctMonthAndDayFormat(lastDate)}`;

      render(tripInfoContainer.getElement(), new TripInfoComponent(tripInfo, tripDate), RenderPosition.AFTERBEGIN);
    }

    if (sortedLists.length === 3) {
      const secondPointDestination = sortedLists[1].destinationInfo.name;
      const lastPointDestination = sortedLists[sortedLists.length - 1].destinationInfo.name;
      const lastDate = sortedLists[sortedLists.length - 1].departure;

      const tripInfo = `${firstPointDestination} — ${secondPointDestination} — ${lastPointDestination}`;
      const tripDate = `${correctMonthAndDayFormat(firstDate)} — ${correctMonthAndDayFormat(lastDate)}`;

      render(tripInfoContainer.getElement(), new TripInfoComponent(tripInfo, tripDate), RenderPosition.AFTERBEGIN);
    }

    if (sortedLists.length > 3) {
      const lastPointDestination = sortedLists[sortedLists.length - 1].destinationInfo.name;
      const lastDate = sortedLists[sortedLists.length - 1].departure;

      const tripInfo = `${firstPointDestination} ... ${lastPointDestination}`;
      const tripDate = `${correctMonthAndDayFormat(firstDate)} — ${correctMonthAndDayFormat(lastDate)}`;

      render(tripInfoContainer.getElement(), new TripInfoComponent(tripInfo, tripDate), RenderPosition.AFTERBEGIN);
    }
  }
};
