import React, { StrictMode } from "react";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
