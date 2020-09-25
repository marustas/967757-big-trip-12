import TripDayComponent from '../view/trip-day.js';
import TripDaysComponent from '../view/trip-days.js';
import SortComponent, {SortTypes} from '../view/sort.js';
import TripsContainerComponent from '../view/trips-container.js';
import {render, remove} from '../utils/render.js';
import PointController, {Mode as PointControllerMode, EmptyPoint} from './point-controller.js';
import NoPointsComponent from '../view/no-points.js';
import PreloaderComponent from '../view/preloader.js';
import {INPUT_YEAR_MONTH_DAY_FORMAT} from '../utils/common.js';
import {renderTripCost} from '../main.js';
import {renderTripInfo} from '../utils/trip-info.js';
import moment from "moment";

const getDays = (points) => {
  const daysList = [];
  const days = new Set(points.map((point) => new Date(moment(point.departure).format(INPUT_YEAR_MONTH_DAY_FORMAT)).getTime()));

  for (const day of days) {
    daysList.push(new Date(day));
  }

  return daysList;
};

export default class TripDays {
  constructor(container, pointsModel, api) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._api = api;

    this._sortComponent = new SortComponent();
    this._tripDaysComponent = new TripDaysComponent();
    this._preloaderComponent = new PreloaderComponent();

    this._points = null;
    this._tripDayComponent = null;
    this._creatingPoint = null;
    this._showedPointsControllers = [];
    this._noPointsComponent = null;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this._pointsModel.setFilterChangeHandler(this._filterChangeHandler);
  }

  render() {
    this._points = this._pointsModel.getPointsAll();

    render(this._container, this._tripDaysComponent);

    this._noPointsComponent = new NoPointsComponent();

    this._api.getPoints()
      .then((points) => {
        remove(this._preloaderComponent);

        if (points.length > 0) {

          if (this._noPointsComponent) {
            remove(this._noPointsComponent);
          }

          this._renderPoints(this._points);
        } else {
          render(this._container, this._noPointsComponent);
        }
      });

    this._sortComponent.setSortTypeChangeHandler(() => {
      this._getSortedTrips(this._sortComponent.getSortType());
    });
  }

  createPoint(button) {
    this._getSortedTrips(SortTypes.SORT_EVENT);
    button.setAttribute(`disabled`, `true`);

    const container = this._tripDaysComponent.getElement();
    this._creatingPoint = new PointController(container, this._dataChangeHandler, this._viewChangeHandler, button);
    this._creatingPoint.render(EmptyPoint, PointControllerMode.ADDING);
  }

  _getSortedTrips(sortType) {
    switch (sortType) {
      case SortTypes.SORT_EVENT:
        const sortEventInput = document.querySelector(`#sort-event`);
        sortEventInput.checked = true;

        const pointsEvent = this._pointsModel.getPointsAll().slice();
        this._tripDaysComponent.getElement().innerHTML = ``;

        this._renderPoints(pointsEvent);
        break;

      case SortTypes.SORT_TIME:
        const pointsTime = this._pointsModel.getPointsAll().slice();
        pointsTime.sort((a, b) => a.arrival - a.departure > b.arrival - b.departure ? 1 : -1);
        this._tripDaysComponent.getElement().innerHTML = ``;

        this._renderSortPoints(pointsTime);
        break;

      case SortTypes.SORT_PRICE:
        const pointsPrice = this._pointsModel.getPointsAll().slice();
        pointsPrice.sort((a, b) => a.price > b.price ? 1 : -1);
        this._tripDaysComponent.getElement().innerHTML = ``;

        this._renderSortPoints(pointsPrice);
        break;
    }
  }

  _renderPoints(points) {
    const days = getDays(points);
    for (const day of days) {
      this._tripDayComponent = new TripDayComponent(day);
      render(this._tripDaysComponent.getElement(), this._tripDayComponent);

      for (const point of points) {
        const pointDate = new Date(moment(point.departure).format(INPUT_YEAR_MONTH_DAY_FORMAT)).getTime();

        if (pointDate === day.getTime()) {
          const tripEventsListElement = this._tripDayComponent.getElement().querySelector(`.trip-events__list`);
          const pointController = new PointController(tripEventsListElement, this._dataChangeHandler, this._viewChangeHandler);
          pointController.render(point, PointControllerMode.DEFAULT);
          this._showedPointsControllers = this._showedPointsControllers.concat(pointController);
        }
      }
    }
  }

  // Отрисовка отсортированных точек маршрута;
  _renderSortPoints(sortPointsList) {
    this._tripDayComponent = new TripsContainerComponent();
    render(this._tripDaysComponent.getElement(), this._tripDayComponent);

    const container = this._tripDayComponent.getElement().querySelector(`.trip-events__list`);

    for (const point of sortPointsList) {
      const pointController = new PointController(container, this._dataChangeHandler, this._viewChangeHandler);
      pointController.render(point, PointControllerMode.DEFAULT);
      this._showedPointsControllers = this._showedPointsControllers.concat(pointController);
    }
  }

  _dataChangeHandler(pointController, oldData, newData) {
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        this._api.deletePoint(oldData.id)
          .then(() => {
            this._showNoPoints();
            pointController.disableFormElements(false);
            pointController.renameDeleteButton(false);
            pointController.destroy();

            this._pointsModel.removePoint(oldData.id);
            this._updatePoints();
          }).catch(() => {
            pointController.renameDeleteButton(false);
            pointController.shake();
          });
      } else {

        this._api.createPoint(newData)
          .then((pointsModel) => {
            this._showNoPoints();
            pointController.disableFormElements(false);
            pointController.renameSaveButton(false);
            pointController.replaceEditToNewPoint();

            this._pointsModel.addPoint(pointsModel);
            this._updatePoints();
          }).catch(() => {
            pointController.shake();
          });
      }
    } else if (newData === null) {
      this._api.deletePoint(oldData.id)
        .then(() => {
          this._showNoPoints();
          pointController.disableFormElements(false);
          pointController.renameDeleteButton(false);
          pointController.destroy(oldData.id);
          this._updatePoints();

          this._pointsModel.removePoint(oldData.id);
          this._updatePoints();
        }).catch(() => {
          pointController.renameDeleteButton(false);
          pointController.shake();
        });
    } else {
      this._api.updatePoint(oldData.id, newData)
        .then((pointsModel) => {
          const isSuccess = this._pointsModel.updatePoint(oldData.id, pointsModel);

          if (isSuccess) {
            pointController.disableFormElements(false);
            pointController.renameSaveButton(false);
            pointController.replaceEditToPoint();

            this._updatePoints();
          }
        }).catch(() => {
          pointController.renameDeleteButton(false);
          pointController.shake();
        });
    }
  }

  _viewChangeHandler() {
    this._showedPointsControllers.forEach((it) => it.setDefaultView());
  }

  _removePoints() {
    this._tripDaysComponent.getElement().innerHTML = ``;
    this._showedPointsControllers.forEach((pointController) => pointController.destroy());
    this._showedPointsControllers = [];
  }

  _updatePoints() {
    this._removePoints();
    this._renderPoints(this._pointsModel.getPoints());
    renderTripCost(this._pointsModel.getPoints());
    renderTripInfo(this._pointsModel.getPoints());
  }

  _filterChangeHandler() {
    this._updatePoints();
  }

  hide() {
    this._container.classList.add(`visually-hidden`);
  }

  show() {
    this._container.classList.remove(`visually-hidden`);
  }

  _showNoPoints() {
    this._api.getPoints()
      .then((points) => {
        if (points.length === 0) {
          render(this._container, this._noPointsComponent);
        } else {
          remove(this._noPointsComponent);
        }
      });
  }

  // Отрисовка меню сортировки;
  renderSortMenu() {
    render(this._container, this._sortComponent);
  }

  renderPreloader() {
    render(this._container, this._preloaderComponent);
  }
}
