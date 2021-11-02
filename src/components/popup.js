export default class {
    constructor(selector) {
        this._element = document.querySelector(selector);
    }

    open(minPrice, maxPrice) {
        const heading = this._element.querySelector('.popup__heading');
        heading.innerHTML = `От&nbsp;${minPrice * 3}₽\nдо&nbsp;${maxPrice * 3}₽`
        this._element.style.display = 'flex';
    }

    close() {
        this._element.style.display = 'none';
    }

    setEventListeners() {
        const closeButton = this._element.querySelector('.popup__close');
        closeButton.addEventListener('click', () => {
            this.close();
        })
        this._element.addEventListener('click', (e) => {
            if(Array.from(e.currentTarget.classList).includes('popup')) {
                this.close();
            }
        })
    }

}