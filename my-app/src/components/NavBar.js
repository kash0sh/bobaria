import React, { useEffect } from 'react';
import './navbar.css';

const Navbar = () => {
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
    <header>
      <a href="/" className="logo">BOBARIA</a>

      <ul>
        <li><a href="/menu">Menu</a></li>
        <li><a href="/customize">Customization</a></li>
      </ul>





    </header>


  );
};

export default Navbar;
