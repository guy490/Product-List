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
  const sendEmail = (e) => {
    e.preventDefault();
    const { target } = e;
    const isAllAmountsAboveZero =
      cartReducer.findIndex((item) => parseInt(item.amount) === 0) === -1;
    console.log(cartReducer);
    console.log(isAllAmountsAboveZero);
    console.log(cartReducer.findIndex((item) => item.amount === 0));
    console.log(isAllAmountsAboveZero);
    if (!isAllAmountsAboveZero) {
      alert.show('שים לב כי יש לך מוצרים עם כמות 0');
    } else {
      const orderName = target[0].value;
      const orderNote = target[1].value;
      const tableStyle = 'width: 30%;border: 1px solid black;';
      const orderTable = `<div style="font-size: 15px"><div>שלום,<br />התקבלה הזמנה מאת ${orderName}, להלן הפירוט:</div><div style="${tableStyle}">
      ${createHtmlCartList()}<div style="margin: 0 5%;font-size: 100%;"><h4>הערות</h4><div>${orderNote}</div></div></div><div>בברכת יום טוב</div></div>`;
      server.post('/send_email', { orderName, orderTable }).then(() => {
        window.alert('נשלח ההזמנה בהצלחה! יצרו איתך קשר בהקדם');
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
