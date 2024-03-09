import React from "react";
import { components } from "../../../components";
import "./Notifications.css";
const Notifications = ({ notificationData }) => {
  if (notificationData) {
    console.log("form ", notificationData);
  }
  return (
    <>
      <div className=" mx-auto w-full max-w-screen-xl p-4 lg:py-8 notification">
        <components.DashboardNavbar />
        <div className="Container">
          <h1 style={{ textAlign: "center", fontSize: "2rem" }}>
            Notification
          </h1>
          {notificationData.map((notification, index) => {
            const originalDate = new Date(notification.notification.date);
            const date = originalDate.toLocaleDateString("en-IN");
            const time = originalDate.toLocaleTimeString("en-IN");
            return (
              <div className="copy-container flex-col" key={index}>
                <p style={{marginRight:"1rem"}}>{notification.notification.message}</p>
                <div className="flex flex-row justify-end">
                <p style={{marginRight:"1rem"}}>{date}</p>
                <p>{time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notifications;
