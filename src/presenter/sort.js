import SortComponent from "../view/sort";
import {SortType} from "../utils/components/sort";
import {render, replace, RenderPosition} from "../utils/render";

export default class SortController {
  constructor(container, onSortTypeChange) {
    this._container = container;

    this._activeSortType = SortType.DEFAULT;
    this._sortComponent = null;

    this._onSortTypeChange = onSortTypeChange;
    this._onSortChange = this._onSortChange.bind(this);
    this.setSortToDefault = this.setSortToDefault.bind(this);
  }

  render() {
    const container = this._container;
    const sorts = Object.values(SortType).map((sortType) => {
      return {
        name: sortType,
        checked: sortType === this._activeSortType,
      };
    });

    const oldComponent = this._sortComponent;

    this._sortComponent = new SortComponent(sorts);
    this._sortComponent.setSortChangeHandler(this._onSortChange);

    if (oldComponent) {
      replace(this._sortComponent, oldComponent);
    } else {
      render(container, this._sortComponent, RenderPosition.AFTEREND);
    }
  }

  _onSortChange(sortType) {
    this._activeSortType = sortType;
    this.render();
    this._onSortTypeChange(sortType);
  }

  getActiveSortType() {
    return this._activeSortType;
  }

  setSortToDefault() {
    if (this._activeSortType === SortType.DEFAULT) {
      return;
    }

    this._activeSortType = SortType.DEFAULT;
    this.render();
    this._onSortTypeChange(this._activeSortType);
  }
}
