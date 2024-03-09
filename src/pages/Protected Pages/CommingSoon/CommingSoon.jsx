import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { components } from "../../../components";
import { images } from "../../../assets";
import styleError from "../../Error/error.module.css";
import "./CommingSoon.css";
const CommingSoon = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState("");
  const location = useLocation();
  const receivedStateData = location.state;
  useEffect(() => {
    if (receivedStateData) {
      setData(receivedStateData);
      setShow(true);
    }
  }, []);
  return (
    <div className="CommingSoon mx-auto w-full max-w-screen-xl p-4 py-1 lg:py-8">
      <components.DashboardNavbar />
      {show ? (
        
          <div className="blog-slider ">
          <img
              src={
                data.images == null
                  ? ""
                  : data.images.length < 10
                  ? images[data.images]
                  : data.images
              }
              alt="Card"
            />
            <div className="content">
              <div className="title">{data.title}</div>
              <div className="text">{data.description}</div>
              <div className="extraDetails">{data.extraDetails}</div>
            </div>
          </div>
        
      ) : (
        <>
          <section className={styleError.errorPage}>
            <div className={styleError.content}>
              <h2 className={styleError.header}>404</h2>
              <h4>Comming soon card not Found !</h4>
              <p>
                Please click on the "Coming Soon" card to read about the
                upcoming events. <br />
                Thank you!
              </p>
              <div className={styleError.btns}>
                <NavLink to="/dashboard">return Dashboard</NavLink>
                <NavLink to="/reportBug">report problem</NavLink>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default CommingSoon;
