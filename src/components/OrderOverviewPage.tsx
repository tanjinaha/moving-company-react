import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// ✅ Interface matching OrderDetailsDTO from backend
interface OrderDetails {
  customerName: string;
  consultantName: string;
  note: string;
}

export default function OrderOverviewPage() {
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch order data when page loads
  useEffect(() => {
    fetch("http://localhost:8080/orders/details")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load orders");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      {/* 🔗 Navigation buttons */}
      <div className="mb-4 space-x-4">
        <Link to="/customers/cards">
          <Button className="bg-blue-600 text-white">View All Customers</Button>
        </Link>
        <Link to="/consultants/cards">
          <Button className="bg-purple-600 text-white">View All Consultants</Button>
        </Link>
      </div>

      {/* ✅ Order table showing only Customer, Consultant, Note */}
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Customer</th>
            <th className="border p-2">Consultant</th>
            <th className="border p-2">Note</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="border p-2">{order.customerName}</td>
              <td className="border p-2">{order.consultantName}</td>
              <td className="border p-2">{order.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
