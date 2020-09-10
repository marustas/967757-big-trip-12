import TripInfoContainerComponent from '../view/trip-info-container.js';
import TripInfoComponent from '../view/trip-info.js';
import {render, RenderPosition} from './render';
import {correctMonthAndDayFormat} from './common';

// Отрисовка информации о крайних точках маршрута в шапке;
export const tripInfoContainer = new TripInfoContainerComponent();
export const renderTripInfo = (points) => {
  if (points.length > 0) {

    const sortedList = points.slice().sort((a, b) => a.date > b.date ? 1 : -1);

    const firstPointDestination = sortedList[0].destinationInfo.name;
    const firstDate = sortedList[0].departure;

    if (sortedList.length === 1) {
      const tripInfo = `${firstPointDestination}`;
      const tripDate = `${correctMonthAndDayFormat(firstDate)}`;

      render(tripInfoContainer.getElement(), new TripInfoComponent(tripInfo, tripDate), RenderPosition.AFTERBEGIN);
    }

    if (sortedList.length === 2) {
      const lastPointDestination = sortedList[sortedList.length - 1].destinationInfo.name;
      const lastDate = sortedList[sortedList.length - 1].departure;

      const tripInfo = `${firstPointDestination} — ${lastPointDestination}`;
      const tripDate = `${correctMonthAndDayFormat(firstDate)} — ${correctMonthAndDayFormat(lastDate)}`;

      render(tripInfoContainer.getElement(), new TripInfoComponent(tripInfo, tripDate), RenderPosition.AFTERBEGIN);
    }

    if (sortedList.length === 3) {
      const secondPointDestination = sortedList[1].destinationInfo.name;
      const lastPointDestination = sortedList[sortedList.length - 1].destinationInfo.name;
      const lastDate = sortedList[sortedList.length - 1].departure;

      const tripInfo = `${firstPointDestination} — ${secondPointDestination} — ${lastPointDestination}`;
      const tripDate = `${correctMonthAndDayFormat(firstDate)} — ${correctMonthAndDayFormat(lastDate)}`;

      render(tripInfoContainer.getElement(), new TripInfoComponent(tripInfo, tripDate), RenderPosition.AFTERBEGIN);
    }

    if (sortedList.length > 3) {
      const lastPointDestination = sortedList[sortedList.length - 1].destinationInfo.name;
      const lastDate = sortedList[sortedList.length - 1].departure;

      const tripInfo = `${firstPointDestination} ... ${lastPointDestination}`;
      const tripDate = `${correctMonthAndDayFormat(firstDate)} — ${correctMonthAndDayFormat(lastDate)}`;

      render(tripInfoContainer.getElement(), new TripInfoComponent(tripInfo, tripDate), RenderPosition.AFTERBEGIN);
    }
  }
};
