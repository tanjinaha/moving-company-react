import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import OrderList from "./components/OrderList";
import OrderDetailsList from "./components/OrderDetailsList";
import SalesConsultantList from "./components/SalesConsultantList";
import ServiceTypeList from "./components/ServiceTypeList";
import PlaceOrderForm from "./components/PlaceOrderForm";
import OrderOverviewPage from "./components/OrderOverviewPage";

// This is your Home page with links to all main sections
function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Moving Company App</h1>
      <nav className="space-y-4">
        <Link to="/customers" className="block text-blue-600 underline">Customers</Link>
        <Link to="/orders" className="block text-blue-600 underline">Orders</Link>
        <Link to="/orders/details" className="block text-blue-600 underline">Order Details</Link>
        <Link to="/sales-consultants" className="block text-blue-600 underline">Sales Consultants</Link>
        <Link to="/service-types" className="block text-blue-600 underline">Service Types</Link>
        <Link to="/place-order" className="block text-blue-600 underline">Place Order</Link>
        <Link to="/overview" className="block text-blue-600 underline">Order Overview</Link>
      </nav>
    </div>
  );
}

// Define all routes and pages in one place
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/details" element={<OrderDetailsList />} />
        <Route path="/sales-consultants" element={<SalesConsultantList />} />
        <Route path="/service-types" element={<ServiceTypeList />} />
        <Route path="/place-order" element={<PlaceOrderForm />} />
        <Route path="/overview" element={<OrderOverviewPage />} />
      </Routes>
    </Router>
  );
}