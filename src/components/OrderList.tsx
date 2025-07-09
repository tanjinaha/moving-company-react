// src/components/OrderList.tsx
import { useEffect, useState } from "react";

/** One row exactly as your Order entity sends it */
interface Order {
  orderId: number;
  customerId: number;
  consultantId: number;
  note: string | null;
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/orders")
      .then(r => {
        if (!r.ok) throw new Error("Failed to fetch orders");
        return r.json();
      })
      .then((data: Order[]) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading orders…</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {orders.map(o => (
          <li key={o.orderId}>
            Order #{o.orderId} — Customer ID: {o.customerId} — Consultant ID: {o.consultantId}
            {o.note && <> — Note: {o.note}</>}
          </li>
        ))}
      </ul>
    </div>
  );
}