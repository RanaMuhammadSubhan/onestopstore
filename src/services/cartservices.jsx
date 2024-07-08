import useCartStore from "../Store/cartStore";

export const addItemToCart = (item) => {
  useCartStore.getState().addItem(item);
};

export const removeItemFromCart = (id) => {
  useCartStore.getState().removeItem(id);
};

export const updateCartItemQuantity = (id, quantity) => {
  useCartStore.getState().updateItemQuantity(id, quantity);
};
