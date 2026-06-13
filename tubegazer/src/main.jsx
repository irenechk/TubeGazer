import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ChannelProvider } from "./context/ChannelProvider";
import { AuthProvider } from "./context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChannelProvider>
          <App />
        </ChannelProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);