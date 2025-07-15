// Import React hooks and Shadcn components
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"  // Input box from Shadcn
import { Card, CardContent } from "@/components/ui/card"  // For displaying results nicely
import { Button } from "@/components/ui/button"

// Define the shape of a Customer object (helps TypeScript)
interface Customer {
    customerId: number       // Unique ID of the customer
    customerName: string     // Customer’s name
    customerPhone: number    // Phone number
    customerEmail: string    // Email address
}

// This is the main React component function
export default function CustomerSearch() {
    // State to hold the text typed into the search box
    const [searchName, setSearchName] = useState("")

    // State to hold the results returned from the backend
    const [results, setResults] = useState<Customer[]>([])

    // useEffect runs when the searchName changes (typed)
    useEffect(() => {
        // If user typed more than 1 character, send request to backend
        if (searchName.length > 1) {
            fetch(`http://localhost:8080/customers/search?name=${searchName}`)  // Backend API
                .then((res) => res.json())       // Convert response to JSON
                .then((data) => setResults(data)) // Store results in state
                .catch((error) => console.error("Search error:", error)) // Log any error
        } else {
            setResults([]) // If nothing typed, clear results
        }
    }, [searchName]) // Dependency: runs this code when searchName changes

    // What this component shows on screen

    // This function is called when the "Search" button is clicked
    const handleSearch = () => {
        // Make a request to the backend to find matching customers
        fetch(`http://localhost:8080/customers/search?name=${searchName}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                return response.json();
            })
            .then((data) => setResults(data)) // Store the results in state
            .catch((error) => console.error("Search failed:", error));
    };
    return (
        <div className="p-4 space-y-4"> {/* Adds padding and spacing between elements */}
            <h2 className="text-xl font-bold">🔍 Search Customers by Name</h2>

            {/* ============================ */}
            {/* Input box to type search text */}
            <Input
                placeholder="Type customer name..."               // Light grey text before typing
                value={searchName}                                // Connect input to searchName state
                onChange={(e) => setSearchName(e.target.value)}   // Update searchName as user types
            />

            {/* ============================ */}
            {/* Button row using Shadcn UI components */}
            <div className="flex gap-2"> {/* Places buttons side-by-side with spacing */}

                {/* 🔍 Button: When clicked, it sends request to backend to search by name */}
                <Button onClick={handleSearch}>Search</Button>

                {/* ❌ Button: Clears both the input field and the results */}
                <Button
                    variant="outline"     // Makes it look different (outlined style)
                    onClick={() => {
                        setSearchName("");  // Clear input field
                        setResults([]);     // Remove previous search results
                    }}
                >
                    Clear
                </Button>
            </div>

            {/* ============================ */}
            {/* Loop through search results and show each customer */}
            {results.map((c) => (
                <Card key={c.customerId}> {/* Shadcn Card for nice styling */}
                    <CardContent className="p-4 space-y-1">
                        <p>👤 Name: {c.customerName}</p>
                        <p>📞 Phone: {c.customerPhone}</p>
                        <p>📧 Email: {c.customerEmail}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
