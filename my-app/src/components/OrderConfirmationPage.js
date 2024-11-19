import React from 'react';
import { useLocation } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { customerDetails, cartItems, deliveryOption, total } = location.state || {};

  return (
    <div className="confirmation-container">
      <h2>Thank you! Your order was placed successfully</h2>
      <p>We have sent the order confirmation details to your email: <strong>{customerDetails?.email}</strong>.</p>
      
      <h3>Summary</h3>
      {cartItems?.length > 0 ? (
        cartItems.map((item, index) => (
          <p key={index}>
            {item.title} - ${item.price.toFixed(2)} x {item.quantity}
          </p>
        ))
      ) : (
        <p>No items in your order.</p>
      )}
      
      <p><strong>Delivery Option:</strong> {deliveryOption}</p>
      <p><strong>Shipping Address:</strong> {customerDetails?.address}, {customerDetails?.city}, {customerDetails?.state}, {customerDetails?.postalCode}</p>
      <h4>Total: ${total}</h4>
    </div>
  );
};

export default OrderConfirmationPage;
