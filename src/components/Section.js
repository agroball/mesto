export class Section {
    constructor(renderer, listContainerElements) {
        this._renderer = renderer;
        // this._container = listContainerElements;
        this._container = document.querySelector(listContainerElements);
    }

    // обходит массив, для каждого элемента создаёт экземпляр карточки, вызывает addItem
    render(items) {
        items.forEach((item) => {
            this._renderer(item)
        })
    }

    // добавляет элемент в контейнер
    addItem(element) {
        this._container.prepend(element);
    }


    setItem(element) {
        this._container.append(element);
    }
}