import { useState, useEffect } from "react";

// Define the shape of one Order object (matches your backend JSON)
interface Order {
  orderId: number;
  customerId: number;
  consultantId: number;
  note: string | null;
}

// OrdersList component fetches and shows the orders
export default function OrdersList() {
  
  // State to store fetched orders
  const [orders, setOrders] = useState<Order[]>([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState<string | null>(null);

  // useEffect runs once after the component mounts
  useEffect(() => {
    fetch("http://localhost:8080/orders")  // Replace with your actual backend endpoint
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        return res.json();
      })
      .then((data: Order[]) => {
        setOrders(data);   // Save orders data in state
        setLoading(false); // Turn off loading indicator
      })
      .catch((err) => {
        setError(err.message);  // Save error message
        setLoading(false);
      });
  }, []);  // Empty dependency means run once on mount

  // Show loading message while fetching
  if (loading) return <div className="p-4">Loading orders…</div>;

  // Show error if fetch failed
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  // Render list of orders
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Orders List</h2>
      <ul className="space-y-2">
        {orders.map((order) => (
          <li
            key={order.orderId}
            className="border rounded p-3 shadow hover:bg-gray-50"
          >
            <p><strong>Order ID:</strong> {order.orderId}</p>
            <p><strong>Customer ID:</strong> {order.customerId}</p>
            <p><strong>Consultant ID:</strong> {order.consultantId}</p>
            {order.note && <p><strong>Note:</strong> {order.note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}