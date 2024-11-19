import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DeliveryPage.css';
import axios from 'axios';

const DeliveryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { customerDetails, cartItems } = location.state || { customerDetails: {}, cartItems: [] };

  // Flag to prevent duplicate orders
  const [orderPlaced, setOrderPlaced] = useState(false);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCompleteOrder = () => {
    if (orderPlaced) {
      return; // Prevent submitting if order is already placed
    }

    const selectedDeliveryOption = document.querySelector('input[name="delivery"]:checked')?.value;

    if (!selectedDeliveryOption) {
      alert("Please select a delivery option.");
      return;
    }

    // Set flag to prevent further submissions
    setOrderPlaced(true);

    const orderData = {
      customerDetails,
      cartItems: cartItems.map(item => ({
        name: item.name, // Ensure name is included
        quantity: item.quantity,
        price: item.price,
      })),
      deliveryOption: selectedDeliveryOption,
      totalPrice: (parseFloat(calculateSubtotal()) + (selectedDeliveryOption.includes('Standard') ? 5 : 7)).toFixed(2),
    };
    

    // Call backend to create the order
    axios.post('http://localhost:3000/api/orders', orderData)
      .then((response) => {
        console.log("Order submitted:", response.data);
        // After successful order submission, navigate to confirmation page
        navigate('/confirmation', {
          state: {
            customerDetails,
            cartItems,
            deliveryOption: selectedDeliveryOption,
            total: orderData.totalPrice,
          },
        });
      })
      .catch((error) => {
        setOrderPlaced(false);
        console.error("Error submitting order:", error); // Log error for debugging
        alert("An error occurred while placing your order. Please try again.");
      });
  };

  return (
    <div className="delivery-container">
      <h2>Checkout</h2>
      <div className="delivery-section">
        <h3>Delivery</h3>
        <div className="delivery-options">
          <label>
            <input type="radio" name="delivery" value="Standard Shipping" />
            Standard Shipping - $5.00
          </label>
          <label>
            <input type="radio" name="delivery" value="Express Shipping" />
            Express Shipping - $7.00
          </label>
        </div>
        <button onClick={handleCompleteOrder} disabled={orderPlaced}>Complete Order</button>
      </div>
      <div className="order-summary">
        <h3>Order Details</h3>
        {cartItems.length === 0 ? (
          <p>No items in your cart.</p>
        ) : (
          cartItems.map((item, index) => (
            <p key={index}>
              {item.title} - ${item.price.toFixed(2)} x {item.quantity}
            </p>
          ))
        )}
        <p>Subtotal: ${calculateSubtotal()}</p>
        <p>Taxes: $0.00</p>
        <h4>Total: ${calculateSubtotal()}</h4>
      </div>
      <div className="customer-details">
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> {customerDetails.firstName} {customerDetails.lastName}</p>
        <p><strong>Address:</strong> {customerDetails.address}, {customerDetails.city}, {customerDetails.state}, {customerDetails.postalCode}</p>
        <p><strong>Email:</strong> {customerDetails.email}</p>
        <p><strong>Phone:</strong> {customerDetails.phone}</p>
      </div>
    </div>
  );
};

export default DeliveryPage;
