import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Price from './price';

import './item.css';

function Item(props) {
  const {
    id,
    name,
    price,
    desc,
    category,
    addToCart,
    deleteFromCart,
    cartReducer,
  } = props;
  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState(false);

  const isFruits = category === 'פירות' || category === 'ירקות';

  useEffect(() => {
    const isSelected = cartReducer.findIndex((item) => item.id === id) !== -1;
    setSelected(isSelected);
  }, [cartReducer]);
  return (
    <div className="item">
      {selected ? (
        <div className="selected-item">
          <div className="delete-button">
            <button
              className={`ui red button`}
              onClick={() => {
                deleteFromCart();
                setSelected(!selected);
              }}
            >
              הסר מהסל
            </button>
          </div>
          <div className="selected">נבחר</div>
        </div>
      ) : null}
      <div className={`item-content ${selected ? 'faded' : null}`}>
        <h3>{name}</h3>
        {!isFruits ? (
          <div>
            מחיר ליחידה:
            <Price value={price} />
          </div>
        ) : null}

        <p className="desc">{desc}</p>
        <div className="amount">
          <span className="amount-header">כמות: </span>
          <input
            type="number"
            className="ui input amount-input"
            placeholder={isFruits ? 'ק"ג' : 'כמות'}
            value={amount}
            onChange={({ target }) => {
              if (target.value >= 0) {
                setAmount(target.value);
              }
            }}
          />
        </div>

        <button
          className={`ui green button`}
          onClick={() => {
            addToCart(amount);
            setSelected(!selected);
          }}
        >
          הוסף לסל
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  cartReducer: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return { cartReducer: state.cartReducer };
};

export default connect(mapStateToProps)(Item);
