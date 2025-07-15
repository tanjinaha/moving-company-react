// src/components/OrderOverviewPage.tsx

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Interfaces to match backend structure
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

interface ServiceType {
    serviceId: number;
    serviceName: string;
}

export default function OrderOverviewPage() {
    // Backend data states
    const [orders, setOrders] = useState<Order[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [consultants, setConsultants] = useState<SalesConsultant[]>([]);
    const [orderServiceTypes, setOrderServiceTypes] = useState<OrderServiceType[]>([]);
    const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [originalOrders, setOriginalOrders] = useState<Order[]>([]);
    const [originalOrderServices, setOriginalOrderServices] = useState<OrderServiceType[]>([]);

    // Load data once when component mounts
    useEffect(() => {
        Promise.all([
            fetch("http://localhost:8080/orders").then(r => r.json()),
            fetch("http://localhost:8080/customers").then(r => r.json()),
            fetch("http://localhost:8080/salesconsultants").then(r => r.json()),
            fetch("http://localhost:8080/orderservicetypes").then(r => r.json()),
            fetch("http://localhost:8080/servicetypes").then(r => r.json()),
        ])
            .then(([orderData, customerData, consultantData, orderServiceData, serviceTypeData]) => {
                setOrders(orderData);
                setOriginalOrders(orderData);
                setCustomers(customerData);
                setConsultants(consultantData);
                setOrderServiceTypes(orderServiceData);
                setOriginalOrderServices(orderServiceData);
                setServiceTypes(serviceTypeData);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load data");
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading…</div>;
    if (error) return <div>Error: {error}</div>;

    // Helpers to show names from IDs
    const getCustomerName = (id: number) => {
        const c = customers.find(c => c.customerId === id);
        return c ? `${c.customerName} (${c.customerPhone})` : "Unknown Customer";
    };

    const getConsultantName = (id: number) => {
        const c = consultants.find(c => c.consultantId === id);
        return c ? `${c.consultantName} (${c.consultantPhone})` : "Unknown Consultant";
    };

    const handleFieldChange = (orderId: number, field: keyof Order, value: any) => {
        setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, [field]: value } : o));
    };

    const handleSaveOrder = async (orderId: number) => {
        const confirmSave = window.confirm("Are you sure you want to save changes to this order?");

        if (!confirmSave) {
            // 👇 Revert changes if user cancels
            const originalOrder = originalOrders.find(o => o.orderId === orderId);
            const originalService = originalOrderServices.find(s => s.orderId === orderId);

            if (originalOrder) {
                setOrders(prev => prev.map(o => o.orderId === orderId ? originalOrder : o));
            }

            if (originalService) {
                setOrderServiceTypes(prev => prev.map(s => s.orderId === orderId ? originalService : s));
            }

            return;// ✅ After this line, nothing else should run if user cancels
        }
        // ✅ Now run the real save only if user confirmed
        const order = orders.find(o => o.orderId === orderId);
        const service = orderServiceTypes.find(s => s.orderId === orderId);
        if (!order || !service) return alert("❌ Cannot find order or service");

        try {
            await fetch(`http://localhost:8080/orders/${orderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order),
            });

            await fetch(`http://localhost:8080/orderservicetypes/${service!.orderServiceTypeId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(service),
            });
            // ✅ Update original backups with latest saved versions
            setOriginalOrders(prev => prev.map(o => o.orderId === orderId ? order : o));
            setOriginalOrderServices(prev => prev.map(s => s.orderId === orderId ? service : s));

            alert("✅ Order changes saved!");
        } catch (err) {
            console.error(err);
            alert("❌ Failed to save order changes");
        }
    };

    const handleDeleteOrder = async (orderId: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this order?");
        if (!confirmDelete) return;
        try {
            await fetch(`http://localhost:8080/orders/${orderId}`, {
                method: "DELETE"
            });
            const updatedOrders = await fetch("http://localhost:8080/orders").then(r => r.json());
            const updatedOrderServices = await fetch("http://localhost:8080/orderservicetypes").then(r => r.json());
            setOrders(updatedOrders);
            setOrderServiceTypes(updatedOrderServices);
            alert("🗑️ Order deleted successfully");
        } catch (err) {
            console.error(err);
            alert("Failed to delete order");
        }
    };

    // --- Render table of orders ---
    return (
        <div className="p-4">
            {/* Link to view all customers in a card layout */}
            <Link to="/customers/cards">
                <Button className="mb-4 bg-blue-600 text-white">View All Customers</Button>
            </Link>
            
            <Link to="/consultants/cards">
                <Button className="mb-4 bg-purple-600 text-white">View All Consultants</Button>
            </Link>
            <table className="min-w-full border mt-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Order ID</th>
                        <th className="border p-2">Customer</th>
                        <th className="border p-2">Consultant</th>
                        <th className="border p-2">Service</th>
                        <th className="border p-2">From</th>
                        <th className="border p-2">To</th>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Note</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => {
                        const service = orderServiceTypes.find(s => s.orderId === order.orderId);
                        return (
                            <tr key={order.orderId}>
                                <td className="border p-2">{order.orderId}</td>
                                <td className="border p-2">{getCustomerName(order.customerId)}</td>
                                <td className="border p-2">{getConsultantName(order.consultantId)}</td>
                                <td className="border p-2">
                                    <select
                                        value={service?.serviceId}
                                        onChange={(e) => {
                                            const id = parseInt(e.target.value);
                                            setOrderServiceTypes(prev =>
                                                prev.map(s =>
                                                    s.orderServiceTypeId === service?.orderServiceTypeId ? { ...s, serviceId: id } : s
                                                )
                                            );
                                        }}
                                        className="border p-1 rounded"
                                    >
                                        {serviceTypes.map(s => (
                                            <option key={s.serviceId} value={s.serviceId}>{s.serviceName}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border p-2">
                                    <Input
                                        value={service?.fromAddress ?? ""}
                                        onChange={e => setOrderServiceTypes(prev =>
                                            prev.map(s =>
                                                s.orderServiceTypeId === service?.orderServiceTypeId ? { ...s, fromAddress: e.target.value } : s
                                            ))}
                                    />
                                </td>
                                <td className="border p-2">
                                    <Input
                                        value={service?.toAddress ?? ""}
                                        onChange={e => setOrderServiceTypes(prev =>
                                            prev.map(s =>
                                                s.orderServiceTypeId === service?.orderServiceTypeId ? { ...s, toAddress: e.target.value } : s
                                            ))}
                                    />
                                </td>
                                <td className="border p-2">
                                    <Input
                                        type="date"
                                        value={service?.scheduleDate ?? ""}
                                        onChange={e => setOrderServiceTypes(prev =>
                                            prev.map(s =>
                                                s.orderServiceTypeId === service?.orderServiceTypeId ? { ...s, scheduleDate: e.target.value } : s
                                            ))}
                                    />
                                </td>
                                <td className="border p-2">
                                    <Input
                                        type="number"
                                        value={service?.price ?? ""}
                                        onChange={e => setOrderServiceTypes(prev =>
                                            prev.map(s =>
                                                s.orderServiceTypeId === service?.orderServiceTypeId ? { ...s, price: parseFloat(e.target.value) } : s
                                            ))}
                                    />
                                </td>
                                <td className="border p-2">
                                    <Input
                                        value={order.note}
                                        onChange={e => handleFieldChange(order.orderId, "note", e.target.value)}
                                    />
                                </td>
                                <td className="border p-2 space-y-1">
                                    <Button onClick={() => handleSaveOrder(order.orderId)} className="w-full bg-green-500 text-white">Save</Button>
                                    <Button onClick={() => handleDeleteOrder(order.orderId)} className="w-full bg-red-500 text-white">Delete</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
