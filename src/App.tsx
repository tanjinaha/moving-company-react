import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import all your components
import CustomerList from "./components/CustomerList";
import OrderList from "./components/OrderList";
import OrderDetailsList from "./components/OrderDetailsList";
import ServiceTypeList from "./components/ServiceTypeList";
import PlaceOrderForm from "./components/PlaceOrderForm";
import OrderOverviewPage from "./components/OrderOverviewPage";
import CustomerSearch from "./components/CustomerSearch";
import NewOrderForm from "./components/NewOrderForm";
import CustomerListCards from "./components/CustomerListCards";
import ConsultantList from "./components/ConsultantList";
import ConsultantListCards from "./components/ConsultantListCards";
import CompleteOrderList from "./components/CompleteOrderList"; // ✅ FIXED: Keep only this one

// ✅ Home page with links to all sections
function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Moving Company App</h1>
      <nav className="space-y-4">
        <Link to="/customers" className="block text-blue-600 underline">Customers (List View)</Link>
        <Link to="/customers/cards" className="block text-blue-600 underline">Customers (Card View)</Link>

        <Link to="/consultants" className="block text-blue-600 underline">Consultants (List View)</Link>
        <Link to="/consultants/cards" className="block text-blue-600 underline">Consultants (Card View)</Link>

        <Link to="/orders/details" className="block text-blue-600 underline">Order Details</Link>
        <Link to="/orders/complete" className="block text-blue-600 underline">✅ Complete Orders (Read-Only)</Link> {/* ✅ FIXED HERE */}

        <Link to="/service-types" className="block text-blue-600 underline">Service Types</Link>
        <Link to="/new-order" className="block text-blue-600 underline">Create New Order</Link>
        <Link to="/overview" className="block text-blue-600 underline">Order Overview</Link>
      </nav>
    </div>
  );
}

// ✅ Main app with all routes
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/cards" element={<CustomerListCards />} />
        <Route path="/consultants" element={<ConsultantList />} />
        <Route path="/consultants/cards" element={<ConsultantListCards />} />
        <Route path="/orders/details" element={<OrderDetailsList />} />
        <Route path="/orders/complete" element={<CompleteOrderList />} /> {/* ✅ FIXED: Keep only 1 route */}
        <Route path="/service-types" element={<ServiceTypeList />} />
        <Route path="/new-order" element={<NewOrderForm />} />
        <Route path="/place-order" element={<PlaceOrderForm />} />
        <Route path="/overview" element={<OrderOverviewPage />} />
        <Route path="/search-customers" element={<CustomerSearch />} />
      </Routes>
    </Router>
  );
}
