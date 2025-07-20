// src/components/ConsultantList.tsx
import { useEffect, useState } from "react";

// Define the structure of a Consultant object
interface Consultant {
  consultantId: number;
  consultantName: string;
  consultantPhone: number;
  consultantEmail: string;
}

export default function ConsultantList() {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data when component loads
  useEffect(() => {
    fetch("http://localhost:8080/consultants") // ✅ URL is case-sensitive!
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch consultants");
        return response.json();
      })
      .then((data) => {
        setConsultants(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading consultants...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold my-4">Consultant List</h2>
      <ul className="list-disc list-inside space-y-2">
        {consultants.map((c) => (
          <li key={c.consultantId}>
            {c.consultantName} - {c.consultantPhone} - {c.consultantEmail}
          </li>
        ))}
      </ul>
    </div>
  );
}
