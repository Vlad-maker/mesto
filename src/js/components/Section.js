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

    prependItem(cardElement) {
        this._container.prepend(cardElement)
    }
}