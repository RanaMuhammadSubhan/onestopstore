import React from "react";
import useCartStore from "../cartStore";
import { Link } from "react-router-dom";
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "../services/cartservices";

const Cart = () => {
  const { cart } = useCartStore();

  const handleRemove = (id) => {
    removeItemFromCart(id);
  };

  const handleQuantityChange = (id, quantity) => {
    updateCartItemQuantity(id, quantity);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-56 h-52 mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => handleRemove(item.id)} className="ml-4">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Link to="/checkout">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
