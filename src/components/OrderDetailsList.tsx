// src/components/OrderDetailsList.tsx
import { useEffect, useState } from "react";

// Define the shape of one order's full detail (from backend DTO)
interface OrderDetails {
  orderId: number;
  customerName: string;
  consultantName: string;
  note: string;
  serviceType: string;
  fromAddress: string;
  toAddress: string;
  scheduleDate: string;
  price: number;
}

export default function OrderDetailsList() {
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [editedOrder, setEditedOrder] = useState<Partial<OrderDetails>>({});

  // Load data from backend
  useEffect(() => {
    fetch("http://localhost:8080/orders/details")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("❌ Error fetching order details:", err));
  }, []);

  // Update local state while editing
  const handleChange = (field: keyof OrderDetails, value: any) => {
    setEditedOrder((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Save edits
  const handleSave = async (orderId: number) => {
    const confirm = window.confirm("💾 Are you sure you want to save the changes?");
    if (!confirm) return;

    try {
      await fetch(`http://localhost:8080/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedOrder),
      });

      // ✅ Update local list
      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId ? { ...order, ...editedOrder } : order
        )
      );

      alert("✅ Changes saved!");
      setEditingOrderId(null);
      setEditedOrder({});
    } catch (error) {
      alert("❌ Failed to save changes.");
    }
  };

  // ❌ Delete
  const handleDelete = async (orderId: number) => {
    const confirm = window.confirm("🗑️ Are you sure you want to delete this order?");
    if (!confirm) return;

    try {
      await fetch(`http://localhost:8080/orders/${orderId}`, {
        method: "DELETE",
      });

      // Remove from state
      setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
      alert("✅ Order deleted!");
    } catch (error) {
      alert("❌ Failed to delete order.");
    }
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">📋 All Orders with Details</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100 text-sm font-semibold">
            <tr>
              <th className="border px-3 py-2">Order ID</th>
              <th className="border px-3 py-2">Customer</th>
              <th className="border px-3 py-2">Consultant</th>
              <th className="border px-3 py-2">Note</th>
              <th className="border px-3 py-2">Service</th>
              <th className="border px-3 py-2">From</th>
              <th className="border px-3 py-2">To</th>
              <th className="border px-3 py-2">Schedule</th>
              <th className="border px-3 py-2">Price</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const isEditing = editingOrderId === order.orderId;
              return (
                <tr key={order.orderId} className="text-center border-t">
                  <td className="border px-2 py-2">{order.orderId}</td>
                  <td className="border px-2 py-2">{order.customerName}</td>
                  <td className="border px-2 py-2">{order.consultantName}</td>

                  <td className="border px-2 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full border px-1 py-0.5 rounded"
                        defaultValue={order.note}
                        onChange={(e) => handleChange("note", e.target.value)}
                      />
                    ) : (
                      order.note
                    )}
                  </td>

                  <td className="border px-2 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full border px-1 py-0.5 rounded"
                        defaultValue={order.serviceType}
                        onChange={(e) => handleChange("serviceType", e.target.value)}
                      />
                    ) : (
                      order.serviceType
                    )}
                  </td>

                  <td className="border px-2 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full border px-1 py-0.5 rounded"
                        defaultValue={order.fromAddress}
                        onChange={(e) => handleChange("fromAddress", e.target.value)}
                      />
                    ) : (
                      order.fromAddress
                    )}
                  </td>

                  <td className="border px-2 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full border px-1 py-0.5 rounded"
                        defaultValue={order.toAddress}
                        onChange={(e) => handleChange("toAddress", e.target.value)}
                      />
                    ) : (
                      order.toAddress
                    )}
                  </td>

                  <td className="border px-2 py-2">
                    {isEditing ? (
                      <input
                        type="date"
                        className="w-full border px-1 py-0.5 rounded"
                        defaultValue={order.scheduleDate.split("T")[0]}
                        onChange={(e) => handleChange("scheduleDate", e.target.value)}
                      />
                    ) : (
                      new Date(order.scheduleDate).toLocaleDateString()
                    )}
                  </td>

                  <td className="border px-2 py-2">
                    {isEditing ? (
                      <input
                        type="number"
                        className="w-full border px-1 py-0.5 rounded"
                        defaultValue={order.price}
                        onChange={(e) => handleChange("price", parseFloat(e.target.value))}
                      />
                    ) : (
                      `${order.price} kr`
                    )}
                  </td>

                  <td className="border px-2 py-2 space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          onClick={() => handleSave(order.orderId)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                          onClick={() => handleDelete(order.orderId)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                        onClick={() => {
                          setEditingOrderId(order.orderId);
                          setEditedOrder(order);
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
