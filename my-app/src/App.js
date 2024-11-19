import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./components/Homepage";  // Import the new HomePage component
import CheckoutPage from "./components/CheckoutPage";
import TheForm from "./components/TheForm.js"
import Menu from "./components/Menu";
import DeliveryPage from './components/DeliveryPage.js';
import OrderConfirmationPage from './components/OrderConfirmationPage.js';
import Cart from './components/Cart.js'
import AdminOrdersPage from "./AdminOrderspage.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* HomePage will be the default route */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/customize" element={<TheForm  />} />
          <Route path="/menu" element={<Menu />} /> 
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/confirmation" element={<OrderConfirmationPage />} /> 
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminOrdersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
