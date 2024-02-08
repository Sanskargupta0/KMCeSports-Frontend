import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../assets";
import "./CommingSoon.css";

const CommingSoon = (props) => {
  return (
    <li style={{ listStyle: "none" }}>
      <div className="img-card iCard-style1 ">
        <div className="card-content">
          <div className="card-image">
            <span className="card-title">{props.title}</span>
            <img src={images[props.images]} />
          </div>

          <div className="card-text">
            <p>{props.description}</p>
          </div>
        </div>

        <div className="card-link">
          <Link to={props.link} title="Read Full">
            <span>Read Full</span>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default CommingSoon;
