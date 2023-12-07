import React, {useCallback, useEffect} from "react";
import {useParams} from "react-router";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../page-layout";
import Head from "../head";
import BasketTool from "../basket-tool";
import './style.css';
import {numberFormat} from "../../utils";
import Basket from "../../app/basket";

function Product() {
  const activeModal = useSelector(state => state.modals.name);
  const { id } = useParams();
  const store = useStore();

  const select = useSelector(state => ({
    item: state.catalog,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(() => {
      store.actions.basket.addToBasket(id);
    }, [id, store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  useEffect(() => {
    store.actions.catalog.loadOne(id);
  }, [id, store]);

  return (
    <PageLayout>
      <div className="Product">
        {store.state.catalog.item ? (
          <>
            <div>
              <Head title={store.state.catalog.item.title}></Head>
              <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                          sum={select.sum}  />
              <div className="Product-boxInfo">
                <p>{store.state.catalog.item.description}</p>
                <p>Страна производитель: <b>{store.state.catalog.item.madeIn.title}</b></p>
                <p> Категория: <b>{store.state.catalog.item.category.title}</b></p>
                <p>Год выпуска: <b>{store.state.catalog.item.edition}</b></p>
                <p className="price"><b> Цена: {numberFormat(store.state.catalog.item.price) } ₽</b></p>
                <button onClick={callbacks.addToBasket}>Добавить</button>
              </div>
            </div>
          </>
        ) : (
          <div>Загрузка информации о товаре...</div>
        )}
      </div>
      {activeModal === 'basket' && <Basket/>}
    </PageLayout>
  );
}

export default Product;