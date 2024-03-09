import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../assets";
import "./CommingSoon.css";

const CommingSoon = (props) => {
  const navigate = useNavigate(); 
  const handleReadFull = (e) => {
    e.preventDefault();
    const data = {
      id: props.id,
      title: props.title,
      images: props.images,
      description: props.description,
      extraDetails: props.extraDetails,
    };
    navigate("/comming-soon", { state: data });
  };

  return (
    <li style={{ listStyle: "none" }}>
      <div className="img-card iCard-style1 ">
        <div className="card-content">
          <div className="card-image">
            <span className="card-title">{props.title}</span>
            <img
              src={
                props.images == null
                  ? ""
                  : props.images.length < 10
                  ? images[props.images]
                  : props.images
              }
              alt="Card"
            />
          </div>

          <div className="card-text">
            <p>{props.description}</p>
          </div>
        </div>

        <div className="card-link">
          <Link title="Read Full" onClick={handleReadFull}>
            <span>Read Full</span>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default CommingSoon;
