import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DashboardNavbar.less";

const DashboardNavbar = () => {
  const [isClosed, setIsClosed] = useState(false);
  const [count, setCount] = useState(0);
  const [groupNumber, setGroupNumber] = useState(0);
  const [els, setEls] = useState([]);
  const [grouplength, setGroupLength] = useState(0);

  useEffect(() => {
    const $els = document.querySelectorAll(".menu a, .menu header");
    const count = $els.length;
    const grouplength = Math.ceil(count / 3);
    const groupNumber = 0;
    let i = 1;

    setCount(count);
    setEls($els);
    setGroupLength(grouplength);

    $els.forEach((el, j) => {
      if (i > grouplength) {
        setGroupNumber((prevGroupNumber) => prevGroupNumber + 1);
        i = 3;
      }
      el.setAttribute("data-group", groupNumber);
      i++;
    });
    setTimeout(() => {
      let buttom = document.querySelector(".dashboardNavbar button");
      buttom.click();
    }, 500);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    let count = 0;
    els.forEach((el, j) => {
      let topValue = 0;
      if (count === 0) {
        topValue = "-16px";
      } else if (count === 1) {
        topValue = "45px";
      } else if (count === 2) {
        topValue = "77px";
      } else {
        topValue = "1000px";
      }
      el.style.setProperty("--top", topValue);
      el.style.setProperty("--delay-in", j * 0.1 + "s");
      el.style.setProperty("--delay-out", (count - j) * 0.1 + "s");
      count++;
    });

    setIsClosed((prevIsClosed) => !prevIsClosed);
    e.stopPropagation();
  };

  

  return (
    <div className="dashboardNavbar">
      <nav className={`menu ${isClosed ? "closed" : ""}`}>
        <header>
          Menu <span>×</span>
        </header>
        <ol>
          <li className="menu-item">
            <Link to="/joinedGames">Joined Games</Link>
          </li>
          <li className="menu-item">
            <Link to="/bookmarkEvent">Bookmark event</Link>
          </li>
          <li className="menu-item">
            <Link to="" style={{ cursor: "default" }}>
              Payment
            </Link>
            <ol className="sub-menu">
              <li className="menu-item">
                <Link to="/payment-KMCWallet">KMC Wallet</Link>
              </li>
              <li className="menu-item">
                <Link to="/payment-paymentHistory">Payment History</Link>
              </li>
              <li className="menu-item">
                <Link to="/payment-redeemPoints">Redeem Point</Link>
              </li>
            </ol>
          </li>
          <li className="menu-item">
            <Link to="" style={{ cursor: "default" }}>
              Need help ?
            </Link>
            <ol className="sub-menu">
              <li className="menu-item">
                <Link to="/needHelp-helpDesk">Help desk </Link>
              </li>
              <li className="menu-item">
                <Link to="/Contact">Contact Us</Link>
              </li>
              <li className="menu-item">
                <Link to="/needHelp-reportBug">Report a Bug!</Link>
              </li>
            </ol>
          </li>
          <li className="menu-item">
            <Link to="/logout">Sign Out</Link>
          </li>
        </ol>
        <footer>
          <button aria-label="Toggle Menu" onClick={handleClick}>
            Toggle
          </button>
        </footer>
      </nav>
    </div>
  );
};

export default DashboardNavbar;
