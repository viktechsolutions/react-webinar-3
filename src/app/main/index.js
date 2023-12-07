import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";

function Main() {

  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1); // Добавлено состояние для текущей страницы
  // const [totalItems, setTotalItems] = useState(0); // Добавлено состояние для общего количества товаров

  // Функция для загрузки данных с учетом текущей страницы
  const loadItems = useCallback((page) => {
    store.actions.catalog.load(page); // Здесь нужно убедиться, что метод load может принимать страницу как параметр
    // Вам также может потребоваться обновить состояние totalItems, если ваш API предоставляет эту информацию
  }, [store]);

  useEffect(() => {
    loadItems(currentPage);
  }, [currentPage, loadItems]);

  // useEffect(() => {
  //   store.actions.catalog.load();
  // }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalItems: state.catalog.totalCount,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination
        totalCount={select.totalItems}
        currentPage={currentPage}
        onChangePage={setCurrentPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
