import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
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
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  addToCart(code) {
    const itemToAdd = this.state.list.find(item => item.code === code);

    if (itemToAdd) {
      const existingItemIndex = this.state.cart.findIndex(item => item.code === code);
      let updatedCart = [...this.state.cart];

      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
      } else {
        updatedCart = updatedCart.concat({ ...itemToAdd, quantity: 1 });
      }

      this.setState({
        ...this.state,
        cart: updatedCart,
        uniqueItemsCount: new Set(updatedCart.map(item => item.code)).size,
      });
    }
  }

  sumCart() {
    return this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  count() {
    return this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  deleteFromCart(code) {
    const updatedCart = this.state.cart.filter(item => item.code !== code);
    this.setState({
      ...this.state,
      cart: updatedCart,
      uniqueItemsCount: new Set(updatedCart.map(item => item.code)).size,
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
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
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }
}

export default Store;
