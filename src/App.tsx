import { useState, useEffect } from "react";
import OrderList from "./components/OrderList"; // Adjust path if needed
import CustomerList from "./components/CustomerList"; 
import SalesConsultantList from "./components/SalesConsultantList";
import ServiceTypeList from "./components/ServiceTypeList";

// Import React Router components to manage navigation and routes
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Home component serves as the landing page with navigation links
function Home() {
  return (
    <div className="p-8">
      {/* Main heading for the app */}
      <h1 className="text-3xl font-bold mb-6">Welcome to Moving Company App</h1>
      {/* Navigation links styled with Tailwind CSS */}
      <nav className="space-y-4">
        {/* 
          Link component creates a client-side navigation link.
          It prevents full page reloads and changes URL using HTML5 history API.
        */}
        <Link to="/customers" className="block text-blue-600 underline">Customers</Link>
        <Link to="/orders" className="block text-blue-600 underline">Orders</Link>
        <Link to="/sales-consultants" className="block text-blue-600 underline">Sales Consultants</Link>
        <Link to="/service-types" className="block text-blue-600 underline">Service Types</Link>
      </nav>
    </div>
  );
}

// Placeholder components for other pages — to be replaced with real components later
function Customers() {
  return <CustomerList/>;
}
function Orders() {
  return <OrderList/>;
}
function SalesConsultants() {
  return <SalesConsultantList/>;
}
function ServiceTypes() {
  return <ServiceTypeList/>;
}

// Main App component wraps everything inside Router for routing to work
export default function App() {
  return (
    // Router enables client-side routing in React app
    <Router>
      {/* Routes component defines all route paths and corresponding components */}
      <Routes>
        {/* Route for Home page */}
        <Route path="/" element={<Home />} />
        {/* Route for Customers page */}
        <Route path="/customers" element={<Customers />} />
        {/* Route for Orders page */}
        <Route path="/orders" element={<Orders />} />
        {/* Route for Sales Consultants page */}
        <Route path="/sales-consultants" element={<SalesConsultants />} />
        {/* Route for Service Types page */}
        <Route path="/service-types" element={<ServiceTypes />} />
      </Routes>
    </Router>
  );
}