import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || []; // Retrieve cart items

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    state: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleContinue = () => {
    if (!form.firstName || !form.lastName || !form.address) {
      alert("Please fill in all required fields.");
      return;
    }
    
    navigate('/delivery', {
      state: {
        customerDetails: form,
        cartItems,
      },
    });
  };
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };


  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2>Checkout</h2>
        <div className="form-section">
          <input
            type="text"
            name="firstName"
            placeholder="First name*"
            value={form.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name*"
            value={form.lastName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address*"
            value={form.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal code*"
            value={form.postalCode}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City*"
            value={form.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State/Province*"
            value={form.state}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={form.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleContinue}>Continue to delivery</button>
      </div>
      <div className="order-summary">
        <h3>Order details</h3>
        {cartItems.length === 0 ? (
          <p>No items in your cart.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.title} - ${item.price.toFixed(2)} x {item.quantity}</p>
            </div>
          ))
        )}
        <p>Subtotal: ${calculateSubtotal()}</p>
        <p>Taxes: $0.00</p>
        <p>Shipping: $0.00</p>
        <h4>Total: ${calculateSubtotal()}</h4>
      </div>
    </div>
  );
};

export default CheckoutPage;
