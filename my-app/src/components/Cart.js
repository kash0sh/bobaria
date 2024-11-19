// Cart.js
import React from "react";
import "./Menu.css";

const Cart = ({ cartItems, showCart, toggleCart, getCartItemCount, getSubtotal, handleCheckout }) => {
  return (
    <>
      {showCart && (
        <div className={`cart-popup ${showCart ? "show" : ""}`}>
          <h2>Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>No items in the cart yet!</p>
          ) : (
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div>
                    <span>{item.title}</span>
                    <span className="quantity">x{item.quantity}</span>
                    <span className="item-total-price">${item.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="cart-subtotal">
            <span>Subtotal: </span><span>${getSubtotal()}</span>
          </div>

          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          <button className="close-button" onClick={toggleCart}>
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
