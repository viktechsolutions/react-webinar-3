import React from "react";

import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls(props) {
  const {openModal, cart, uniqueItemsCount} = props
  const sumCart = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const uniqueItems = uniqueItemsCount;

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
    </div>
  )
}

Controls.propTypes = {
  onDeleteFromCart: PropTypes.func,
  openModal: PropTypes.func,
  uniqueItemsCount: PropTypes.number,
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  })).isRequired,
  context: PropTypes.oneOf(['list', 'cart'])
};

Controls.defaultProps = {
  onDeleteFromCart: () => {
  },
  context: 'list'
}

export default React.memo(Controls);
