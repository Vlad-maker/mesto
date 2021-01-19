export class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }
    handleResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getInitialCards() {
        return fetch(`${this._url}cards`, {
                headers: this._headers
            })
            .then(res => this.handleResponse(res));
    }
    addCard(cardName, cardLink) {
        return fetch(`${this._url}cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: cardName,
                    link: cardLink
                })
            })
            .then(res => this.handleResponse(res));
    }
    deleteCard(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(res => this.handleResponse(res));
    }
    getProfileData() {
        return fetch(`${this._url}users/me`, {
                headers: this._headers
            })
            .then(res => this.handleResponse(res));
    }
    updateProfileData(newName, newAbout) {
        return fetch(`${this._url}users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: newName,
                    about: newAbout
                })
            })
            .then(res => this.handleResponse(res));
    }
    updateProfileAvatar(newAvatar) {
        return fetch(`${this._url}users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: newAvatar
                })
            })
            .then(res => this.handleResponse(res));
    }
    setLike(cardId) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(res => this.handleResponse(res));
    }
    removeLike(cardId) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(res => this.handleResponse(res));
    }

};