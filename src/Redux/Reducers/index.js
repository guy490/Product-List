import { combineReducers } from 'redux';

const cartReducer = (state = [], action) => {
  let itemIndex;
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.payload];
    case 'DELETE_ITEM':
      itemIndex = state.findIndex((item) => item.id === action.payload);
      return [
        ...state.slice(0, itemIndex),
        ...state.slice(itemIndex + 1, state.length),
      ];
    case 'EDIT_ITEM':
      itemIndex = state.findIndex((item) => item.id === action.payload.itemID);
      let item = state[itemIndex];
      item.amount = action.payload.newAmount;
      return [
        ...state.slice(0, itemIndex),
        item,
        ...state.slice(itemIndex + 1, state.length),
      ];
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  cartReducer,
});
