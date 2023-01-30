import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
// contexts
import { LoadingProvider } from "./utils/context/LoadingContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingProvider>
        <HashRouter>
          <App />
        </HashRouter>
    </LoadingProvider>
  </React.StrictMode>
);
