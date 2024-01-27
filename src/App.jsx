import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { pages } from "./pages";
import { components } from "./components";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <components.Navbar />
        <Routes>
          <Route path="/" element={<pages.Home />} />
          <Route path="/About" element={<pages.About />} />
          <Route path="/Contact" element={<pages.Contact />} />
          <Route path="/TopPlayers" element={<pages.TopPlayers />} />
          <Route path="/login" element={<pages.Login />} />
          <Route path="/registration" element={<pages.Registration />} />
          <Route path="/legal" element={<pages.Legal />} />
          <Route path="/logout" element={<pages.Logout />} />
          <Route path="/OtpVerfication" element={<pages.OtpVerfication />} />
          <Route
            path="/dashboard"
            element={<pages.Protected Component={pages.Dashboard} />}
          />
          <Route path="*" element={<pages.Error />} />
        </Routes>
        <components.Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
