import React, { useState, useEffect } from 'react';
import './navbar1.css';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [cartCount, setCartCount] = useState(0); // State for number of items in the cart

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Function to add an item to the cart
  const addToCart = () => {
    setCartCount(cartCount + 1); // Increment the cart count by 1
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 0) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header>
        <a href="/" className="logo">BOBARIA</a>

        <ul>
          <li><a href="/">Shop All</a></li>
          <li><a href="/">Make your own</a></li>
          <li><a href="/">Goodies</a></li>
          <li><a href="/">Bubbly Club</a></li>
        </ul>

        {/* Profile Button */}
        <button className="profile-btn" onClick={toggleModal}>
          <span className="material-symbols-outlined">account_circle</span>
        </button>

        
      </header>

      {/* Sign-In / Sign-Up Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <h2>Sign In / Sign Up</h2>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" required />
              </div>
              <button type="submit">Sign In</button>
              <button type="button" onClick={() => alert('Sign Up functionality not implemented')}>Sign Up</button>
            </form>
          </div>
        </div>
      )}

      {/* Example button to add items to cart */}
      <button onClick={addToCart}>Add Item to Cart</button>
    </>
  );
};

export default Navbar;
