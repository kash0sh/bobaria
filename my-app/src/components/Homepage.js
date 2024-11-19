import { useState } from "react";
import Marquee from "react-fast-marquee";
import mainpage3 from "./images/mainpage3.jpg";
import boba1 from "./images/boba1.png";
import boba2 from "./images/boba2.png";
import boba3 from "./images/boba3.png";
import boba4 from "./images/boba4.png";
import boba5 from "./images/boba5.png";
import boba6 from "./images/boba6.png";
import custom1 from "./images/custom1.png";
import "../App.css"

function Homepage() {
    const [currentIndex, setCurrentIndex] = useState(0); // Initialize useState
  
    const products = [
      {
        id: 1,
        name: "Rasberry Bliss",
        price: "from ₹299",
        image: boba1,
        label: "Berry",
      },
      {
        id: 2,
        name: "Rose Velvet Charm",
        price: "from ₹279",
        image: boba2,
        label: "Exotic",
      },
      {
        id: 3,
        name: "Tropical Sunset",
        price: "from ₹350",
        image: boba3,
        label: "Fruit",
      },
      {
        id: 1,
        name: "Mocha Pearl Dream",
        price: "from ₹399",
        image: boba4,
        label: "Coffee",
      },
      {
        id: 3,
        name: "Berry Swirl Delight",
        price: "from ₹350",
        image: boba5,
        label: "Berry",
      },
      {
        id: 1,
        name: "Mocha Cocoa Bliss",
        price: "from ₹299",
        image: boba6,
        label: "Coffee",
      },
    ];
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + products.length) % products.length
      );
    };
  
    return (
      <div className="App">
  
        <div className="video-container">
          <img
            autoPlay
            playsInline
            muted
            loop
            className="video"
            height="2160"
            width="3840"
            poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            style={{ aspectRatio: "16 / 9" }}
            src = {mainpage3}
            alt="video"
          ></img>
  
          {/* Overlay Text and Button */}
          <div className="video-overlay">
            <h1 className="overlay-heading">
                Create your perfect <br/>
                Boba drink today
            </h1>
            <a href="/customize" className="overlay-button">
              Create now
            </a>
          </div>
        </div>
  
        <div className="freshly-baked-container">
          <h3 className="freshly-baked-heading">Freshly Brewed</h3>
          <div className="navigation-arrows">
            <button
              className="arrow-button"
              onClick={prevSlide}
              disabled={currentIndex === 0}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              className="arrow-button"
              onClick={nextSlide}
              disabled={currentIndex === products.length - 1}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
  
        <div className="carousel-container">
          {products.map((product, index) => (
            <div
              className={`product-card ${
                index === currentIndex ? "active" : "inactive"
              }`}
              style={{ transform:` translateX(-${currentIndex * 100}%)` }}
              key={product.id}
            >
              <div className="product-card-image-container">
                <img
                  alt={product.name}
                  width="450"
                  height="450"
                  decoding="async"
                  className="product-card-image"
                  srcSet={product.image}
                  src={product.image}
                />
                <div className="product-card-label">{product.label}</div>
              </div>
              <div className="product-card-info">
                <div className="product-card-title">{product.name}</div>
                <div className="product-card-price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
  
        <div className="where-to-buy-container">
          <a className="where-to-buy-button" href="/menu">
            Where to Buy
          </a>
        </div>
  
        <section className="centered-text-section">
          <div className="centered-text-box">
            <div className="centered-text-content">
              Welcome to Bobaria, where premium bubble tea meets personalized
              innovation. Explore timeless classics or create your own unique
              drink, crafted to perfection in every sip.
            </div>
          </div>
        </section>
  
        <div className="marquee-wrapper">
          <Marquee
            autoFill="true"
            pauseOnHover="true"
            speed="100"
            className="marquee-container"
          >
            <span className="marquee-text">I ❤️ BOBA</span>
            <span className="marquee-text">I ❤️ BOBA</span>
            <span className="marquee-text">I ❤️ BOBA</span>
          </Marquee>
        </div>
  
        <div className="shop-heading-container">
          <h3 className="shop-heading">Shop our Classics</h3>
        </div>
  
        <div class="container">
          <div class="scrollable-container">
            <div class="item">
              <a
                class="item-link"
                href="/menu"
              >
                <img class="item-image" src={boba6} alt="Signature cookies" />
                <div class="text-overlay">
                  <div class="text-wrapper">
                    <svg class="text-background" fill="none" viewBox="0 0 305 80">
                      <path
                        class="path"
                        d="M303.454 39.8975C303.454 44.995 299.503 50.0477 291.856 54.7901C284.25 59.5072 273.193 63.7827 259.464 67.3839C232.017 74.5834 194.059 79.045 152.102 79.045C110.145 79.045 72.1868 74.5834 44.74 67.3839C31.011 63.7827 19.9546 59.5072 12.3482 54.7901C4.70131 50.0477 0.75 44.995 0.75 39.8975C0.75 34.8001 4.70131 29.7473 12.3482 25.005C19.9546 20.2878 31.011 16.0124 44.74 12.4112C72.1868 5.21167 110.145 0.75 152.102 0.75C194.059 0.75 232.017 5.21167 259.464 12.4112C273.193 16.0124 284.25 20.2878 291.856 25.005C299.503 29.7473 303.454 34.8001 303.454 39.8975Z"
                      ></path>
                    </svg>
                    <div class="text">Coffee</div>
                  </div>
                </div>
              </a>
  
              <a
                class="item-link"
                href="/menu"
              >
                <img class="item-image" src={boba2} alt="Signature cookies" />
                <div class="text-overlay">
                  <div class="text-wrapper">
                    <svg class="text-background" fill="none" viewBox="0 0 305 80">
                      <path
                        class="path"
                        d="M303.454 39.8975C303.454 44.995 299.503 50.0477 291.856 54.7901C284.25 59.5072 273.193 63.7827 259.464 67.3839C232.017 74.5834 194.059 79.045 152.102 79.045C110.145 79.045 72.1868 74.5834 44.74 67.3839C31.011 63.7827 19.9546 59.5072 12.3482 54.7901C4.70131 50.0477 0.75 44.995 0.75 39.8975C0.75 34.8001 4.70131 29.7473 12.3482 25.005C19.9546 20.2878 31.011 16.0124 44.74 12.4112C72.1868 5.21167 110.145 0.75 152.102 0.75C194.059 0.75 232.017 5.21167 259.464 12.4112C273.193 16.0124 284.25 20.2878 291.856 25.005C299.503 29.7473 303.454 34.8001 303.454 39.8975Z"
                      ></path>
                    </svg>
                    <div class="text">Strawberry</div>
                  </div>
                </div>
              </a>
  
              <a
                class="item-link"
                href="/menu"
              >
                <img class="item-image" src={boba3} alt="Signature cookies" />
                <div class="text-overlay">
                  <div class="text-wrapper">
                    <svg class="text-background" fill="none" viewBox="0 0 305 80">
                      <path
                        class="path"
                        d="M303.454 39.8975C303.454 44.995 299.503 50.0477 291.856 54.7901C284.25 59.5072 273.193 63.7827 259.464 67.3839C232.017 74.5834 194.059 79.045 152.102 79.045C110.145 79.045 72.1868 74.5834 44.74 67.3839C31.011 63.7827 19.9546 59.5072 12.3482 54.7901C4.70131 50.0477 0.75 44.995 0.75 39.8975C0.75 34.8001 4.70131 29.7473 12.3482 25.005C19.9546 20.2878 31.011 16.0124 44.74 12.4112C72.1868 5.21167 110.145 0.75 152.102 0.75C194.059 0.75 232.017 5.21167 259.464 12.4112C273.193 16.0124 284.25 20.2878 291.856 25.005C299.503 29.7473 303.454 34.8001 303.454 39.8975Z"
                      ></path>
                    </svg>
                    <div class="text">Mango</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
  
        <section
          data-section="section.mediaText"
          id="body__7addfb4ffff1"
          className="how-to-section mx-auto flex w-full max-w-screen-lg flex-col items-stretch justify-center gap-2 px-4 py-8 lg:px-8 lg:py-16 lg:flex-row"
        >
          <section className="how-to-centered-text-section">
            <div className="how-to-centered-text-box">
              <div className="how-to-text">HOW-TO</div>
              <div className="how-to-container">
              Visit our customization page to design your custom order, and we'll transform it into a perfectly crafted boba drink just for you
              </div>
            </div>
          </section>
          <div className="image-container aspect-square rounded-lg lg:w-1/2">
            <img
              alt="how-to-process"
              decoding="async"
              loading="lazy"
              className="aspect-square object-cover rounded-lg w-full h-full"
              src={custom1} // replace with the path to your image
            />
          </div>
        </section>
  
        <footer className="footer">
          <div className="textoffooter">
            <p>Made by Kashish, Riha and Khushee</p>
            <p>Webtech Project</p>
            <h1>BOBARIA</h1>
            <p>
              Open Monday to Friday: 12 PM - 10 PM, Saturday to Sunday: 10 AM - 6
              PM
            </p>
          </div>
        </footer>
      </div>
    );
  }
  
  export default Homepage;