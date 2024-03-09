import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Authprovider } from "./store/auth.jsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Authprovider>
    <App />
    <ToastContainer
    autoClose={2000}
     />
  </Authprovider>
);
