// src/components/OrderOverviewPage.tsx

import { useEffect, useState } from "react";

// --- Interfaces to describe the data types ---
interface Order {
  orderId: number;
  customerId: number;
  consultantId: number;
  note: string;
}

interface Customer {
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: number;
}

interface SalesConsultant {
  consultantId: number;
  consultantName: string;
  consultantPhone: number;
  consultantEmail: string;
}

interface OrderServiceType {
  orderServiceTypeId: number;
  orderId: number;
  serviceId: number;
  fromAddress: string | null;
  toAddress: string | null;
  scheduleDate: string | null;
  price: number | null;
}

// --- Main Component ---
export default function OrderOverviewPage() {
  // States for all 4 tables
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [consultants, setConsultants] = useState<SalesConsultant[]>([]);
  const [orderServiceTypes, setOrderServiceTypes] = useState<OrderServiceType[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch all data when component loads ---
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/orders").then((r) => r.json()),
      fetch("http://localhost:8080/customers").then((r) => r.json()),
      fetch("http://localhost:8080/salesconsultants").then((r) => r.json()),
      fetch("http://localhost:8080/orderservicetypes").then((r) => r.json()),
    ])
      .then(([orderData, customerData, consultantData, orderServiceData]) => {
        setOrders(orderData);
        setCustomers(customerData);
        setConsultants(consultantData);
        setOrderServiceTypes(orderServiceData);
        setLoading(false);
      })
      .catch((e) => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  // Show loading or error if needed
  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {error}</div>;

  // --- Helper functions to get customer/consultant info ---
  const getCustomerName = (id: number) => {
    const customer = customers.find((c) => c.customerId === id);
    return customer ? `${customer.customerName} (${customer.customerEmail})` : "Unknown Customer";
  };

  const getConsultantName = (id: number) => {
    const consultant = consultants.find((c) => c.consultantId === id);
    return consultant ? `${consultant.consultantName} (${consultant.consultantPhone})` : "Unknown Consultant";
  };

  // For each order, show matching OrderServiceType info
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📦 Orders Overview</h2>
      <table className="min-w-full border mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Consultant</th>
            <th className="border p-2">Service ID</th>
            <th className="border p-2">From Address</th>
            <th className="border p-2">To Address</th>
            <th className="border p-2">Schedule Date</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Note</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            // Find the matching order-service info for this order
            const orderService = orderServiceTypes.find((o) => o.orderId === order.orderId);

            return (
              <tr key={order.orderId}>
                <td className="border p-2">{order.orderId}</td>
                <td className="border p-2">{getCustomerName(order.customerId)}</td>
                <td className="border p-2">{getConsultantName(order.consultantId)}</td>
                <td className="border p-2">{orderService?.serviceId ?? "-"}</td>
                <td className="border p-2">{orderService?.fromAddress ?? "-"}</td>
                <td className="border p-2">{orderService?.toAddress ?? "-"}</td>
                <td className="border p-2">{orderService?.scheduleDate ?? "-"}</td>
                <td className="border p-2">{orderService?.price ?? "-"}</td>
                <td className="border p-2">{order.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}