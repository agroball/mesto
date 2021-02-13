export class Section {
    constructor({ items, renderer }, listContainerElements) {
        this._items = items;
        this._renderer = renderer;
        this._container = listContainerElements;
    }

    // обходит массив, для каждого элемента создаёт экземпляр карточки, вызывает addItem
    rendererCard() {
        this._items.forEach((item) => {
            this._renderer(item)
        })
    }

    // добавляет элемент в контейнер
    addItem(element) {
        this._container.append(element);
    }


    setItem(element) {
        this._container.prepend(element);
    }
}