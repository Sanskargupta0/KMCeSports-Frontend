import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import { pages } from "./pages";
import { components } from "./components";
import { useAuth } from "./store/auth";
import config from "./config";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const { islogedIn, userdata } = useAuth();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    console.log("islogedIn", islogedIn);
    if (islogedIn) {
      const socket = io(`${config.backendUrl}`, { transports: ["websocket"] });

      // on connect emit join event with user data
      socket.on("connect", () => {
        console.log("Connected to server", socket.id);
        console.log("userData", userdata);
        socket.emit("join", { id: userdata.id, userName: userdata.userName });
      });
      // on initial notification fetch
      socket.on("initialNotifications", (initialNotifications) => {
        console.log("Initial notifications received:", initialNotifications);
        setNotifications(initialNotifications);
      });
      // on global notification
      // socket.on("notification", (notification) => {
      //   console.log("Notification received:", notification);
      //   setNotifications((prevNotifications) => [
      //     notification,
      //     ...prevNotifications,
      //   ]);
      // });
  

      // on disconnect
      return () => {
        socket.disconnect();
      };
    }
  }, [userdata]);

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
            element={
              <pages.Protected
                Component={pages.Notification}
                notificationData={notifications}
              />
            }
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
            path="/helpDesk"
            element={<pages.Protected Component={pages.HelpDesk} />}
          />
          <Route
            path="/reportBug"
            element={<pages.Protected Component={pages.ReportBug} />}
          />
          <Route
            path="/comming-soon"
            element={<pages.Protected Component={pages.CommingSoon} />}
          />
          <Route
            path="/game-registration"
            element={<pages.Protected Component={pages.GameRegistration} />}
          />
          <Route path="*" element={<pages.Error />} />
        </Routes>
        <components.Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
