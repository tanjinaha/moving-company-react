import { useState, useEffect } from "react";

// This component shows a form for placing a new order
export default function PlaceOrderForm() {
  // Store the customer name typed in the input box
  const [customerName, setCustomerName] = useState("");
  // Store the ID of the customer selected from the dropdown
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

  // This function updates customerName when you type in the input box
  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCustomerName(event.target.value);
  }

  // Store the list of customers fetched from backend (initially empty)
  const [customers, setCustomers] = useState<{ customerId: number; customerName: string }[]>([]);

  // Fetch the customer list once when the component loads
  useEffect(() => {
    fetch("http://localhost:8080/customers")
      .then(res => res.json())  // Convert response to JSON format
      .then(data => {
        setCustomers(data);      // Save the fetched customers in state
        console.log("Customers fetched:", data); // Log for debugging
      })
      .catch(err => console.error("Failed to fetch customers", err)); // Show error if fetch fails
  }, []); // Empty array means this runs only once on load

  // When you select a customer from dropdown, update the input box to show their name
  useEffect(() => {
    if (selectedCustomerId === null) {
      setCustomerName(""); // Clear input if no customer selected
    } else {
      // Find the selected customer by matching the ID
      const selectedCustomer = customers.find(c => c.customerId === selectedCustomerId);
      if (selectedCustomer) {
        setCustomerName(selectedCustomer.customerName); // Update input with customer name
      }
    }
  }, [selectedCustomerId, customers]); // Runs when selected customer or list changes

  // This is the visual part (UI) the user sees
  return (
    <div>
      <label>
        Select Customer:
        {/* Dropdown to pick a customer */}
        <select
          value={selectedCustomerId ?? ""}               // Shows selected customer or empty
          onChange={(e) => setSelectedCustomerId(Number(e.target.value))} // Update selectedCustomerId when changed
        >
          <option value="">-- Choose a customer --</option>
          {/* Show each customer as an option in dropdown */}
          {customers.map((c) => (
            <option key={c.customerId} value={c.customerId}>
              {c.customerName}
            </option>
          ))}
        </select>
      </label>

      <div>
        <h2>Place a New Order</h2>

        {/* Text input box to type or edit customer name */}
        <input
          type="text"
          placeholder="Enter customer name"
          value={customerName}            // Show current name in input
          onChange={handleNameChange}     // Update name when user types
        />

        {/* Button user clicks to place order */}
        <button onClick={() => {
          // For now, just show selected info in console
          console.log("Selected customer ID:", selectedCustomerId);
          console.log("Typed customer name:", customerName);
        }}>
          Place Order
        </button>

        {/* Show the customer name below the input live */}
        <p>Customer Name: {customerName}</p>
      </div>
    </div>
  );
}