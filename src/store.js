/**
 * Хранилище состояния приложения
 */
class Store {
    constructor(initState = {}) {
        this.state = initState;
        this.listeners = []; // Слушатели изменений состояния
        this.uniqueCode = {};
        this.maxCode = 0;
    }

    /**
     * Подписка слушателя на изменения состояния
     * @param listener {Function}
     * @returns {Function} Функция отписки
     */
    subscribe(listener) {
        this.listeners.push(listener);

        this.state.list.forEach(item => {
            const code = item.code;

            if (!this.uniqueCode[code]) {
                this.uniqueCode[code] = item;
            }

            if (code > this.maxCode) {
                this.maxCode = code;
            }
        })
        // Возвращается функция для удаления добавленного слушателя
        return () => {
            this.listeners = this.listeners.filter(item => item !== listener);
        }
    }

    /**
     * Выбор состояния
     * @returns {Object}
     */
    getState() {
        return this.state;
    }

    /**
     * Установка состояния
     * @param newState {Object}
     */
    setState(newState) {
        this.state = newState;
        // Вызываем всех слушателей
        for (const listener of this.listeners) listener();
    }

    /**
     * Добавление новой записи
     */
    addItem() {
        const newCode = this.generateUniqueCode();
        const newItem = {
            code: newCode,
            title: 'Новая запись',
            clicked: 0
        }

        this.setState({
            ...this.state,
            list: [...this.state.list, newItem]
        })
    };

    /**
     * Удаление записи по коду
     * @param code
     */
    deleteItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.filter(item => item.code !== code)
        })
    };

    /**
     * Выделение записи по коду
     * @param code
     */
    selectItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.map(item => {
                if (item.code === code) {
                    item.selected = !item.selected;
                    if (item.selected === true) {
                        item.clicked++
                    }
                } else {
                    item.selected = false;
                }

                return item;
            })
        })
    }

    generateUniqueCode() {
        return ++this.maxCode;
    }

}

export default Store;
