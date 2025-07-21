// src/components/NewOrderForm.tsx

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default function NewOrderForm() {
  // 🧾 Form input states
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [consultantName, setConsultantName] = useState("");
  const [consultantPhone, setConsultantPhone] = useState("");
  const [consultantEmail, setConsultantEmail] = useState("");
  const [serviceId, setserviceId] = useState<number | null>(null);
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");

  // ✅ List of all customers for popup suggestions
  const [allCustomers, setAllCustomers] = useState<
    { customerId: number; customerName: string; customerPhone: string; customerEmail: string }[]
  >([]);


  // ✅ Load customer list when form loads
  useEffect(() => {
    fetch("http://localhost:8080/customers")
      .then((res) => res.json())
      .then((data) => setAllCustomers(data))
      .catch((err) => console.error("Failed to load customers", err));
  }, []);

  // ✅ Handle Save button click
  const handleSaveOrder = async () => {
    const confirm = window.confirm("Are you sure you want to save this order?");
    if (!confirm) return;

    const newOrder = {
      customerName,
      customerPhone,
      customerEmail,
      consultantName,
      consultantPhone,
      consultantEmail,
      serviceId,
      fromAddress,
      toAddress,
      scheduleDate,
      price,
      note,
    };

    try {
      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        alert("✅ Order saved successfully!");
      } else {
        const error = await response.text();
        alert("❌ Failed to save order: " + error);
      }
    } catch (err) {
      alert("⚠️ Error: " + err);
    }
  };

  // ❌ Handle Cancel button click
  const handleCancel = () => {
    const confirm = window.confirm("Are you sure you want to cancel? All inputs will be lost.");
    if (confirm) {
      setCustomerName("");
      setCustomerPhone("");
      setCustomerEmail("");
      setConsultantName("");
      setConsultantPhone("");
      setConsultantEmail("");
      setserviceId(null);
      setFromAddress("");
      setToAddress("");
      setScheduleDate("");
      setPrice("");
      setNote("");
      alert("❌ Order canceled. All fields cleared.");
    }
  };

  return (


    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <div className="bg-blue-100 text-center text-lg text-blue-800 p-4 rounded">
        ✅ Tailwind class applied!
      </div>


      <div className="max-w-7xl w-full mb-6 px-4">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-1">🆕 Create New Order</h1>
        <p className="text-gray-600 text-lg">Fill in the details below to create a new order.</p>
      </div>

      {/* ✅ Responsive Cards Container */}
      <div className="flex flex-wrap justify-center gap-6 max-w-7xl w-full">

        {/* ✅ Customer Card with popup suggestions */}
        <Card className="w-full sm:w-[48%] lg:w-[30%] shadow-md border border-gray-800 rounded-lg bg-blue-50">
          <CardHeader>
            <h2 className="text-blue-900 text-2xl font-extrabold mb-4">Customer</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-6">

            {/* Customer Name input with live suggestions */}
            <div className="relative max-w-[320px] w-full">
              <label className="text-sm font-medium text-blue-700">Customer Name</label>
              <Input
                className="w-full"
                placeholder="Type or select customer"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              {customerName && (
                <Card className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto bg-blue-100 border border-blue-400 shadow-md">
                  <CardContent className="p-2">
                    {allCustomers
                      .filter((cust) =>
                        cust.customerName.toLowerCase().includes(customerName.toLowerCase())
                      )
                      .map((cust) => (
                        <div
                          key={cust.customerId}
                          className="px-4 py-2 text-black hover:bg-blue-200 cursor-pointer"
                          onClick={() => {
                            setCustomerName(cust.customerName);
                            setCustomerPhone(cust.customerPhone);
                            setCustomerEmail(cust.customerEmail);
                          }}
                        >
                          {cust.customerName}
                        </div>
                      ))}
                  </CardContent>
                </Card>
              )}


            </div>

            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-blue-700">Customer Phone</label>
              <Input className="w-full" placeholder="Enter phone number" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} />
            </div>
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-blue-700">Customer Email</label>
              <Input className="w-full" placeholder="Enter email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* 🧑‍💼 Consultant Card */}
        <Card className="w-full sm:w-[48%] lg:w-[30%] shadow-md border border-gray-800 rounded-lg bg-green-50">
          <CardHeader>
            <h2 className="text-green-900 text-2xl font-extrabold mb-4">Consultant</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-6">
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-green-700">Consultant Name</label>
              <Input className="w-full" placeholder="Enter consultant name" value={consultantName} onChange={e => setConsultantName(e.target.value)} />
            </div>
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-green-700">Consultant Phone</label>
              <Input className="w-full" placeholder="Enter phone number" value={consultantPhone} onChange={e => setConsultantPhone(e.target.value)} />
            </div>
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-green-700">Consultant Email</label>
              <Input className="w-full" placeholder="Enter email" value={consultantEmail} onChange={e => setConsultantEmail(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Service Card */}
        <Card className="w-full sm:w-[48%] lg:w-[30%] shadow-md border border-gray-800 rounded-lg bg-purple-50">
          <CardHeader>
            <h2 className="text-purple-900 text-2xl font-extrabold mb-4">Service Info</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-6">
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-purple-700">Service Type</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={serviceId ?? ""}
                onChange={e => setserviceId(Number(e.target.value))}
              >
                <option value="">SELECT SERVICE</option>
                <option value="1">MOVING</option>
                <option value="2">PACKING</option>
                <option value="3">CLEANING</option>
                <option value="4">CLEANING DELUXE</option>
              </select>
            </div>
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-purple-700">From Address</label>
              <Input className="w-full" placeholder="Enter from address" value={fromAddress} onChange={e => setFromAddress(e.target.value)} />
            </div>
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-purple-700">To Address</label>
              <Input className="w-full" placeholder="Enter to address" value={toAddress} onChange={e => setToAddress(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Price */}
        <Card className="w-full sm:w-[48%] lg:w-[30%] shadow-md border border-gray-800 rounded-lg bg-indigo-50">
          <CardHeader>
            <h2 className="text-indigo-900 text-2xl font-extrabold mb-4">Schedule & Price</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-6">
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-indigo-700">Schedule Date</label>
              <Input className="w-full" type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} />
            </div>
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-indigo-700">Price (NOK)</label>
              <Input className="w-full" type="number" placeholder="Enter price" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Note */}
        <Card className="w-full sm:w-[48%] lg:w-[30%] shadow-md border border-gray-800 rounded-lg bg-gray-50">
          <CardHeader>
            <h2 className="text-gray-900 text-2xl font-extrabold mb-4">Note</h2>
          </CardHeader>
          <CardContent className="p-6 max-w-[320px]">
            <Input className="w-full" placeholder="Enter any notes here (optional)" value={note} onChange={e => setNote(e.target.value)} />
          </CardContent>
        </Card>
      </div>

      {/* Save + Cancel Buttons */}
      <div className="flex justify-end gap-4 mt-6 max-w-7xl w-full px-8">
        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSaveOrder} className="bg-blue-600 hover:bg-blue-700 text-white">Save Order</Button>
      </div>
    </div>
  );
}
