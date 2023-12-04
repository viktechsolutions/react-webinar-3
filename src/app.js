import React, {useCallback, useState} from 'react';

import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;
  const uniqueItemsCount = store.getState().uniqueItemsCount;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }


  const callbacks = {
    onAddToCart: useCallback((code) => {
        store.addToCart(code);
    }, [store]),

    onDeleteFromCart: useCallback((code) => {
        store.deleteFromCart(code);
    }, [store]),
  }


  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls cart={cart}
                store={store}
                uniqueItemsCount={uniqueItemsCount}
                openModal={openModal}/>
      <List list={list}
            onAddToCart={callbacks.onAddToCart}/>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Head className="head" title="Корзина"/>
        <Cart cart={cart} onDeleteFromCart={callbacks.onDeleteFromCart}/>
        <Controls cart={cart} context="cart"/>
      </Modal>
    </PageLayout>
  );
}

export default App;
