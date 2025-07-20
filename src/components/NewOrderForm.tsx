// src/components/NewOrderForm.tsx

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  // ✅ Handle Save button click
  const handleSaveOrder = async () => {
    // Show confirmation popup
    const confirm = window.confirm("Are you sure you want to save this order?");
    if (!confirm) return; // user clicked "Cancel"

    // Build the new order object to send to backend
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
        // Optionally clear form fields here if you want
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
      // Reset all fields
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
      <div className="max-w-7xl w-full mb-6 px-4">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-1">🆕 Create New Order</h1>
        <p className="text-gray-600 text-lg">Fill in the details below to create a new order.</p>
      </div>

      <div className="flex flex-wrap gap-10 max-w-7xl w-full justify-center">
        {/* Customer Card */}
        <Card className="w-[420px] shadow-md border border-gray-800 rounded-lg bg-blue-50">
          <CardHeader>
            <h2 className="text-blue-900 text-2xl font-extrabold mb-4">Customer</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-6">
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-blue-700">Customer Name</label>
              <Input
                className="w-full"
                placeholder="Enter customer name"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
              />
            </div>

            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-blue-700">Customer Phone</label>
              <Input
                className="w-full"
                placeholder="Enter phone number"
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
              />
            </div>

            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-blue-700">Customer Email</label>
              <Input
                className="w-full"
                placeholder="Enter email"
                value={customerEmail}
                onChange={e => setCustomerEmail(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Consultant Card */}
        <Card className="w-[420px] shadow-md border border-gray-800 rounded-lg bg-green-50">
          <CardHeader>
            <h2 className="text-green-900 text-2xl font-extrabold mb-4">Consultant</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-6">
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-green-700">Consultant Name</label>
              <Input
                className="w-full"
                placeholder="Enter consultant name"
                value={consultantName}
                onChange={e => setConsultantName(e.target.value)}
              />
            </div>

            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-green-700">Consultant Phone</label>
              <Input
                className="w-full"
                placeholder="Enter phone number"
                value={consultantPhone}
                onChange={e => setConsultantPhone(e.target.value)}
              />
            </div>

            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-green-700">Consultant Email</label>
              <Input
                className="w-full"
                placeholder="Enter email"
                value={consultantEmail}
                onChange={e => setConsultantEmail(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Service Card */}
        <Card className="w-[420px] shadow-md border border-gray-800 rounded-lg bg-purple-50">
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
                <option value="">Select Service</option>
                <option value="1">Moving</option>
                <option value="2">Packing</option>
                <option value="3">Cleaning</option>
                <option value="4">Cleaning Deluxe</option>
              </select>
            </div>

            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-purple-700">From Address</label>
              <Input
                className="w-full"
                placeholder="Enter from address"
                value={fromAddress}
                onChange={e => setFromAddress(e.target.value)}
              />
            </div>

            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-purple-700">To Address</label>
              <Input
                className="w-full"
                placeholder="Enter to address"
                value={toAddress}
                onChange={e => setToAddress(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Price Card */}
        <Card className="w-[420px] shadow-md border border-gray-800 rounded-lg bg-indigo-50">
          <CardHeader>
            <h2 className="text-indigo-900 text-2xl font-extrabold mb-4">Schedule & Price</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-6">
            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-indigo-700">Schedule Date</label>
              <Input
                className="w-full"
                type="date"
                value={scheduleDate}
                onChange={e => setScheduleDate(e.target.value)}
              />
            </div>

            <div className="max-w-[320px] w-full">
              <label className="text-sm font-medium text-indigo-700">Price (NOK)</label>
              <Input
                className="w-full"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Note Card */}
        <Card className="w-[420px] shadow-md border border-gray-800 rounded-lg bg-gray-50">
          <CardHeader>
            <h2 className="text-gray-900 text-2xl font-extrabold mb-4">Note</h2>
          </CardHeader>
          <CardContent className="p-6 max-w-[320px]">
            <Input
              className="w-full"
              placeholder="Enter any notes here (optional)"
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-end gap-4 mt-6 max-w-7xl w-full px-8">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSaveOrder} className="bg-blue-600 hover:bg-blue-700 text-white">
          Save Order
        </Button>
      </div>
    </div>
  );
}
