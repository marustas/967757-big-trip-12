
import {POSITION, renderElement, replaceElement, removeElement} from '../utils/render';
import TripEventItem from '../view/trip-event';
import TripEventEditItem from '../view/event-edit';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class Point {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._tripEventItem = null;
    this._tripEventEditItem = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(eventItemData) {
    const oldEventComponent = this._tripEventItem;
    const oldEventEditComponent = this._tripEventEditItem;

    this._tripEventItem = new TripEventItem(eventItemData);
    this._tripEventEditItem = new TripEventEditItem(eventItemData);

    this._tripEventItem.setEditButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._tripEventEditItem.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToEvent();
    });

    this._tripEventEditItem.setFavoritesButtonClickHandler(() => {
      const newIsFavoriteData = eventItemData.isFavorite;
      this._onDataChange(this, eventItemData, Object.assign({}, eventItemData, {
        isFavorite: newIsFavoriteData,
      }));
    });

    this._tripEventEditItem.setEventTypeBtnsClickHandler((evt) => {
      const newEventTypeData = this._tripEventEditItem.getElement().querySelector(`#${evt.target.htmlFor}`).value;
      this._onDataChange(this, eventItemData, Object.assign({}, eventItemData, {
        type: newEventTypeData,
      }));
    });

    this._tripEventEditItem.setDestinationChangeHandler((evt) => {
      const newDestinationData = evt.currentTarget.value;
      this._onDataChange(this, eventItemData, Object.assign({}, eventItemData, {
        destinationName: newDestinationData,
      }));
    });

    if (oldEventEditComponent && oldEventComponent) {
      replaceElement(this._tripEventItem, oldEventComponent);
      replaceElement(this._tripEventEditItem, oldEventEditComponent);
      removeElement(oldEventEditComponent);
      removeElement(oldEventComponent);
    } else {
      renderElement(this._container, this._tripEventItem, POSITION.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replaceElement(this._tripEventItem, this._tripEventEditItem);
    this._mode = Mode.DEFAULT;
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replaceElement(this._tripEventEditItem, this._tripEventItem);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceElement(this._tripEventItem, this._tripEventEditItem);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
