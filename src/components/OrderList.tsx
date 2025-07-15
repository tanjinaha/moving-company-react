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

  // Keep track of which order is being edited (null means none)
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);

  // Track updated note (for editing)
  const [editedNote, setEditedNote] = useState<string>("");

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
  function handleUpdate(orderId: number) {
    // Build the updated order object (only note in this case)
    const existingOrder = orders.find(o => o.orderId === orderId);

    if (!existingOrder) {
      alert("Order not found");
      return;
    }

    const updatedOrder = {
      orderId: existingOrder.orderId,
      customerId: existingOrder.customerId,
      consultantId: existingOrder.consultantId,
      note: editedNote,
    };

    fetch(`http://localhost:8080/orders/${orderId}`, {
      method: "PUT", // or PUT if your backend uses that
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update order");
        }
        return res.json();
      })
      .then((updated) => {
        // Update the order in the local list
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId ? { ...order, note: editedNote } : order
          )
        );

        // Reset editing state
        setEditingOrderId(null);
        setEditedNote("");
      })
      .catch((err) => {
        alert("Error updating order: " + err.message);
      });
  } function handleDelete(orderId: number) {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    fetch(`http://localhost:8080/orders/${orderId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete order");
        }
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.orderId !== orderId)
        );
        setEditingOrderId(null);
      })
      .catch((err) => {
        alert("Error deleting order: " + err.message);
      });
  }


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

            <button
              className="mt-2 px-3 py-1 bg-yellow-400 rounded text-white hover:bg-yellow-500"
              onClick={() => {
                setEditingOrderId(order.orderId);       // Start editing this order
                setEditedNote(order.note || "");        // Fill input with current note (or empty if null)
              }}
            >
              Edit
            </button>

            <button
              className="mt-2 ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
               onClick={() => handleDelete(order.orderId)}
            >
              Delete
            </button>

            {/* Show input + save button ONLY when editing this order */}
            {editingOrderId === order.orderId && (
              <div className="mt-2 space-y-2">
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={editedNote}
                  onChange={(e) => setEditedNote(e.target.value)}
                  placeholder="Update note"
                />
                <button
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  onClick={() => handleUpdate(order.orderId)}  // We will write this function next
                >
                  Save
                </button>

                {/*  NEW Delete button */}
                



              </div>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
}