import FilterComponent from "../view/filters.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {getPointsByFilter} from "../utils/filter.js";

const headerElement = document.querySelector(`.page-header`);
const tripMenuElement = headerElement.querySelector(`.trip-main`);
const tripFilterElement = tripMenuElement.querySelector(`.trip-main__trip-controls h2:last-child`);

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export default class Filter {
  constructor(container, pointsModel) {
    this._container = tripFilterElement;
    this._pointsModel = pointsModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this._pointsModel.setDataChangeHandler(this._dataChangeHandler);
  }

  render() {
    const container = this._container;
    const allPoints = this._pointsModel.getPointsAll();

    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getPointsByFilter(allPoints, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._filterChangeHandler);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.AFTEREND);
    }
  }

  _filterChangeHandler(filterType) {
    this._pointsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _dataChangeHandler() {
    this.render();
  }

  setDefaultView() {
    this._activeFilterType = FilterType.EVERYTHING;
    this.render();
  }
}
