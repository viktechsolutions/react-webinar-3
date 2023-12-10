import React, {useCallback, useEffect} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../page-layout";
import Head from "../head";
import BasketTool from "../basket-tool";
import './style.css';
import Basket from "../../app/basket";
import {useParams} from "react-router";
import ProductItem from "../product-item";

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
              <Head title={store.state.catalog.item.title}/>
              <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                          sum={select.sum}/>
              <ProductItem item={store.state.catalog.item} addToBasket={callbacks.addToBasket}/>
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