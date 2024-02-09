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
          <Route
            path="/userProfile"
            element={<pages.Protected Component={pages.UserProfile} />}
          />
          <Route
            path="/notification"
            element={<pages.Protected Component={pages.Notification} />}
          />
          <Route
            path="/joinedGames"
            element={<pages.Protected Component={pages.JoinedGames} />}
          />
          <Route
            path="/payment-KMCWallet"
            element={<pages.Protected Component={pages.KMCWallet} />}
          />
          <Route
            path="/payment-paymentHistory"
            element={<pages.Protected Component={pages.PaymentHistory} />}
          />
          <Route
            path="/payment-redeemPoints"
            element={<pages.Protected Component={pages.RedeemPoints} />}
          />
          <Route
            path="/needHelp-helpDesk"
            element={<pages.Protected Component={pages.HelpDesk} />}
          />
          <Route
            path="/needHelp-reportBug"
            element={<pages.Protected Component={pages.ReportBug} />}
          />
          <Route path="*" element={<pages.Error />} />
        </Routes>
        <components.Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
