import React, {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import Product from "../../components/product";
import {Route, Routes, useLocation, useParams} from "react-router";

function Main() {
  const { id } = useParams();
  const location = useLocation();
  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);

  // Функция для загрузки данных с учетом текущей страницы
  const loadItems = useCallback((page) => {
    store.actions.catalog.load(page);
  }, [store]);

  useEffect(() => {
    // Загрузка товаров для главной страницы
    if (location.pathname === '/') {
      loadItems(currentPage);
    }
  }, [currentPage, loadItems, location]);

  useEffect(() => {
    // Загрузка данных для конкретного продукта
    if (id) {
      store.actions.catalog.loadOne(id);
    }
  }, [id, store]);


  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalItems: state.catalog.totalCount,
    item: state.catalog.item
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
      <Routes>
        <Route exact path="/" element={
          <>
            <List list={select.list} renderItem={renders.item}/>
            <Pagination
              totalCount={select.totalItems}
              currentPage={currentPage}
              onChangePage={setCurrentPage}
            />
          </>
        } />
        <Route path="/product/:id" element={<Product />} />
      </Routes>

    </PageLayout>
  );
}

export default memo(Main);
