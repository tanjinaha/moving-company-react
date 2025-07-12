// src/components/OrderServiceTypeList.tsx
import { useEffect, useState } from "react";

/** Exactly matches the JSON your controller returns */
interface OrderServiceType {
  orderServiceTypeId: number;
  orderId: number;
  serviceId: number;
  fromAddress: string | null;
  toAddress: string | null;
  scheduleDate: string | null;  // ISO date as a string
  price: number | null;
}

export default function OrderServiceTypeList() {
  const [rows, setRows] = useState<OrderServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/orderservicetypes")
      .then(r => {
        if (!r.ok) throw new Error("Failed to fetch order-service types");
        return r.json();
      })
      .then((data: OrderServiceType[]) => {
        setRows(data);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading order-service types…</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Order ↔ Service Type List</h2>
      <table className="min-w-full border mt-4">
  <thead>
    <tr className="bg-gray-200">
      <th className="border p-2">Order ID</th>
      <th className="border p-2">Service ID</th>
      <th className="border p-2">From</th>
      <th className="border p-2">To</th>
      <th className="border p-2">Schedule Date</th>
      <th className="border p-2">Price</th>
    </tr>
  </thead>
  <tbody>
    {rows.map(r => (
      <tr key={r.orderServiceTypeId}>
        <td className="border p-2">{r.orderId}</td>
        <td className="border p-2">{r.serviceId}</td>
        <td className="border p-2">{r.fromAddress || "-"}</td>
        <td className="border p-2">{r.toAddress || "-"}</td>
        <td className="border p-2">{r.scheduleDate || "-"}</td>
        <td className="border p-2">{r.price || "-"}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}