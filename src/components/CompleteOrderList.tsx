// src/components/CompleteOrderList.tsx
import { useEffect, useState } from "react";

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

export default function CompleteOrderList() {
  const [orders, setOrders] = useState<OrderDetails[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/orders/details")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const completeOrders = orders.filter(order =>
    order.serviceType !== "No service" &&
    order.scheduleDate !== "1970-01-01" &&
    order.price !== null
  );

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">✅ Complete Orders (Read-Only)</h2>
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
            </tr>
          </thead>
          <tbody>
            {completeOrders.map((order) => (
              <tr key={order.orderId} className="text-center border-t">
                <td className="border px-2 py-2">{order.orderId}</td>
                <td className="border px-2 py-2">{order.customerName}</td>
                <td className="border px-2 py-2">{order.consultantName}</td>
                <td className="border px-2 py-2">{order.note}</td>
                <td className="border px-2 py-2">{order.serviceType}</td>
                <td className="border px-2 py-2">{order.fromAddress}</td>
                <td className="border px-2 py-2">{order.toAddress}</td>
                <td className="border px-2 py-2">{new Date(order.scheduleDate).toLocaleDateString()}</td>
                <td className="border px-2 py-2">{order.price} kr</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
