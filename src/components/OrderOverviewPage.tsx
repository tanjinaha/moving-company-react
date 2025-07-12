// src/components/OrderOverviewPage.tsx

import { useEffect, useState } from "react";

// --- Interfaces define the structure of data from backend tables ---
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

// --- Main React Component ---
export default function OrderOverviewPage() {
    // React state to hold data from backend
    const [orders, setOrders] = useState<Order[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [consultants, setConsultants] = useState<SalesConsultant[]>([]);
    const [orderServiceTypes, setOrderServiceTypes] = useState<OrderServiceType[]>([]);
    const [serviceTypes, setServiceTypes] = useState<{ serviceId: number; serviceName: string }[]>([]);

    // ⬇️ ✅ Paste here:
    const [newOrder, setNewOrder] = useState<Order>({
        orderId: 0,
        customerId: customers[0]?.customerId ?? 0,
        consultantId: consultants[0]?.consultantId ?? 0,
        note: ""
    });

    const [newOrderService, setNewOrderService] = useState<OrderServiceType>({
        orderServiceTypeId: 0,
        orderId: 0,
        serviceId: serviceTypes[0]?.serviceId ?? 0,
        fromAddress: "",
        toAddress: "",
        scheduleDate: "",
        price: 0
    });

    // Loading and error state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load all data when page first loads
    useEffect(() => {
        Promise.all([
            fetch("http://localhost:8080/orders").then((r) => r.json()),
            fetch("http://localhost:8080/customers").then((r) => r.json()),
            fetch("http://localhost:8080/salesconsultants").then((r) => r.json()),
            fetch("http://localhost:8080/orderservicetypes").then((r) => r.json()),
            fetch("http://localhost:8080/servicetypes").then((r) => r.json()), // ✅ new

        ])
            .then(([orderData, customerData, consultantData, orderServiceData, serviceTypeData]) => {
                setOrders(orderData);
                setCustomers(customerData);
                setConsultants(consultantData);
                setOrderServiceTypes(orderServiceData);
                setServiceTypes(serviceTypeData); // ✅ new
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load data");
                setLoading(false);
            });
    }, []);

    // Show loading or error message if needed
    if (loading) return <div>Loading…</div>;
    if (error) return <div>Error: {error}</div>;

    // --- Helper: Get formatted customer name and phone ---
    const getCustomerName = (id: number) => {
        const customer = customers.find((c) => c.customerId === id);
        return customer
            ? `${customer.customerName} (${customer.customerPhone})`
            : "Unknown Customer";
    };

    // --- Helper: Get formatted consultant name and phone ---
    const getConsultantName = (id: number) => {
        const consultant = consultants.find((c) => c.consultantId === id);
        return consultant
            ? `${consultant.consultantName} (${consultant.consultantPhone})`
            : "Unknown Consultant";
    };
    // This function returns the service name (like "Packing") from a serviceId
    const getServiceName = (serviceId: number) => {
        const service = serviceTypes.find((s) => s.serviceId === serviceId);
        return service ? service.serviceName : "Unknown Service";
    };

    // --- Helper: Update a specific field in an order (e.g. customerId or note) ---
    const handleFieldChange = (orderId: number, field: keyof Order, value: any) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.orderId === orderId ? { ...order, [field]: value } : order
            )
        );
    };

    const handleSaveNewOrder = async () => {
        // ❗ Validation: Check required fields
        if (
            !newOrder.customerId ||
            !newOrder.consultantId ||
            !newOrderService.serviceId ||
            !newOrderService.fromAddress ||
            !newOrderService.toAddress ||
            !newOrderService.scheduleDate ||
            !newOrderService.price
        ) {
            alert("❗ Please fill in all fields before saving.");
            return;
        }
        try {
            const orderResponse = await fetch("http://localhost:8080/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerId: newOrder.customerId,
                    consultantId: newOrder.consultantId,
                    note: newOrder.note
                })
            });

            const savedOrder = await orderResponse.json();

            await fetch("http://localhost:8080/orderservicetypes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId: savedOrder.orderId,
                    serviceId: newOrderService.serviceId,
                    fromAddress: newOrderService.fromAddress,
                    toAddress: newOrderService.toAddress,
                    scheduleDate: newOrderService.scheduleDate,
                    price: newOrderService.price
                })
            });

            const [orderData, orderServiceData] = await Promise.all([
                fetch("http://localhost:8080/orders").then((r) => r.json()),
                fetch("http://localhost:8080/orderservicetypes").then((r) => r.json())
            ]);

            setOrders(orderData);
            setOrderServiceTypes(orderServiceData);

            setNewOrder({
                orderId: 0,
                customerId: customers[0]?.customerId ?? 0,
                consultantId: consultants[0]?.consultantId ?? 0,
                note: ""
            });

            setNewOrderService({
                orderServiceTypeId: 0,
                orderId: 0,
                serviceId: serviceTypes[0]?.serviceId ?? 0,
                fromAddress: "",
                toAddress: "",
                scheduleDate: "",
                price: 0
            });

            alert("✅ Order saved!");
        } catch (error) {
            alert("❌ Failed to save order.");
            console.error(error);
        }
    };

    // --- Return JSX (HTML structure) ---
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">📦 Orders Overview</h2>

            <table className="min-w-full border mt-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Order ID</th>
                        <th className="border p-2">Customer (Phone)</th>
                        <th className="border p-2">Consultant (Phone)</th>
                        <th className="border p-2">Service</th>
                        <th className="border p-2">From Address</th>
                        <th className="border p-2">To Address</th>
                        <th className="border p-2">Schedule Date</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Note</th>
                    </tr>
                </thead>
                <tbody>
                    {/* --- "New" entry row (just a placeholder for future form) --- */}
                    <tr className="bg-yellow-50">
                        <td className="border p-2">New</td>

                        {/* Customer dropdown */}
                        <td className="border p-2">
                            <select
                                value={newOrder.customerId}
                                onChange={(e) =>
                                    setNewOrder({ ...newOrder, customerId: parseInt(e.target.value) })
                                }
                                className="border rounded p-1"
                            >
                                {customers.map((c) => (
                                    <option key={c.customerId} value={c.customerId}>
                                        {c.customerName}
                                    </option>
                                ))}
                            </select>
                        </td>

                        {/* Consultant dropdown */}
                        <td className="border p-2">
                            <select
                                value={newOrder.consultantId}
                                onChange={(e) =>
                                    setNewOrder({ ...newOrder, consultantId: parseInt(e.target.value) })
                                }
                                className="border rounded p-1"
                            >
                                {consultants.map((c) => (
                                    <option key={c.consultantId} value={c.consultantId}>
                                        {c.consultantName}
                                    </option>
                                ))}
                            </select>
                        </td>

                        {/* Service dropdown */}
                        <td className="border p-2">
                            <select
                                value={newOrderService.serviceId}
                                onChange={(e) =>
                                    setNewOrderService({ ...newOrderService, serviceId: parseInt(e.target.value) })
                                }
                                className="border rounded p-1"
                            >
                                {serviceTypes.map((s) => (
                                    <option key={s.serviceId} value={s.serviceId}>
                                        {s.serviceName}
                                    </option>
                                ))}
                            </select>
                        </td>

                        {/* From address */}
                        <td className="border p-2">
                            <input
                                type="text"
                                value={newOrderService.fromAddress ?? ""}
                                onChange={(e) =>
                                    setNewOrderService({ ...newOrderService, fromAddress: e.target.value })
                                }
                                className="border rounded p-1"
                            />
                        </td>

                        {/* To address */}
                        <td className="border p-2">
                            <input
                                type="text"
                                value={newOrderService.toAddress ?? ""}
                                onChange={(e) =>
                                    setNewOrderService({ ...newOrderService, toAddress: e.target.value })
                                }
                                className="border rounded p-1"
                            />
                        </td>

                        {/* Date */}
                        <td className="border p-2">
                            <input
                                type="date"
                                value={newOrderService.scheduleDate ?? ""}
                                onChange={(e) =>
                                    setNewOrderService({ ...newOrderService, scheduleDate: e.target.value })
                                }
                                className="border rounded p-1"
                            />
                        </td>

                        {/* Price */}
                        <td className="border p-2">
                            <input
                                type="number"
                                value={newOrderService.price ?? ""}
                                onChange={(e) =>
                                    setNewOrderService({ ...newOrderService, price: parseFloat(e.target.value) })
                                }
                                className="border rounded p-1"
                            />
                        </td>

                        {/* Note */}
                        <td className="border p-2">
                            <input
                                type="text"
                                value={newOrder.note}
                                onChange={(e) =>
                                    setNewOrder({ ...newOrder, note: e.target.value })
                                }
                                className="border rounded p-1"
                            />
                        </td>
                    </tr>

                    {/* --- Loop through each order and display a table row --- */}
                    {orders.map((order) => {
                        // Find matching service row for this order
                        const orderService = orderServiceTypes.find(
                            (o) => o.orderId === order.orderId
                        );

                        return (
                            <tr key={order.orderId}>
                                <td className="border p-2">{order.orderId}</td>

                                {/* --- Customer dropdown + phone below in blue --- */}
                                <td className="border p-2">
                                    <select
                                        value={order.customerId}
                                        onChange={(e) =>
                                            handleFieldChange(order.orderId, "customerId", parseInt(e.target.value))
                                        }
                                        className="border rounded p-1"
                                    >
                                        {customers.map((c) => (
                                            <option key={c.customerId} value={c.customerId}>
                                                {c.customerName}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Phone number below in blue text */}
                                    <div className="mt-1 text-blue-600 text-sm">
                                        {getCustomerName(order.customerId).split(" (")[1]?.replace(")", "")}
                                    </div>
                                </td>

                                {/* --- Consultant name on top, phone number below --- */}
                                {/* --- Consultant dropdown + phone below in blue --- */}
                                <td className="border p-2">
                                    <select
                                        value={order.consultantId}
                                        onChange={(e) =>
                                            handleFieldChange(order.orderId, "consultantId", parseInt(e.target.value))
                                        }
                                        className="border rounded p-1"
                                    >
                                        {consultants.map((c) => (
                                            <option key={c.consultantId} value={c.consultantId}>
                                                {c.consultantName}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="mt-1 text-blue-600 text-sm">
                                        {
                                            consultants.find(c => c.consultantId === order.consultantId)
                                                ?.consultantPhone ?? "No phone"
                                        }
                                    </div>
                                </td>

                                {/* --- Service shown as read-only --- */}
                                <td className="border p-2">
                                    {orderService ? (
                                        <select
                                            value={orderService.serviceId}
                                            onChange={(e) => {
                                                const newServiceId = parseInt(e.target.value);
                                                setOrderServiceTypes((prev) =>
                                                    prev.map((service) =>
                                                        service.orderServiceTypeId === orderService.orderServiceTypeId
                                                            ? { ...service, serviceId: newServiceId }
                                                            : service
                                                    )
                                                );
                                            }}
                                            className="border rounded p-1"
                                        >
                                            {serviceTypes.map((s) => (
                                                <option key={s.serviceId} value={s.serviceId}>
                                                    {s.serviceName}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={orderService?.fromAddress ?? ""}
                                        onChange={(e) => {
                                            const newAddress = e.target.value;
                                            setOrderServiceTypes((prev) =>
                                                prev.map((service) =>
                                                    service.orderServiceTypeId === orderService?.orderServiceTypeId
                                                        ? { ...service, fromAddress: newAddress }
                                                        : service
                                                )
                                            );
                                        }}
                                        className="border rounded p-1 w-full"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={orderService?.toAddress ?? ""}
                                        onChange={(e) => {
                                            const newAddress = e.target.value;
                                            setOrderServiceTypes((prev) =>
                                                prev.map((service) =>
                                                    service.orderServiceTypeId === orderService?.orderServiceTypeId
                                                        ? { ...service, toAddress: newAddress }
                                                        : service
                                                )
                                            );
                                        }}
                                        className="border rounded p-1 w-full"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="date"
                                        value={orderService?.scheduleDate ?? ""}
                                        onChange={(e) => {
                                            const newDate = e.target.value;
                                            setOrderServiceTypes((prev) =>
                                                prev.map((service) =>
                                                    service.orderServiceTypeId === orderService?.orderServiceTypeId
                                                        ? { ...service, scheduleDate: newDate }
                                                        : service
                                                )
                                            );
                                        }}
                                        className="border rounded p-1 w-full"
                                    />
                                </td>
                                <td className="border p-2">
                                    {/* Editable price input field */}
                                    <input
                                        type="number"
                                        value={orderService?.price ?? ""}
                                        onChange={(e) => {
                                            const newPrice = parseFloat(e.target.value);
                                            setOrderServiceTypes((prev) =>
                                                prev.map((service) =>
                                                    service.orderId === order.orderId
                                                        ? { ...service, price: newPrice }
                                                        : service
                                                )
                                            );
                                        }}
                                        className="border rounded p-1 w-full"
                                    />
                                </td>
                                <td className="border p-2">
                                    {/* Make the note editable using input field */}
                                    <input
                                        type="text"
                                        value={order.note}
                                        onChange={(e) => handleFieldChange(order.orderId, "note", e.target.value)}
                                        className="border rounded p-1 w-full"
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <button
                onClick={handleSaveNewOrder}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Save New Order
            </button>


        </div>
    );
}
