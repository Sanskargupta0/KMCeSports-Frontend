import React from "react";
import "./CommingSoon.css";

const CommingSoon = () => {
  return (
    
      <li>
        <div className="img-card iCard-style1 ">
          <div className="card-content">
            <div className="card-image">
              <span className="card-title">Cloud Beauty</span>
              <img src="https://www.dropbox.com/s/u330jm6faybxrvb/fog-3461451_640.jpg?raw=1" />
            </div>

            <div className="card-text">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Image by{" "}
                <a
                  href="https://pixabay.com/users/Hans-2/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3461451"
                  style={{ color: "#795548" }}
                >
                  Hans Braxmeier
                </a>{" "}
                from{" "}
                <a
                  href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3461451"
                  style={{ color: "#795548" }}
                >
                  Pixabay
                </a>
              </p>
            </div>
          </div>

          <div className="card-link">
            <a href="#" title="Read Full">
              <span>Read Full</span>
            </a>
          </div>
        </div>
      </li>
  );
};

export default CommingSoon;
