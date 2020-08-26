
import TripEventComponent from "../view/trip-event";
import EventEditComponent from "../view/event-edit";
import {render, RenderPosition, replace, remove} from "../utils/render";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

const EmptyEvent = {
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {
    name: ``,
    description: ``,
    pictures: []
  },
  id: 0,
  isFavorite: false,
  offers: {
    type: ``,
    offers: []
  },
  type: `taxi`
};

export default class EventController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event, cities, mode) {
    this._mode = mode;
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;
    const isInAddingMode = this._mode === Mode.ADDING;

    this._eventComponent = new TripEventComponent(event);
    this._eventEditComponent = new EventEditComponent(event, cities, isInAddingMode);

    this._eventComponent.setRollupButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._eventEditComponent.getData();
      this._onDataChange(this, event, data);
      this._replaceEditToEvent();
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, event, null));

    this._eventEditComponent.setFavoriteButtonClickHandler(() => {
      const data = {isFavorite: !event.isFavorite};
      this._onDataChange(this, event, data);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventEditComponent && oldEventComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
        } else {
          render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldEventEditComponent && oldEventComponent) {
          remove(this._eventComponent, oldEventComponent);
          remove(this._eventEditComponent, oldEventEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._eventEditComponent, RenderPosition.BEFOREBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditComponent.reset();

    if (document.contains(this._eventEditComponent.getElement())) {
      replace(this._eventComponent, this._eventEditComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
      }
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

export {Mode, EmptyEvent};
