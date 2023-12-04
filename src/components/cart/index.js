import React from "react";

import PropTypes from 'prop-types';
import './style.css';
import Item from "../item";

function Cart({cart, onDeleteFromCart}) {
  return (
    <div className='Cart'>
      {
        cart.length ?
          cart.map(item =>
            <div key={item.code} className='Cart-item'>
              <Item item={item}
                    onDeleteFromCart={onDeleteFromCart}
                    context="cart"
              />
            </div>): <div className='Cart-empty'>Корзина пуста</div>
      }
    </div>
  )
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
  })).isRequired,
  onDeleteFromCart: PropTypes.func,
};

Cart.defaultProps = {
  onDeleteFromCart: () => {
  }
}

export default React.memo(Cart);
