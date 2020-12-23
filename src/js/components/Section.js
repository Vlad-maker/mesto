export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._imagesArray = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    render() {
        this._imagesArray.forEach(cardElement => {
            this._renderer(cardElement);
        });
    }

    addItem(cardElement) {
        if (this._imagesArray.length > 1) {
            this._container.append(cardElement);
        } else {
            this._container.prepend(cardElement);
        }
    }
}