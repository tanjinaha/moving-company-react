import { useState, useEffect } from "react";

export default function PlaceOrderForm() {
  // State to store the typed customer name in the input box
  const [customerName, setCustomerName] = useState("");

  // State to store the ID of the selected customer from the dropdown
  // Initialized as null (no selection)
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

  // State to store the full list of customers fetched from backend
  const [customers, setCustomers] = useState<{ customerId: number; customerName: string }[]>([]);

  // New state to hold sales consultants list (empty at start)
  const [consultants, setConsultants] = useState<{ consultantId: number; consultantName: string }[]>([]);

  // New state to store which sales consultant is selected (none at start)
  const [selectedConsultantId, setSelectedConsultantId] = useState<number | null>(null);

  // Fetch the customers list once when component loads
  // (Same as before)
  useEffect(() => {
    fetch("http://localhost:8080/customers")
      .then(res => res.json())
      .then(data => {
        setCustomers(data);
        console.log("Customers fetched:", data); // Helpful for debugging
      })
      .catch(err => console.error("Failed to fetch customers", err));
  }, []);

  // This effect runs when either the selected customer or customers list changes
  // It updates the input box to show the name of the selected customer
  // (New addition to keep dropdown and input box in sync)
  useEffect(() => {
    if (selectedCustomerId === null) {
      setCustomerName(""); // Clear input if nothing selected
    } else {
      // Find the customer object by matching selected ID
      const selectedCustomer = customers.find(c => c.customerId === selectedCustomerId);
      if (selectedCustomer) {
        setCustomerName(selectedCustomer.customerName); // Update input box with customer name
      }
    }
  }, [selectedCustomerId, customers]);

  // Fetch the sales consultants list once when component loads
  useEffect(() => {
    fetch("http://localhost:8080/salesconsultants")
      .then(res => res.json())
      .then(data => {
        setConsultants(data);
        console.log("Sales consultants fetched:", data); // Debugging help
      })
      .catch(err => console.error("Failed to fetch sales consultants", err));
  }, []);

  // NEW function added to send the order data to backend when "Place Order" button is clicked
  function handlePlaceOrder() {
    // Prepare the order data payload with selected ID and name
    const orderData = {
      customerId: selectedCustomerId,
      customerName: customerName,
      consultantId: selectedConsultantId,  // <-- ADD THIS LINE
    };

    // Use fetch with POST method to send data as JSON to backend API endpoint /orders
    fetch("http://localhost:8080/orders", {
      method: "POST",                   // POST means create/save new data
      headers: {
        "Content-Type": "application/json",  // Tell backend we send JSON
      },
      body: JSON.stringify(orderData),  // Convert JavaScript object to JSON string
    })
      .then(response => {
        if (response.ok) {
          alert("Order placed successfully!"); // Show success alert
        } else {
          alert("Failed to place order.");     // Show failure alert
        }
      })
      .catch(error => {
        alert("Error placing order: " + error.message);  // Show error alert on network or other failure
      });
  }

  // This is the visible user interface (UI) part of the form
  return (
    // Main container: centers the form and adds padding, white background, rounded corners, and shadow for card effect
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">

      {/* Customer selection dropdown container with margin below */}
      <div className="mb-4">
        {/* Label for customer dropdown, bold text and margin below */}
        <label className="block mb-1 font-semibold">Select Customer:</label>

        {/* Dropdown for selecting a customer */}
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"  // Full width, gray border, padding and rounded corners
          value={selectedCustomerId ?? ""}  // Shows the currently selected customer ID or empty if none
          onChange={(e) => setSelectedCustomerId(Number(e.target.value))}  // When user changes, update selectedCustomerId state
        >
          <option value="">-- Choose a customer --</option> {/* Default empty option */}

          {/* Loop over all customers and create one option per customer */}
          {customers.map((c) => (
            <option key={c.customerId} value={c.customerId}>
              {c.customerName}  {/* Show the customer name in the option */}
            </option>
          ))}
        </select>
      </div>

      {/* Sales consultant selection dropdown container with margin below */}
      <div className="mb-4">
        {/* Label for sales consultant dropdown */}
        <label className="block mb-1 font-semibold">Select Sales Consultant:</label>

        {/* Dropdown for selecting a sales consultant */}
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"  // Same styling as customer dropdown
          value={selectedConsultantId ?? ""}  // Shows the selected consultant ID or empty
          onChange={(e) => setSelectedConsultantId(Number(e.target.value))}  // Update selectedConsultantId state on change
        >
          <option value="">-- Choose a sales consultant --</option>  {/* Default empty option */}

          {/* Loop over all consultants and create options */}
          {consultants.map((c) => (
            <option key={c.consultantId} value={c.consultantId}>
              {c.consultantName}  {/* Show consultant name */}
            </option>
          ))}
        </select>
      </div>

      {/* Input box container with margin below */}
      <div className="mb-4">
        {/* Label for customer name input */}
        <label className="block mb-1 font-semibold">Customer Name:</label>

        {/* Input field for customer name */}
        <input
          type="text"
          placeholder="Enter customer name"
          className="w-full border border-gray-300 rounded px-3 py-2"  // Full width input with border, padding, rounded corners
          value={customerName}  // Current value from state, shows typed or selected name
          onChange={(e) => setCustomerName(e.target.value)}  // Updates customerName state as user types
        />
      </div>

      {/* Button that calls handlePlaceOrder function when clicked */}
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" // Full width blue button with hover effect
      >
        Place Order
      </button>
    </div>
  );

}