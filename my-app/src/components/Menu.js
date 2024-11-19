import React, { useState, useEffect } from "react";
import "./Menu.css";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
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

const Menu = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Static menu items
  const staticMenuItems = [
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

  // Fetch new products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message); // Store error message
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchProducts();
  }, []);

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
    const item = [...staticMenuItems, ...products][index];
    const totalPrice = item.price * quantity;
  
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.name === item.title);  // Change _id to name if needed
    if (existingItemIndex > -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      updatedCartItems[existingItemIndex].totalPrice += totalPrice;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, {
        name: item.title,
        quantity,
        price: item.price,
        totalPrice,
        image: item.image // Ensure image is included in the cart item
      }]);
    }
  
    setShowCart(true);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.totalPrice, 0);
    return subtotal.toFixed(2);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    navigate("/checkout", { state: { cartItems } });
  };

  if (loading) {
    return <div>Loading Menu...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="menu-container">
      <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h6 style={{ margin: 0 }}>.</h6>
        <div className="cart-icon" onClick={toggleCart} style={{ position: "relative" }}>
          <img src={cartIcon} alt="Cart" style={{ width: "40px", cursor: "pointer" }} />
          {getCartItemCount() > 0 && <div className="cart-counter">{getCartItemCount()}</div>}
        </div>
      </div>

      <Cart
        cartItems={cartItems}
        showCart={showCart}
        toggleCart={toggleCart}
        getCartItemCount={getCartItemCount}
        getSubtotal={getSubtotal}
        handleCheckout={handleCheckout}
      />

      <p>OUR MENU</p>
      <div className="menu-grid">
  {[...staticMenuItems, ...products].map((item, index) => (
    <div key={index} className="menu-item">
      <img src={item.image} alt={item.name || item.title} className="menu-image" />
      <span className="menu-type">{item.type || "Boba Drink"}</span>
      <h3 className="menu-title">{item.name || item.title}</h3> {/* Use name or title */}
      <div className="item-price">${item.price.toFixed(2)}</div>
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
