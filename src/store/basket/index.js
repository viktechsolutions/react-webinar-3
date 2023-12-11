import StoreModule from "../module";

class Basket extends StoreModule {

  initState() {
    const savedState = localStorage.getItem('basketState');

    if (savedState) {
      return JSON.parse(savedState);
    }

    return {
      list: [],
      sum: 0,
      amount: 0
    };
  }

  saveState() {
    localStorage.setItem('basketState', JSON.stringify(this.getState()));
  }

  addToBasket(_id) {
    let sum = 0;
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true;
        result = {...item, amount: item.amount + 1};
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      const item = this.store.getState().catalog.list.find(item => item._id === _id);
      if (item) {
        list.push({...item, amount: 1});
        sum += item.price;
      }
    }

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Добавление в корзину');

    this.saveState();
  }

  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Удаление из корзины');

    this.saveState();
  }
}

export default Basket;
