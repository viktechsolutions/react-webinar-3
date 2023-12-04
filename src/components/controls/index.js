import React, {useCallback, useState} from "react";

import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";
import Modal from "../modal";
import Head from "../head";
import Cart from "../cart";

function Controls(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {cart, uniqueItemsCount, store} = props
  const sumCart = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const uniqueItems = uniqueItemsCount

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const callbacks = {
    onDeleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, [store]),
  }

  return (
    <div className='Controls'>
      {props.context === 'list' && ( <div className='Controls-count'>
       В корзине:
        <b> {uniqueItems ? ` ${uniqueItems} ${plural(uniqueItems, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })}` : ''}
          {uniqueItems ? ` / ${sumCart.toLocaleString()} ₽ ` : 'пусто'}
        </b>
      </div>)}
      {props.context === 'cart' && (
        <div className='Controls-count-total'>
          <div>
            <b>{count ? `Итого`: ''}&nbsp;</b>
          </div>
          <div>
            <b>{count ? ` ${sumCart.toLocaleString()} ₽ ` : ''}</b>
          </div>
      </div>
      )}
      {props.context === 'list' && (
        <button className='Controls-button' onClick={openModal}>Перейти
        </button>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Head className="head" title="Корзина"/>
        <Cart cart={cart}  onDeleteFromCart={callbacks.onDeleteFromCart}  />
        <Controls cart={cart}  context="cart"/>
      </Modal>
    </div>
  )
}

Controls.propTypes = {
  onDeleteFromCart: PropTypes.func,
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  })).isRequired,
  context: PropTypes.oneOf(['list', 'cart'])
};

Controls.defaultProps = {
  onAddToCart: () => {
  },
  onDeleteFromCart: () => {
  },
  context: 'list'
}

export default React.memo(Controls);
