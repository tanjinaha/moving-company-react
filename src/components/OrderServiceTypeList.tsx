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
      <ul>
        {rows.map(r => (
          <li key={r.orderServiceTypeId}>
            ID: {r.orderServiceTypeId} — Order: #{r.orderId} — Service: #{r.serviceId}
            {r.fromAddress && <> — From: {r.fromAddress}</>}
            {r.toAddress && <> — To: {r.toAddress}</>}
            {r.scheduleDate && <> — Date: {r.scheduleDate}</>}
            {r.price && <> — Price: {r.price}</>}
          </li>
        ))}
      </ul>
    </div>
  );
}