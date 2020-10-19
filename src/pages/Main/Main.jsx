import React, { Component } from 'react';
import inventory, { categories } from '../../inventory';
import { connect } from 'react-redux';
import { addToCart, deleteFromCart } from '../../Redux/Actions';
import OrderButton from '../../components/OrderButton';
import Button from '../../components/button';

import Item from '../../components/item';

import './Main.css';

class App extends Component {
  state = {
    currentCat: [],
  };
  getCategories() {
    return categories.map((cat) => (
      <span key={cat}>
        <Button
          value={cat}
          classes={this.buttonClasses(cat)}
          onClick={(c) => this.changeCategory(c)}
        />
      </span>
    ));
  }

  getInventory() {
    const { currentCat } = this.state;

    return inventory
      .filter((item) => {
        let selected = false;
        if (currentCat.length === 0) {
          selected = true;
        } else {
          currentCat.forEach((cat) => {
            if (cat === item.category) {
              selected = true;
            } else {
              selected = false;
            }
          });
        }
        return selected;
      })
      .map(({ id, name, price, description, category }) => (
        <Item
          key={id}
          id={id}
          name={name}
          price={price}
          desc={description}
          category={category}
          addToCart={(amount) =>
            this.props.addToCart({
              id,
              name,
              price,
              description,
              category,
              amount,
            })
          }
          deleteFromCart={() => this.props.deleteFromCart(id)}
        />
      ));
  }

  buttonClasses(cat) {
    let active = false;
    const { currentCat } = this.state;

    currentCat.forEach((c) => {
      if (c === cat) {
        active = true;
      } else {
        active = false;
      }
    });

    return active ? 'button active' : 'button';
  }

  allButtonClasses() {
    const { currentCat } = this.state;
    return currentCat.length === 0 ? 'button active' : 'button';
  }
  changeCategory(cat) {
    let { currentCat } = this.state;
    let found = false;

    if (cat !== 'All') {
      for (let i = 0; i < currentCat.length; i += 1) {
        if (currentCat[i] === cat) {
          found = true;
          currentCat.splice(i, 1);
        } else {
          found = false;
          currentCat = [];
        }
      }

      if (!found) {
        currentCat.push(cat);
      }
    } else {
      currentCat = [];
    }

    this.setState({
      currentCat,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>בחר את המוצרים</h1>

        <div className="categories">
          <span key="All">
            <Button
              value="All"
              classes={this.allButtonClasses()}
              onClick={(c) => this.changeCategory(c)}
            />
          </span>
          {this.getCategories()}
        </div>

        <div className="inventory">{this.getInventory()}</div>

        <div className="buttons">
          <span>
            סה"כ מוצרים:{' '}
            <span className="product-amount">
              {this.props.cartReducer.length}
            </span>
          </span>
          <OrderButton
            className="ui blue button"
            condition={this.props.cartReducer.length !== 0}
            errorMessage={'לא בחרת מוצרים להזמנה'}
          >
            הזמן
          </OrderButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { cartReducer: state.cartReducer };
};

export default connect(mapStateToProps, { addToCart, deleteFromCart })(App);
