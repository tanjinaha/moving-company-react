// src/components/ConsultantListCards.tsx

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Shadcn UI Card components

import { Link } from "react-router-dom";

// 1. Define the structure of each consultant object
interface SalesConsultant {
  consultantId: number;
  consultantName: string;
  consultantPhone: number;
  consultantEmail: string;
}

// 2. This component shows all consultants in styled cards
export default function ConsultantListCards() {
  const [consultants, setConsultants] = useState<SalesConsultant[]>([]); // Store consultants

  // 3. Fetch consultants from backend when component loads
  useEffect(() => {
    fetch("http://localhost:8080/salesconsultants")
      .then((r) => r.json())
      .then((data) => setConsultants(data));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page heading */}
      <h2 className="text-3xl font-bold mb-6 text-center">All Consultants</h2>

      {/* Link to return to Order Overview page */}
      <Link
        to="/overview"
        className="text-blue-600 underline mb-8 block text-center"
      >
        ← Back to Order Overview
      </Link>

      {/* Grid of cards, responsive: 1 column on small, 2 on medium, 3 on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {consultants.map((c) => (
          <Card
            key={c.consultantId}
            className="bg-white border border-gray-300 shadow-xl rounded-xl p-6 hover:scale-[1.02] transition-transform"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {c.consultantName}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                ID: {c.consultantId}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2 pt-2">
              <p className="text-base">📞 Phone: {c.consultantPhone}</p>
              <p className="text-base">📧 Email: {c.consultantEmail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
