import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
// contexts
import { LoadingProvider } from "./utils/context/LoadingContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </LoadingProvider>
  </React.StrictMode>
);
