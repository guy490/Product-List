import React from 'react';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import server from '../../server_connector';
import Form from '../../components/form';
import { editFromCart, deleteFromCart, clearCart } from '../../Redux/Actions';
import './Order.css';

const Order = (props) => {
  const { cartReducer, editFromCart, deleteFromCart, clearCart } = props;
  const alert = useAlert();
  let history = useHistory();

  if (cartReducer.length === 0) {
    history.push('/');
  }
  const renderCartList = () => {
    return cartReducer.map((item) => {
      const isFruits = item.category === 'פירות' || item.category === 'ירקות';
      return (
        <div key={item.id} className="seleted-item">
          <div className="item-name">{item.name}</div>
          <div className="item-amount">
            כמות:{' '}
            <input
              type="number"
              className="ui input amount-input order-input"
              placeholder={isFruits ? 'ק"ג' : 'כמות'}
              value={item.amount}
              onChange={({ target }) => {
                target.style.border = '';
                if (target.value >= 0) {
                  editFromCart(item.id, target.value);
                }
              }}
            />
          </div>

          <div className="item-delete">
            <i
              className="close icon delete-icon"
              onClick={() => deleteFromCart(item.id)}
            ></i>
          </div>
        </div>
      );
    });
  };
  const createHtmlCartList = () => {
    const itemStyle =
      'display: flex; text-align: right; direction: rtl;font-size: 100%;width: 100%;height: 40px;border-bottom: 1px solid black;';
    var createdHTML = '';
    cartReducer.forEach((item) => {
      const isFruits = item.category === 'פירות' || item.category === 'ירקות';
      createdHTML += `<div key=${item.id} style="${itemStyle}">
          <div style="width: 50%;border-left: 1px solid black;margin: auto;text-align: center;">${
            item.name
          }</div><div style="width: 50%;border-right: 1px solid black;margin: auto;text-align: center;">
            כמות: ${item.amount} ${isFruits ? 'ק"ג' : 'יחידות'}
          </div>
        </div>`;
    });
    return createdHTML;
  };
  const replaceRange = (s, substitute, start, end) => {
    return s.substring(0, start) + substitute + s.substring(end);
  };
  const randomNumber = () => {
    return Math.floor(Math.random() * 100) + 7;
  };
  const sendEmail = (e) => {
    e.preventDefault();
    const { target } = e;
    const isAllAmountsAboveZero =
      cartReducer.findIndex((item) => parseInt(item.amount) === 0) === -1;
    const timeStamp = replaceRange('' + Date.now(), '' + randomNumber(), 0, 6);
    if (!isAllAmountsAboveZero) {
      document.querySelector('.order-error').style.visibility = 'visible';
      document.querySelectorAll('.order-input').forEach((item) => {
        if (item.value.toString() === '0') {
          item.style.border = '2px solid red';
        }
      });
    } else {
      document.querySelector('.order-error').style.visibility = 'hidden';
      const orderName = target[0].value;
      const orderEmail = target[1].value;
      const orderNote = target[2].value;
      const tableStyle = 'width: 400px;border: 1px solid black;';
      const orderTable = `<div style="font-size: 15px;direction: rtl;"><div>שלום,<br />התקבלה הזמנה מאת ${orderName}, להלן הפירוט:</div><div style="${tableStyle}">
      ${createHtmlCartList()}<div style="margin: 0 5%;font-size: 100%;"><h4>הערות</h4><div>${orderNote}</div></div></div><div style="border: 1px solid black;margin-top: 20px;width: 400px;"><lable>מס' הזמנה: </lable>${timeStamp}</div><div style="margin-top: 10px">בברכת יום טוב</div></div>`;
      server
        .post('/send_email', { orderName, orderTable, orderEmail })
        .then(() => {
          alert.success(
            `נשלח ההזמנה בהצלחה!           מספר הזמנה: ${timeStamp}`
          );
          clearCart();
        });
    }
  };
  return (
    <div className="order-page">
      <button onClick={history.goBack}>
        <div className="ui button">
          חזור לדף הקודם
          <i className="angle left icon"></i>
        </div>
      </button>
      <h3>המוצרים שבחרת</h3>
      <div className="ui middle aligned divided list seleted-list">
        {renderCartList()}
      </div>
      <div className="order-error">שים לב, ישנם מוצרים שלא בחרת עבורם כמות</div>
      <Form sendEmail={sendEmail} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { cartReducer: state.cartReducer };
};

export default connect(mapStateToProps, {
  editFromCart,
  deleteFromCart,
  clearCart,
})(Order);
