import { useState } from "react";

// This component allows a sales consultant to enter a customer's name to place an order
export default function PlaceOrderForm() {
  // useState hook creates a state variable 'customerName' with an empty string as initial value
  // 'setCustomerName' is the function we use to update the value of 'customerName'
  const [customerName, setCustomerName] = useState("");

  // This function runs whenever the input changes, it updates the state with the new value
  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCustomerName(event.target.value);
  }

  // For now, we just show the input and the current value below it
  return (
    <div>
      <h2>Place a New Order</h2>

      {/* Input field for customer name */}
      <input
        type="text"
        placeholder="Enter customer name"
        value={customerName} // the current value from state
        onChange={handleNameChange} // update state on user typing
      />

      {/* Show the current customer name live */}
      <p>Customer Name: {customerName}</p>
    </div>
  );
}