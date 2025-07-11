import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import components with exact file names
import CustomerList from "./components/CustomerList";
import OrderList from "./components/OrderList";
import OrderDetailsList from "./components/OrderDetailsList";
import SalesConsultantList from "./components/SalesConsultantList";
import ServiceTypeList from "./components/ServiceTypeList";
import PlaceOrderForm from "./components/PlaceOrderForm";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrderList />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/details" element={<OrderDetailsList />} />
        <Route path="/consultants" element={<SalesConsultantList />} />
        <Route path="/services" element={<ServiceTypeList />} />
        <Route path="/place-order" element={<PlaceOrderForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);