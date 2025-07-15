// This file defines a React component that shows all customers in a nice card format

import { useEffect, useState } from "react"; // React hooks to load and store customer data
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Shadcn card components
import { Link } from "react-router-dom"; // Used to link back to another page

// This defines what a customer looks like — based on your backend structure
interface Customer {
  customerId: number;
  customerName: string;
  customerPhone: number;
  customerEmail: string;
}

// This is the main component that will show all customers in a card layout
export default function CustomerListCards() {
  // State to store the list of customers
  const [customers, setCustomers] = useState<Customer[]>([]);

  // This code runs once when the page loads — it fetches customer data from your backend
  useEffect(() => {
    fetch("http://localhost:8080/customers")
      .then(r => r.json())         // Convert response to JSON
      .then(data => setCustomers(data));  // Save the data into state
  }, []);

  // This is what the component shows on the screen (JSX)
  return (
    <div className="p-6">
      {/* Page heading */}
      <h2 className="text-2xl font-bold mb-4">Customer Details</h2>

      {/* A link to go back to the Order Overview page */}
      <Link to="/overview" className="text-blue-600 underline mb-4 block">← Back to Orders</Link>

      {/* Display all customers using cards in a grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map(customer => (
          <Card key={customer.customerId} className="p-4 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>{customer.customerName}</CardTitle>
              <CardDescription>ID: {customer.customerId}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>📞 Phone: {customer.customerPhone}</p>
              <p>📧 Email: {customer.customerEmail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
