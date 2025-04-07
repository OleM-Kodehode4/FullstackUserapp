import React from "react";
import ReactDOM from "react-dom/client"; // Merk endringen her
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Opprett en root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
