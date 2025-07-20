// src/components/ConsultantListCards.tsx

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

// ✅ 1. Define the correct interface for Consultant
interface Consultant {
  consultantId: number;
  consultantName: string;
  consultantPhone: number;
  consultantEmail: string;
}

// ✅ 2. Main component to display all consultants in card layout
export default function ConsultantListCards() {
  const [consultants, setConsultants] = useState<Consultant[]>([]);

  // ✅ 3. Fetch consultants from the Spring Boot backend
  useEffect(() => {
    fetch("http://localhost:8080/consultants") // ✅ URL must match your @RequestMapping
      .then((response) => response.json())
      .then((data) => setConsultants(data))
      .catch((error) => console.error("Error fetching consultants:", error));
  }, []);

  // ✅ 4. UI rendering
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page title */}
      <h2 className="text-3xl font-bold mb-6 text-center">All Consultants</h2>

      {/* Back link to overview */}
      <Link
        to="/overview"
        className="text-blue-600 underline mb-8 block text-center"
      >
        ← Back to Order Overview
      </Link>

      {/* Consultant cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {consultants.map((consultant) => (
          <Card
            key={consultant.consultantId}
            className="bg-white border border-gray-300 shadow-xl rounded-xl p-6 hover:scale-[1.02] transition-transform"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {consultant.consultantName}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                ID: {consultant.consultantId}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2 pt-2">
              <p className="text-base">📞 Phone: {consultant.consultantPhone}</p>
              <p className="text-base">📧 Email: {consultant.consultantEmail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
