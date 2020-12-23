export class FormValidation {
    constructor(formPopupInfo, form) {
        this._form = form;
        this._formSelector = formPopupInfo.formSelector;
        this._inputSelector = formPopupInfo.inputSelector;
        this._buttonElement = this._form.querySelector(formPopupInfo.submitButtonSelector);
        this._inactiveButtonClass = formPopupInfo.inactiveButtonClass;
        this._inputErrorClass = formPopupInfo.inputErrorClass;
    };

    //Показываем ошибку
    _showError() {
        this._error = document.querySelector(`#${this._input.id}-error`);
        this._input.classList.add(this._inputErrorClass);
        this._error.textContent = this._input.validationMessage;
    };

    //Скрываем ошибку
    _hideError() {
        this._error = document.querySelector(`#${this._input.id}-error`);
        this._input.classList.remove(this._inputErrorClass);
        this._error.textContent = '';
    };

    //Проверяем поля ввода
    _checkInputValidity() {
        if (!this._input.validity.valid) {
            this._showError();
        } else {
            this._hideError();
        }
    };

    //Активируем/деактивируем кнопку
    _toggleButtonStatus(isActive) {
        if (isActive) {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        } else {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._inactiveButtonClass);
        }
    };

    //Присваиваем слушателей событий
    _setEventListeners() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._inputList.forEach((input) => {
            input.addEventListener('input', (evt) => {
                this._input = evt.target;
                this._checkInputValidity();

                this._isValid = this._form.checkValidity();
                this._toggleButtonStatus(this._isValid);
            });
        });
    };

    //Валидируем
    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
        this._toggleButtonStatus(this._form.checkValidity());
    }
};