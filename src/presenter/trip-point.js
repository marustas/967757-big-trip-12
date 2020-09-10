import Form from '../view/form.js';
import Event from '../view/trip-point.js';
import FormContainerComponent from '../view/form-container.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import PointModel from "../model/point.js";

const ESC_KEYCODE = 27;
const SHAKE_ANIMATION_TIMEOUT = 600;

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

export const EmptyPoint = {
  id: String(new Date() + Math.random()),
  type: `Taxi`,
  destinationInfo: {
    description: ``,
    name: ``,
    pictures: [],
  },
  favorite: null,
  offers: [],
  price: 0,
  departure: `15/05/2020 14:31`,
  arrival: `15/05/2020 14:31`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange, button) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._point = null;

    this._pointComponent = null;
    this._formComponent = null;
    this._formContainerComponent = null;
    this._onEscKeyDown = null;

    this._newPointButton = button;
  }

  render(point, mode) {
    // Режим отрисовки точки маршрута (default, edit, adding);
    this._mode = mode;

    // Создание новой текущей точки маршурта;
    this._point = Object.assign({}, point); // point - точка маршрута, которая будет отрисована в контейнер;

    const oldPointComponent = this._pointComponent;
    const oldFormComponent = this._formComponent;

    this._pointComponent = new Event(this._point);
    this._formComponent = new Form(this._point, this._mode);
    this._formContainerComponent = new FormContainerComponent();

    // Отрисовка точки маршрута;
    if (!oldPointComponent && !oldFormComponent && mode === Mode.DEFAULT) { // Если нет старой точки и старой формы и режим дефолт - рендери новую точку
      render(this._container, this._pointComponent, RenderPosition.AFTERBEGIN);
    } else if (oldPointComponent && oldFormComponent && mode === Mode.DEFAULT) { // Если есть старая точка и старая форма и режим дефолт - замени старую точку на новую
      replace(this._pointComponent, oldPointComponent);
    }

    // Удаление формы редактиования точки маршрута по нажатию на ESC;
    this._onEscKeyDown = (evt) => {
      if (evt.keyCode === ESC_KEYCODE && this._mode === Mode.EDIT) {
        this.replaceEditToPoint();
        document.removeEventListener(`keydown`, this._onEscKeyDown);
      }

      if (evt.keyCode === ESC_KEYCODE && this._mode === Mode.ADDING) {
        this._newPointButton.removeAttribute(`disabled`);

        this._formComponent.reset();
        remove(this._formComponent);
        document.removeEventListener(`keydown`, this._onEscKeyDown);
      }
    };

    // Удаление формы редактирования точки маршрута;
    const deleteButtonClickHandler = () => {

      this.renameDeleteButton();
      this.disableFormElements();
      this._onDataChange(this, this._point, null);
    };

    // Выход из формы создания точки маршрута;
    const cancelButtonClickHandler = () => {
      if (this._newPointButton) {
        this._newPointButton.removeAttribute(`disabled`);
      }

      this._formComponent.reset();
      remove(this._formComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    };

    // Отлавливаю клик по "Delete" на форме редактирования точки маршрута;
    this._formComponent.setDeleteButtonClickHandler(deleteButtonClickHandler);

    // Отлавливаю клик по "Cancel" на форме создания точки маршрута;
    this._formComponent.setCancelButtonClickHandler(cancelButtonClickHandler);

    // Сохранение формы редактирования точки маршрута;
    const saveFormClickHandler = (evt) => {
      evt.preventDefault();

      const data = this._formComponent.getData(this._point);
      const newData = PointModel.clone(data);
      this._onDataChange(this, this._point, newData);

      this.renameSaveButton();
      this.disableFormElements();

      document.removeEventListener(`keydown`, this._onEscKeyDown);
    };

    // Замена формы на карточку пункта маршрута;
    const formRollupClickHandler = () => {
      this.replaceEditToPoint();

      this._pointComponent.setPointRollupClickHandler(pointRollUpClickHandler);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    };

    // Открытие формы редактирования точки маршрута (замена карточки на форму);
    const pointRollUpClickHandler = () => {
      this._replacePointToEdit();

      this._formComponent.setSaveFormClickHandler(saveFormClickHandler);
      this._formComponent.setFormRollupClickHandler(formRollupClickHandler);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    };

    // Отлавливаю клик по кнопке-rollUp на карточке точки маршрута;
    this._pointComponent.setPointRollupClickHandler(pointRollUpClickHandler);

    // Отрисовка формы редактирования для новой карточки;
    const newFormClickHandler = (evt) => {
      evt.preventDefault();

      const data = this._formComponent.getData(this._point);
      const newData = PointModel.clone(data);
      this._onDataChange(this, EmptyPoint, newData);

      this.renameSaveButton();
      this.disableFormElements();
      this._newPointButton.removeAttribute(`disabled`);

      document.removeEventListener(`keydown`, this._onEscKeyDown);

    };

    if (mode === Mode.ADDING) {
      render(this._container, this._formComponent, RenderPosition.AFTERBEGIN);
      this._formComponent.setSaveFormClickHandler(newFormClickHandler);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this.replaceEditToPoint();
    }
  }

  _replacePointToEdit() {
    this._onViewChange();
    replace(this._formContainerComponent, this._pointComponent);
    render(this._formContainerComponent.getElement(), this._formComponent);

    this._mode = Mode.EDIT;
  }

  replaceEditToPoint() {
    this._formComponent.reset();
    if (document.contains(this._formComponent.getElement())) {
      replace(this._pointComponent, this._formContainerComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  replaceEditToNewPoint() {
    this._formComponent.reset();
    if (document.contains(this._formComponent.getElement())) {
      remove(this._formComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  disableFormElements(status = true) {
    this._formComponent.getElement().querySelector(`.event__save-btn`).disabled = status;
    this._formComponent.getElement().querySelector(`.event__reset-btn`).disabled = status;
    this._formComponent.getElement().querySelector(`.event__type-toggle`).disabled = status;

    const favoriteButton = this._formComponent.getElement().querySelector(`#event-favorite-1`);
    const rollUpButton = this._formComponent.getElement().querySelector(`.event__rollup-btn`);
    if (favoriteButton && rollUpButton) {
      favoriteButton.disabled = status;
      rollUpButton.disabled = status;
    }

    const inputElements = this._formComponent.getElement().querySelectorAll(`.event__input`);
    for (const inputElement of inputElements) {
      inputElement.disabled = status;
    }

    const offerElements = this._formComponent.getElement().querySelectorAll(`.event__offer-selector .event__offer-checkbox`);
    if (offerElements.length > 0) {
      for (const offerElement of offerElements) {
        offerElement.disabled = status;
      }
    }
  }

  renameSaveButton(status = true) {
    const saveButton = this._formComponent.getElement().querySelector(`.event__save-btn`);
    if (status) {
      saveButton.textContent = `Saving...`;
    } else {
      saveButton.textContent = `Save`;
    }
  }

  renameDeleteButton(status = true) {
    const deleteButton = this._formComponent.getElement().querySelector(`.event__reset-btn`);
    if (status) {
      deleteButton.textContent = `Deleting...`;
    } else {
      deleteButton.textContent = `Delete`;
    }
  }

  destroy() {
    remove(this._formComponent);
    remove(this._pointComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shake() {
    this._formComponent.getElement().classList.add(`red-wrapper`);
    this._formComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._formComponent.getElement().style.animation = ``;

      this.disableFormElements(false);
      this.renameSaveButton(false);
    }, SHAKE_ANIMATION_TIMEOUT);
  }

}
