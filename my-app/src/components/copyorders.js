import React, { useState } from 'react';
import './Menu.css';

// Import images
import coffeeImage from './images2/Coffee-Bubble-Milk.jpeg';
import mangoImage from './images2/Mango.jpg';
import taroImage from './images2/Taro-bubble-milk.jpeg';
import matchaImage from './images2/Matcha-Bubble-Milk.jpeg';
import strawberryImage from './images2/Fresh-Fruit-Infused-Tea-Strawberry.jpeg';
import blackTeaImage from './images2/Black-Tea-Bubble-Milk.jpeg';
import pineappleImage from './images2/Pineapple-fresh-fruit-infused-tea.jpeg';
import specialsImage from './images2/Specials-fruit-mixed-tea.jpeg';
import customizeImage from './images2/customize-button.png';
import cartIcon from './images/cart-icon.jpg';

const menuItems = [
  { title: 'You can make your own drink now!!', image: customizeImage, price: 5.99 },
  { title: 'Coffee', type: 'Bubble Milk', image: coffeeImage, price: 4.99 },
  { title: 'Mango', type: 'Fresh Fruit Infused Tea', image: mangoImage, price: 3.99 },
  { title: 'Taro', type: 'Bubble Milk', image: taroImage, price: 4.49 },
  { title: 'Matcha', type: 'Bubble Milk', image: matchaImage, price: 4.99 },
  { title: 'Strawberry', type: 'Fresh Fruit Infused Tea', image: strawberryImage, price: 3.99 },
  { title: 'Black Tea', type: 'Bubble Milk', image: blackTeaImage, price: 4.49 },
  { title: 'Pineapple', type: 'Fresh Fruit Infused Tea', image: pineappleImage, price: 3.99 },
  { title: 'Specials', type: 'Fruit Mixed Tea', image: specialsImage, price: 5.49 },
];

const Menu = () => {
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleIncrement = (index) => {
    setQuantities({ ...quantities, [index]: (quantities[index] || 1) + 1 });
  };

  const handleDecrement = (index) => {
    if (quantities[index] > 1) {
      setQuantities({ ...quantities, [index]: quantities[index] - 1 });
    }
  };

  const addToCart = (index) => {
    const quantity = quantities[index] || 1;
    const item = menuItems[index];
    const totalPrice = item.price * quantity;

    // Ensure totalPrice is a valid number
    if (isNaN(totalPrice)) {
      console.error(`Invalid totalPrice for item: ${item.title}`);
      return; // Return early if totalPrice is invalid
    }

    // Add the item to the cart and update quantities if it already exists in the cart
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.title === item.title);
    if (existingItemIndex > -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      updatedCartItems[existingItemIndex].totalPrice += totalPrice;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity, totalPrice }]);
    }

    // Show the cart popup immediately after adding the item
    setShowCart(true);

    alert(`Added ${quantity} x ${item.title} to cart!`);
  };

  // Calculate total quantity in the cart
  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate the subtotal (sum of all item totals)
  const getSubtotal = () => {
    // Ensure all cart item totalPrices are numbers before performing the sum
    const subtotal = cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0);
    return subtotal.toFixed(2);
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
    // Implement checkout logic here, e.g., redirect to a checkout page
  };

  return (
    <div className="menu-container">
      {/* Header with cart icon */}
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h6 style={{ margin: 0 }}>.</h6>
        <div className="cart-icon" onClick={toggleCart} style={{ position: 'relative' }}>
          <img src={cartIcon} alt="Cart" style={{ width: '40px', cursor: 'pointer' }} />
          {/* Only show the cart counter if there are items in the cart */}
          {getCartItemCount() > 0 && (
            <div className="cart-counter">{getCartItemCount()}</div>
          )}
        </div>
      </div>

      {/* Cart modal or popup */}
      {showCart && (
        <div className={`cart-popup ${showCart ? 'show' : ''}`}>
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
          
          {/* Display Subtotal */}
          <div className="cart-subtotal">
            <span>Subtotal: </span><span>${getSubtotal()}</span>
          </div>

          {/* Checkout Button */}
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>

          {/* Close button */}
          <button className="close-button" onClick={toggleCart}>Close</button>
        </div>
      )}

      {/* Menu Items */}
      <p>OUR MENU</p>
      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <img src={item.image} alt={item.title} className="menu-image" />
            <span className="menu-type">{item.type}</span>
            <h3 className="menu-title">{item.title}</h3>
            <div className="item-price">${item.price}</div> {/* Display the price */}
            {item.title === 'You can make your own drink now!!' ? (
              <button
                className="customize-drink-button"
                onClick={() => (window.location.href = '/customize')}
              >
                Customize Your Drink →
              </button>
            ) : (
              <div className="menu-actions">
                <div className="quantity-container">
                  <button className="quantity-button" onClick={() => handleDecrement(index)}>
                    -
                  </button>
                  <span className="quantity-value">{quantities[index] || 1}</span>
                  <button className="quantity-button" onClick={() => handleIncrement(index)}>
                    +
                  </button>
                </div>
                <button className="add-to-cart-button" onClick={() => addToCart(index)}>
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
