// We import two React hooks:
// - useState to store and update data in the component (like variables that cause the UI to refresh when changed)
// - useEffect to run some code (like fetching data) when the component first loads
import { useEffect, useState } from "react";

// This defines what a Customer object looks like (this helps TypeScript check for mistakes)
// It has four properties: id, name, phone, and email with their expected types
interface Customer {
    customerId: number;
    customerName: string;
    customerPhone: number;
    customerEmail: string;
}

// This is the main React component called CustomerList
// It is a function that returns some HTML (JSX) to display a list of customers
export default function CustomerList() {
    // We create a "state variable" called 'customers' to store the list of customers
    // Initially, it starts as an empty array []
    const [customers, setCustomers] = useState<Customer[]>([]);

    // This state is true when data is being loaded from the backend, and false after loading completes
    const [loading, setLoading] = useState(true);

    // This state will hold any error message if fetching data fails. It starts as null (no error)
    const [error, setError] = useState<string | null>(null);

    // useEffect runs once when the component first appears on the page
    // It fetches the customer data from the backend API URL
    useEffect(() => {
        // Fetch data from backend API running at localhost:8080, path "/customers"
        fetch("http://localhost:8080/customers")
            .then((response) => {
                // Check if the response was successful (status 200-299)
                if (!response.ok) {
                    // If not successful, throw an error that will be caught below
                    throw new Error("Failed to fetch customers");
                }
                // If successful, convert the response data to JSON (JavaScript Object Notation)
                return response.json();
            })
            // Once the JSON data arrives, this runs with the 'data' variable holding the customer array
            .then((data: Customer[]) => {
                // Save the fetched customer data in the 'customers' state
                setCustomers(data);
                // Mark loading as finished
                setLoading(false);
            })
            // If there was any error in fetching or processing the data, this runs
            .catch((error) => {
                // Save the error message so we can show it to the user
                setError(error.message);
                // Mark loading as finished even though it failed
                setLoading(false);
            });
    }, []);  // Empty dependency array means this runs only once after the first render

    // While data is loading, show a simple message
    if (loading) return <div>Loading customers...</div>;

    // If there was an error, show the error message
    if (error) return <div>Error: {error}</div>;

    // If we reach here, it means data is loaded successfully, so display the list of customers
    return (
        <div>
            <h2>Customer List</h2>
            <ul>
                {/* Loop over the customers array and display each one as a list item */}
                {/*c is just a placeholder name for each customer object in the array.*/}
                {/*You can rename c to anything, like customer, and it will still work the same.*/}
                {customers.map((c) => (
                    // Use customerId as a unique key for React to track items efficiently
                    <li key={c.customerId}>
                        {/* Show the customer name, phone, and email separated by dashes */}
                        {c.customerName} - {c.customerPhone} - {c.customerEmail}
                    </li>
                ))}
            </ul>
        </div>
    );
}