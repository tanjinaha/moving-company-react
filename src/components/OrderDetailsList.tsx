// src/components/OrderDetailsList.tsx

import { useEffect, useState } from "react";

// Define the shape of one order's full detail (based on your Java backend DTO)
interface OrderDetails {
  orderId: number;
  customerName: string;
  consultantName: string;
  note: string;
  serviceType: string;
  fromAddress: string;
  toAddress: string;
  scheduleDate: string;  // ISO date string
  price: number;
}

// This component shows a full table of order information
export default function OrderDetailsList() {
  // State to hold all order detail rows from backend
  const [orders, setOrders] = useState<OrderDetails[]>([]);

  // Fetch data from backend when this component loads
  useEffect(() => {
    fetch("http://localhost:8080/orders/details")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("❌ Error fetching order details:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 All Orders with Details</h2>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
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
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId} className="text-center">
              <td className="border px-2 py-1">{order.orderId}</td>
              <td className="border px-2 py-1">{order.customerName}</td>
              <td className="border px-2 py-1">{order.consultantName}</td>
              <td className="border px-2 py-1">{order.note}</td>
              <td className="border px-2 py-1">{order.serviceType}</td>
              <td className="border px-2 py-1">{order.fromAddress}</td>
              <td className="border px-2 py-1">{order.toAddress}</td>
              <td className="border px-2 py-1">
                {new Date(order.scheduleDate).toLocaleDateString()}
              </td>
              <td className="border px-2 py-1">{order.price} kr</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
