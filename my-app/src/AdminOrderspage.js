import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminOrdersPage.css";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Update order status
      const response = await axios.put(`http://localhost:3000/api/orders/${orderId}`, { status: newStatus });
      
      // If the status is updated to "Shipped", delete the order from the database
      if (newStatus === "Shipped") {
        await axios.delete(`http://localhost:3000/api/orders/${orderId}`);
        // Remove the order from the state as it's deleted from the database
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      } else {
        // Update the order status in the state if it's not "Shipped"
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: response.data.status } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post("http://localhost:3000/api/products", newProduct);
      alert("Product added successfully");
      console.log(response.data); // Log the response to check if the product is being returned
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="admin-orders-container">
      <h2>Admin: Manage Orders</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{`${order.customerDetails.firstName} ${order.customerDetails.lastName}`}</td>
                <td>
                  {order.cartItems.map((item) => (
                    <div key={item._id}>{`${item.name} x${item.quantity}`}</div>
                  ))}
                </td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Add Product</h3>
      <form
  className="admin-form"
  onSubmit={(e) => {
    e.preventDefault();

    const newProduct = {
      name: e.target.name?.value.trim(), // Use 'name' to match your model
      price: parseFloat(e.target.price?.value), // Parse price safely
      image: e.target.image?.value.trim() || "", // Optional image field with fallback
    };

    // Validation to ensure required fields are present
    if (!newProduct.name || isNaN(newProduct.price)) {
      alert("Please fill out all required fields correctly.");
      return;
    }

    addProduct(newProduct); // Call the addProduct function to send data to the backend
  }}
>
  <input type="text" name="name" placeholder="Product Name" required /> {/* Matches 'name' in model */}
  <input type="number" name="price" placeholder="Product Price" required /> {/* Matches 'price' in model */}
  <input type="text" name="image" placeholder="Product Image URL" /> {/* Matches 'image' in model */}
  <button type="submit" className="admin-button">Add Product</button>
</form>

    </div>
  );
};

export default AdminOrdersPage;
