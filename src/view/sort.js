import Abstract from "./abstract";
import {SortType} from "../utils/components/sort";
import {capitalize} from "../utils/common";

const createSortMarkup = (sort) => {
  const {name, checked} = sort;

  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}"
        ${checked ? `checked` : ``}>
      <label class="trip-sort__btn" for="sort-${name}" data-sort-type="${name}">
      ${capitalize(name)}
      ${name !== SortType.DEFAULT ?
      `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"></path>
       </svg>` : ``}
      </label>
    </div>`
  );
};

const createSortsMarkup = (sorts) => {
  const sortsMarkup = sorts.map((it) => createSortMarkup(it)).join(`\n`);
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
        ${sortsMarkup}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class Sort extends Abstract {
  constructor(sorts) {
    super();

    this._sorts = sorts;
  }

  getTemplate() {
    return createSortsMarkup(this._sorts);
  }

  setSortChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const sortType = evt.target.dataset.sortType;
      handler(sortType);
    });
  }
}
