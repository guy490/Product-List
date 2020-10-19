export const addToCart = (item) => {
  return {
    type: 'ADD_ITEM',
    payload: item,
  };
};
export const deleteFromCart = (itemID) => {
  return {
    type: 'DELETE_ITEM',
    payload: itemID,
  };
};

export const editFromCart = (itemID, newAmount) => {
  return {
    type: 'EDIT_ITEM',
    payload: { itemID, newAmount },
  };
};

export const clearCart = () => {
  return {
    type: 'CLEAR_CART',
  };
};
