import React from 'react';

import './form.css';
const Form = (props) => {
  const { sendEmail } = props;
  return (
    <div className="order-form">
      <form className="ui form" onSubmit={sendEmail}>
        <h4 className="ui dividing header">פרטי המזמין</h4>
        <div className="field">
          <label>שם המזמין</label>
          <div className="field">
            <input
              type="text"
              placeholder="שם המזמין"
              required
              onInvalid={({ target }) =>
                target.setCustomValidity('אנא הכנס את פרטי העסק')
              }
              onInput={({ target }) => {
                target.setCustomValidity('');
              }}
            />
          </div>
          <div className="field">
            <input
              type="text"
              placeholder="אימייל"
              required
              onInvalid={({ target }) =>
                target.setCustomValidity('אנא הזן אימייל')
              }
              onInput={({ target }) => {
                target.setCustomValidity('');
              }}
            />
          </div>
        </div>
        <div className="field input">
          <textarea
            name="notes"
            cols="30"
            rows="10"
            placeholder="הערות"
          ></textarea>
        </div>
        {/* <div className="field">
          <label>עיר</label>
          <select className="ui fluid dropdown">
            <option value="">עיר</option>
            {cities().map((city) => (
              <option value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>כתובת</label>
          <div className="fields">
            <div className="twelve wide field">
              <input type="text" name="shipping[address]" placeholder="רחוב" />
            </div>
            <div className="four wide field">
              <input
                type="number"
                name="shipping[address-2]"
                placeholder="מספר"
              />
            </div>
          </div>
        </div> */}
        {/* <h4 className="ui dividing header">Email</h4>
        <div className="field">
          <label>אימייל לשליחת קבלה</label>
          <div className="ui fluid multiple search">
            <input type="email" name="email" placeholder="אימייל" />
          </div>
        </div> */}

        <button className="ui button">שלח הזמנה</button>
      </form>
    </div>
  );
};

export default Form;
