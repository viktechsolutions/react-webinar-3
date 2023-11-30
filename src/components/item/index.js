import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {

  const callbacks = {
      onAddToCart: (e) => {
      e.stopPropagation();
      props.onAddToCart(props.item.code)
    },
      onDeleteFromCart: (e) => {
      e.stopPropagation();
      props.onDeleteFromCart(props.item.code)
    }
  }

  return (
    <div className={'Item'}>
        <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        {props.item.price.toLocaleString()} ₽
      </div>

      <div className='Item-actions'>
          {props.context === 'list' && (
              <button onClick={callbacks.onAddToCart}>
                  Добавить
              </button>
          )}
          {props.context === 'cart' && (
              <button onClick={callbacks.onDeleteFromCart}>
                  Удалить
              </button>
          )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
    onAddToCart: PropTypes.func,
    onDeleteFromCart: PropTypes.func,
    context: PropTypes.oneOf(['list', 'cart'])
};

Item.defaultProps = {
    onAddToCart: () => {
  },
    onDeleteFromCart: () => {
    },
    context: 'list'
}

export default React.memo(Item);
