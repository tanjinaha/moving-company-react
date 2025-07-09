// Import React hooks:
// - useState to store and update data in the component (state variables)
// - useEffect to run side effects (like fetching data) when the component loads
import { useEffect, useState } from "react";

// Define the TypeScript interface for an Order object.
// This tells TypeScript the shape and types of the data you expect from backend.
interface Order {
  orderId: number;         // Unique ID for the order
  customerId: number;      // ID of the customer who placed the order
  consultantId: number;    // ID of the sales consultant handling the order
  note: string | null;     // Optional note about the order
}

// Main React component to fetch and display a list of orders
export default function OrderList() {
  // State to hold the list of orders fetched from backend
  const [orders, setOrders] = useState<Order[]>([]);

  // State to indicate whether the data is still loading
  const [loading, setLoading] = useState(true);

  // State to hold any error message if fetching data fails
  const [error, setError] = useState<string | null>(null);

  // useEffect runs once after the component first renders
  // It fetches order data from the backend API
  useEffect(() => {
    // Fetch orders from the backend API URL
    fetch("http://localhost:8080/orders")  // Adjust URL if needed
      .then((response) => {
        // Check if response status is OK (status code 200-299)
        if (!response.ok) {
          // If response not OK, throw an error to be caught below
          throw new Error("Failed to fetch orders");
        }
        // Parse the response JSON data
        return response.json();
      })
      .then((data: Order[]) => {
        // Save the fetched orders data in state
        setOrders(data);
        // Turn off loading indicator
        setLoading(false);
      })
      .catch((error) => {
        // If any error occurs, save the error message
        setError(error.message);
        // Turn off loading indicator even if error occurs
        setLoading(false);
      });
  }, []); // Empty dependency array means run this effect only once after first render

  // While loading, show a friendly message to user
  if (loading) return <div>Loading orders...</div>;

  // If there was an error, show the error message
  if (error) return <div>Error: {error}</div>;

  // When data is loaded successfully, render the list of orders
  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {/* Loop over the orders array and render each order as a list item */}
        {orders.map((order) => (
          <li key={order.orderId}>
            {/* Show order details */}
            Order ID: {order.orderId} - Customer ID: {order.customerId} - Consultant ID: {order.consultantId} - Note: {order.note || "No notes"}
          </li>
        ))}
      </ul>
    </div>
  );
}