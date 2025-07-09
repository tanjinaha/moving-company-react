import { useEffect, useState } from "react";

// Define the shape of a SalesConsultant object for TypeScript
interface SalesConsultant {
  consultantId: number;
  consultantName: string;
  consultantPhone: number;
  consultantEmail: string;
}

export default function SalesConsultantList() {
  // State to hold the list of sales consultants, starting empty
  const [consultants, setConsultants] = useState<SalesConsultant[]>([]);
  // State for loading indicator (are we fetching data?)
  const [loading, setLoading] = useState(true);
  // State for error message, if fetch fails
  const [error, setError] = useState<string | null>(null);

  // This useEffect runs once when component first loads (mount)
  useEffect(() => {
    // Fetch data from your backend API
    fetch("http://localhost:8080/salesconsultants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch sales consultants");
        }
        return response.json();
      })
      .then((data: SalesConsultant[]) => {
        setConsultants(data);  // Save data to state
        setLoading(false);     // Stop loading
      })
      .catch((error) => {
        setError(error.message); // Save error message
        setLoading(false);       // Stop loading
      });
  }, []);

  // Show loading message while data is being fetched
  if (loading) return <div>Loading sales consultants...</div>;

  // Show error message if there was a problem
  if (error) return <div>Error: {error}</div>;

  // Show the list of sales consultants when data is ready
  return (
    <div>
      <h2>Sales Consultant List</h2>
      <ul>
        {consultants.map((c) => (
          <li key={c.consultantId}>
            {c.consultantName} - {c.consultantPhone} - {c.consultantEmail}
          </li>
        ))}
      </ul>
    </div>
  );
}