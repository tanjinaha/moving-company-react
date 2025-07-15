// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";

// We import the App component where all routing logic lives
import App from "./App";
import './index.css';  // This connects Tailwind to your app

// This renders the React app into the root <div> in index.html
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App /> {/* This is the entry point to the entire application */}
  </React.StrictMode>
);