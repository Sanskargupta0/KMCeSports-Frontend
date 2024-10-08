import React, { useEffect, useState } from "react";
import { useLocation, NavLink, Link } from "react-router-dom";
import { components } from "../../../components";
import { images } from "../../../assets";
import styleError from "../../Error/error.module.css";
import "../CommingSoon/CommingSoon.css";
import "./Registration.css";
import { toast } from "react-toastify";
import config from "../../../config";
import { useAuth } from "../../../store/auth";
import { useNavigate } from "react-router-dom";
const Registration = () => {
  const navigate = useNavigate();
  const { userdata } = useAuth();
  const [show, setShow] = useState(false);
  const [data, setData] = useState("");
  const [form, setform] = useState(false);
  const [detailsConformation, setDetailsConformation] = useState(false);
  const [formData, setFormData] = useState({});
  const [numberOfJoinedPlayer, setNumberOfJoinedPlayer] = useState(0);
  const location = useLocation();
  const receivedStateData = location.state;
  const check = () => {
    for (let item in formData) {
      if (formData[item] === "") {
        toast.error("Please fill all the fields",({
          position: "top-center",
        }));
        return false;
      }
    }
    return true;
  };
  useEffect(() => {
    if (receivedStateData) {
      setData(receivedStateData);
      setShow(true);
      for (let i = 0; i < receivedStateData.form.length; i++) {
        setFormData((prev) => {
          return { ...prev, [receivedStateData.form[i]]: "" };
        });
      }
    }
  }, []);
  let dateStringFromForm = ""; // "2021-02-01T00:00:00"
  if (receivedStateData) {
    dateStringFromForm = receivedStateData.startTime;
  }
  const originalDate = new Date(dateStringFromForm);
  const date = originalDate.toLocaleDateString("en-IN");
  const time = originalDate.toLocaleTimeString("en-IN");
  const modifiedDate = new Date(originalDate.getTime() - 60 * 60 * 1000);
  // Format the modified date as a string
  const [timerEnded, setTimerEnded] = useState(false);

  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = modifiedDate;

    const difference = targetDate.getTime() - now.getTime();
    const isTimeUp = difference <= 0;

    if (isTimeUp) {
      console.log("Time has ended!");
      setTimerEnded(true);
      return {
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      hours: padZero(hours),
      minutes: padZero(minutes),
      seconds: padZero(seconds),
    };
  };

  const padZero = (value) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    if (timerEnded) {
      console.log("Timer has ended. No more re-renders!");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timerEnded]);

  const handlecheckout = async () => {
    console.log("running");
    const response = await toast.promise( fetch(`${config.backendUrl}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
      body: JSON.stringify({
        gameId: data.id,
        price: data.price,
        userId: userdata.id,
      }),
    }),
    {
      pending: 'Creating payment Id',
      success: 'Payment Id created 🎉',
      error: 'Error in creating payment Id 😢',
    }
);

    const checkoutData = await response.json();
    console.log(checkoutData);
     if(checkoutData.success === false){
      toast.warning(checkoutData.msg, {
        position: "top-center",
      });
      navigate("/dashboard");
     }
     else{
    const options = {
      key: checkoutData.key,
      amount: checkoutData.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "KMCeSports",
      description: "Payment for Game Registration",
      image: images.KMCeSportsLogo,
      order_id: checkoutData.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        console.log("running");
        const paymentverification = await fetch(
          `${config.backendUrl}/paymentVerification`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              userId: userdata.id,
              gameId: data.id,
              formData,
            }),
          }
        );
        console.log(formData);
        const paymentverificationData = await paymentverification.json();
        if (paymentverificationData.success === true) {
          toast.success("You joined the Tournament successfully", {
            position: "top-center",
          });
          navigate("/dashboard");
        } else {
          toast.error(paymentverificationData.msg, {
            position: "top-center",
          });
        }
      },
      prefill: {
        name: userdata.firstName,
        email: userdata.email,
        contact: userdata.phone,
      },
      notes: {
        address: "KMCeSports Lucknow Uttar Pradesh Office",
      },
      theme: {
        color: "#1F2937",
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", function (response) {
      toast.error(response.error.description);
    });
    razorpay.open();
  }
  };

  const checkCurrentSpaceLeft = ()=>{
    console.log("running")
    if(data.numberofPlayers- numberOfJoinedPlayer > 0){
      return true;
    }
    else{
      return false;
    }
  }

  return (
    <div className="CommingSoon Registration mx-auto w-full max-w-screen-xl p-4 py-1 lg:py-8">
      <components.DashboardNavbar />
      {show ? (
        <>
          {form ? (
            detailsConformation ? (
              <div className="blog-slider flex-col justify-center align-center">
                <div className="text-2xl font-bold">Confirm your details </div>

                {Object.keys(formData).map((item, index) => (
                  <div key={index}>
                    <span className="text-xl font-semibold">{item} :</span>
                    <span> {formData[item]}</span>
                  </div>
                ))}
                <div>
                  <span className="text-xl font-semibold">Fees :</span>
                  <span> {data.price}₹</span>
                </div>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    handlecheckout();
                  }}
                >
                  <div className="container">
                    <div className="left-side">
                      <div className="card">
                        <div className="card-line"></div>
                        <div className="buttons"></div>
                      </div>
                      <div className="post">
                        <div className="post-line"></div>
                        <div className="screen">
                          <div className="dollar">₹</div>
                        </div>
                        <div className="numbers"></div>
                        <div className="numbers-line2"></div>
                      </div>
                    </div>
                    <div className="right-side">
                      <div className="new">Checkout</div>
                    </div>
                  </div>
                </Link>
                <span className="backk">
                  <span className="buttonbck">
                    <button
                      className="button"
                      onClick={(e) => {
                        setDetailsConformation(false);
                      }}
                    >
                      <div className="button-box">
                        <span className="button-elem">
                          <svg viewBox="0 0 46 40">
                            <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                          </svg>
                        </span>
                        <span className="button-elem">
                          <svg viewBox="0 0 46 40">
                            <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                          </svg>
                        </span>
                      </div>
                    </button>
                  </span>
                </span>
              </div>
            ) : (
              <div className="flex justify-center m-8">
                <div className="form">
                  <div className="subtitle">
                    Fill the Game Registration Form!
                  </div>
                  {data.form.map((item, index) => (
                    <div key={index} className="input-container ic1">
                      <input
                        id={item}
                        className="input"
                        type="text"
                        name={item}
                        value={formData[item]}
                        placeholder=""
                        onChange={(e) => {
                          setFormData({ ...formData, [item]: e.target.value });
                        }}
                      />
                      <div className="cut"></div>
                      <label htmlFor={item} className="placeholder">
                        {item}
                      </label>
                    </div>
                  ))}

                  <button
                    type="text"
                    className="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      if (check()) {
                        setDetailsConformation(true);
                      }
                    }}
                  >
                    submit
                  </button>
                  <div className="delete">
                    <span className="backk">
                      <span className="buttonbck">
                        <button
                          className="button"
                          onClick={(e) => {
                            setform(false);
                          }}
                        >
                          <div className="button-box">
                            <span className="button-elem">
                              <svg viewBox="0 0 46 40">
                                <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                              </svg>
                            </span>
                            <span className="button-elem">
                              <svg viewBox="0 0 46 40">
                                <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                              </svg>
                            </span>
                          </div>
                        </button>
                      </span>
                    </span>
                    <button
                      className="button"
                      onClick={(e) => {
                        for (
                          let i = 0;
                          i < receivedStateData.form.length;
                          i++
                        ) {
                          setFormData((prev) => {
                            return { ...prev, [receivedStateData.form[i]]: "" };
                          });
                        }
                      }}
                    >
                      <svg viewBox="0 0 448 512" className="svgIcon">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="blog-slider ">
              <div className="blog-slider__wrp swiper-wrapper">
                <img
                  src={
                    data.image == null
                      ? ""
                      : data.image.length < 10
                      ? images[data.image]
                      : data.image
                  }
                  alt="Card"
                />
                <div className="info-and-date-container">
                  <div className="box info">
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="512"
                        height="512"
                        viewBox="0 0 512 512"
                        version="1.1"
                        style={{
                          height: "15px",
                          width: "15px",
                          margin: "auto",
                        }}
                      >
                        <path
                          d="M 16 345.557 C 16 347.230, 23.957 365.051, 29.147 375 C 41.003 397.731, 56.127 418.215, 74.956 437.044 C 112.696 474.784, 159.339 499.014, 213 508.754 C 226.453 511.196, 229.559 511.386, 256 511.386 C 282.441 511.386, 285.547 511.196, 299 508.754 C 352.661 499.014, 399.304 474.784, 437.044 437.044 C 455.873 418.215, 470.997 397.731, 482.853 375 C 488.043 365.051, 496 347.230, 496 345.557 C 496 345.250, 490.825 345, 484.500 345 C 475.972 345, 472.997 345.323, 472.989 346.250 C 472.983 346.938, 470.031 353.350, 466.428 360.500 C 435.424 422.028, 380.355 466.639, 314.608 483.490 C 292.668 489.113, 281.383 490.454, 256 490.454 C 230.617 490.454, 219.332 489.113, 197.392 483.490 C 140.329 468.865, 90.604 432.873, 58.188 382.730 C 51.808 372.862, 39.031 348.555, 39.011 346.250 C 39.003 345.323, 36.028 345, 27.500 345 C 21.175 345, 16 345.250, 16 345.557 M 235 349.693 C 235 354.293, 234.803 354.587, 225 364.548 C 215.685 374.014, 215 374.985, 215 378.720 C 215 383.808, 217.884 387.596, 222.795 388.960 C 227.699 390.322, 284.301 390.322, 289.205 388.960 C 294.116 387.596, 297 383.808, 297 378.720 C 297 374.985, 296.315 374.014, 287 364.548 C 277.197 354.587, 277 354.293, 277 349.693 L 277 345 256 345 L 235 345 235 349.693"
                          stroke="none"
                          fill="#fc6137"
                          fillRule="evenodd"
                        />
                        <path
                          d="M 228 1.067 C 178.381 7.188, 133.408 25.975, 95 56.628 C 84.098 65.329, 65.329 84.098, 56.628 95 C 29.209 129.356, 11.184 169.204, 3.252 213 C 0.834 226.349, 0.622 229.724, 0.585 255.500 C 0.550 280.211, 0.811 285.027, 2.809 296.497 C 5.474 311.793, 6.848 317.467, 11.709 333.250 L 15.327 345 26.664 345 C 32.899 345, 38 344.861, 38 344.691 C 38 344.522, 36.611 340.584, 34.913 335.941 C 30.690 324.394, 25.498 303.770, 23.339 289.964 C 22.007 281.452, 21.546 272.706, 21.546 256 C 21.546 230.617, 22.887 219.332, 28.510 197.392 C 45.363 131.636, 90.408 76.059, 151.500 45.646 C 173.699 34.594, 196.818 27.283, 222.036 23.339 C 238.075 20.830, 273.925 20.830, 289.964 23.339 C 324.967 28.814, 356.807 41.068, 385.405 60.071 C 405.600 73.491, 418.396 84.722, 433.744 102.500 C 457.453 129.962, 474.583 162.637, 483.490 197.392 C 489.113 219.332, 490.454 230.617, 490.454 256 C 490.454 272.706, 489.993 281.452, 488.661 289.964 C 486.502 303.770, 481.310 324.394, 477.087 335.941 C 475.389 340.584, 474 344.522, 474 344.691 C 474 344.861, 479.101 345, 485.336 345 L 496.673 345 500.291 333.250 C 502.282 326.788, 504.588 318.800, 505.417 315.500 C 507.458 307.368, 511 285.364, 511 280.809 C 511 278.779, 511.450 276.840, 512 276.500 C 512.615 276.120, 513 267.803, 513 254.882 C 513 241.137, 512.655 234.095, 512 234.500 C 511.397 234.872, 511 233.537, 511 231.138 C 511 224.205, 506.257 198.969, 502.517 186 C 490.282 143.579, 468.179 106.091, 437.044 74.956 C 399.262 37.174, 352.101 12.699, 299 3.316 C 286.604 1.125, 280.944 0.709, 260 0.448 C 246.525 0.279, 232.125 0.558, 228 1.067 M 245.698 124.385 C 224.447 132.295, 218.148 159.288, 233.893 174.970 C 246.694 187.719, 265.306 187.719, 278.107 174.970 C 292.683 160.453, 288.457 135.499, 269.791 125.869 C 264.352 123.062, 251.395 122.264, 245.698 124.385 M 222.313 205.068 C 217.854 206.406, 215 210.391, 215 215.280 C 215 219.015, 215.685 219.986, 225 229.452 L 235 239.614 235 292.307 L 235 345 256 345 L 277 345 277 279.401 C 277 223.168, 276.786 213.351, 275.500 210.642 C 272.706 204.754, 271.668 204.519, 247.500 204.306 C 235.400 204.199, 224.066 204.542, 222.313 205.068 M 0.425 256 C 0.425 267.825, 0.569 272.663, 0.746 266.750 C 0.923 260.837, 0.923 251.162, 0.746 245.250 C 0.569 239.338, 0.425 244.175, 0.425 256"
                          stroke="none"
                          fill="#fc7f17"
                          fillRule="evenodd"
                        />
                      </svg>
                      Time left
                      <br />
                      <span style={{ color: "red" }}>
                        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
                      </span>
                      <ins style={{ textDecorationLine: "none" }}>◷</ins>
                      <br /> hrs
                    </p>
                  </div>
                  <div className="box date" style={{ width: "6rem" }}>
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        width="512px"
                        height="512px"
                        viewBox="0 0 512 512"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        style={{
                          height: "15px",
                          width: "15px",
                          margin: "auto",
                          shapeRendering: "geometricPrecision",
                          textRendering: "geometricPrecision",
                          imageRendering: "optimizeQuality",
                          fillRule: "evenodd",
                          clipRule: "evenodd",
                        }}
                      >
                        <g>
                          <path
                            style={{ opacity: "0.919" }}
                            fill="#55abd5"
                            d="M 316.5,-0.5 C 318.833,-0.5 321.167,-0.5 323.5,-0.5C 325.226,1.82007 325.893,4.48674 325.5,7.5C 333.523,7.16141 335.856,10.4947 332.5,17.5C 330.253,18.3742 327.92,18.7076 325.5,18.5C 325.973,26.1624 322.807,28.4957 316,25.5C 314.798,23.3225 314.298,20.9892 314.5,18.5C 307.007,19.1712 304.674,16.0046 307.5,9C 309.677,7.79777 312.011,7.29777 314.5,7.5C 314.283,4.57942 314.949,1.91275 316.5,-0.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "0.878" }}
                            fill="#6ccc6c"
                            d="M 176.5,11.5 C 178.854,15.6378 181.854,19.4711 185.5,23C 193.5,25 193.5,27 185.5,29C 181.721,32.0576 179.054,35.8909 177.5,40.5C 175.013,33.5142 170.347,28.6809 163.5,26C 170.523,23.4817 174.857,18.6483 176.5,11.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "0.992" }}
                            fill="#242021"
                            d="M 394.5,511.5 C 275.167,511.5 155.833,511.5 36.5,511.5C 31.4363,508.932 27.9363,504.932 26,499.5C 25.6667,397.833 25.3333,296.167 25,194.5C 20.9466,192.113 17.9466,188.78 16,184.5C 15.3333,155.167 15.3333,125.833 16,96.5C 17.7786,92.3882 20.6119,89.2215 24.5,87C 31.7458,85.6095 39.0791,85.1095 46.5,85.5C 46.0688,74.4225 46.5688,63.4225 48,52.5C 54.4047,43.1918 62.5714,41.3585 72.5,47C 74.6166,48.7309 76.1166,50.8976 77,53.5C 78.4288,64.0885 78.9288,74.7551 78.5,85.5C 81.8333,85.5 85.1667,85.5 88.5,85.5C 88.3335,74.8281 88.5002,64.1615 89,53.5C 95.0955,44.0714 103.262,41.9048 113.5,47C 116.106,48.9384 117.939,51.4384 119,54.5C 119.5,64.828 119.666,75.1613 119.5,85.5C 122.833,85.5 126.167,85.5 129.5,85.5C 129.069,74.4225 129.569,63.4225 131,52.5C 140.667,40.5 150.333,40.5 160,52.5C 161.431,63.4225 161.931,74.4225 161.5,85.5C 219.5,85.5 277.5,85.5 335.5,85.5C 335.097,74.769 335.597,64.1023 337,53.5C 339.908,47.4295 344.742,44.4295 351.5,44.5C 358.012,44.1716 362.845,46.8382 366,52.5C 367.431,63.4225 367.931,74.4225 367.5,85.5C 370.833,85.5 374.167,85.5 377.5,85.5C 377.069,74.4225 377.569,63.4225 379,52.5C 382.155,46.8382 386.988,44.1716 393.5,44.5C 400.258,44.4295 405.092,47.4295 408,53.5C 409.403,64.1023 409.903,74.769 409.5,85.5C 412.833,85.5 416.167,85.5 419.5,85.5C 419.333,74.8281 419.5,64.1615 420,53.5C 426.096,44.0714 434.262,41.9048 444.5,47C 447.106,48.9384 448.939,51.4384 450,54.5C 450.5,64.828 450.666,75.1613 450.5,85.5C 458.253,85.1039 465.92,85.6039 473.5,87C 477.817,89.3151 480.65,92.8151 482,97.5C 482.667,126.5 482.667,155.5 482,184.5C 480.412,188.255 477.912,191.255 474.5,193.5C 473.333,238.163 473.167,282.83 474,327.5C 497.974,363.672 501.974,402.005 486,442.5C 467.247,481.122 436.747,504.122 394.5,511.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "0.902" }}
                            fill="#ffcd28"
                            d="M 275.5,43.5 C 282.673,41.8389 285.173,44.5055 283,51.5C 280.056,55.457 277.056,55.457 274,51.5C 273.109,48.5024 273.609,45.8357 275.5,43.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#e8e8e9"
                            d="M 59.5,54.5 C 62.695,53.9607 65.195,54.9607 67,57.5C 67.6667,79.5 67.6667,101.5 67,123.5C 64.3388,126.966 61.3388,127.299 58,124.5C 57.3333,101.833 57.3333,79.1667 58,56.5C 58.7172,55.9558 59.2172,55.2891 59.5,54.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#e8e8e9"
                            d="M 101.5,54.5 C 104.044,54.1043 106.211,54.771 108,56.5C 108.667,79.1667 108.667,101.833 108,124.5C 104.706,127.311 101.706,126.978 99,123.5C 98.3333,101.5 98.3333,79.5 99,57.5C 100.045,56.6266 100.878,55.6266 101.5,54.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#e7e7e8"
                            d="M 142.5,54.5 C 145.272,54.22 147.772,54.8866 150,56.5C 150.667,78.8333 150.667,101.167 150,123.5C 147.472,127.085 144.472,127.418 141,124.5C 140.333,101.833 140.333,79.1667 141,56.5C 141.717,55.9558 142.217,55.2891 142.5,54.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "100" }}
                            fill="#e8e8e9"
                            d="M 349.5,54.5 C 351.936,54.317 354.103,54.9837 356,56.5C 356.667,79.1667 356.667,101.833 356,124.5C 352.581,127.39 349.581,127.057 347,123.5C 346.333,101.5 346.333,79.5 347,57.5C 347.698,56.3094 348.531,55.3094 349.5,54.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#dededf"
                            d="M 390.5,54.5 C 393.695,53.9607 396.195,54.9607 398,57.5C 398.667,79.5 398.667,101.5 398,123.5C 394.157,127.729 390.823,127.395 388,122.5C 387.333,100.833 387.333,79.1667 388,57.5C 389.045,56.6266 389.878,55.6266 390.5,54.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#e4e4e5"
                            d="M 432.5,54.5 C 435.652,53.9586 438.152,54.9586 440,57.5C 440.241,79.8362 439.907,102.17 439,124.5C 435.581,127.39 432.581,127.057 430,123.5C 429.333,101.5 429.333,79.5 430,57.5C 431.045,56.6266 431.878,55.6266 432.5,54.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#e84546"
                            d="M 77.5,123.5 C 78.4933,114.682 78.8266,105.682 78.5,96.5C 81.8333,96.5 85.1667,96.5 88.5,96.5C 88.0712,107.245 88.5712,117.912 90,128.5C 96.0134,137.946 103.847,139.78 113.5,134C 115.956,131.592 117.789,128.759 119,125.5C 119.5,115.506 119.666,105.506 119.5,95.5C 122.833,95.5 126.167,95.5 129.5,95.5C 129.334,105.172 129.5,114.839 130,124.5C 133.293,134.728 140.126,138.562 150.5,136C 156.268,133.737 159.601,129.57 160.5,123.5C 161.493,114.682 161.827,105.682 161.5,96.5C 219.5,96.5 277.5,96.5 335.5,96.5C 335.173,105.682 335.507,114.682 336.5,123.5C 338.665,133.17 344.665,137.67 354.5,137C 361.333,135.5 365.5,131.333 367,124.5C 367.5,114.839 367.666,105.172 367.5,95.5C 370.833,95.5 374.167,95.5 377.5,95.5C 377.334,105.172 377.5,114.839 378,124.5C 381.314,134.738 388.147,138.571 398.5,136C 404.268,133.737 407.601,129.57 408.5,123.5C 409.493,114.682 409.827,105.682 409.5,96.5C 412.5,96.5 415.5,96.5 418.5,96.5C 418.173,105.682 418.507,114.682 419.5,123.5C 421.665,133.17 427.665,137.67 437.5,137C 444.333,135.5 448.5,131.333 450,124.5C 450.5,114.839 450.666,105.172 450.5,95.5C 456.176,95.3339 461.843,95.5006 467.5,96C 469.286,96.7845 470.786,97.9512 472,99.5C 472.667,126.833 472.667,154.167 472,181.5C 470.786,183.049 469.286,184.215 467.5,185C 321.5,185.667 175.5,185.667 29.5,185C 27.9512,183.786 26.7845,182.286 26,180.5C 25.3333,153.5 25.3333,126.5 26,99.5C 27.214,97.9512 28.714,96.7845 30.5,96C 35.8229,95.5006 41.1563,95.334 46.5,95.5C 46.3335,105.172 46.5002,114.839 47,124.5C 50.293,134.728 57.1263,138.562 67.5,136C 73.2676,133.737 76.6009,129.57 77.5,123.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#b33b3c"
                            d="M 336.5,123.5 C 335.507,114.682 335.173,105.682 335.5,96.5C 277.5,96.5 219.5,96.5 161.5,96.5C 161.827,105.682 161.493,114.682 160.5,123.5C 160.5,114.167 160.5,104.833 160.5,95.5C 219.167,95.5 277.833,95.5 336.5,95.5C 336.5,104.833 336.5,114.167 336.5,123.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#a83939"
                            d="M 88.5,96.5 C 85.1667,96.5 81.8333,96.5 78.5,96.5C 78.8266,105.682 78.4933,114.682 77.5,123.5C 77.5,114.167 77.5,104.833 77.5,95.5C 81.3714,95.185 85.0381,95.5184 88.5,96.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#c13d3e"
                            d="M 419.5,123.5 C 418.507,114.682 418.173,105.682 418.5,96.5C 415.5,96.5 412.5,96.5 409.5,96.5C 409.827,105.682 409.493,114.682 408.5,123.5C 408.5,114.167 408.5,104.833 408.5,95.5C 412.167,95.5 415.833,95.5 419.5,95.5C 419.5,104.833 419.5,114.167 419.5,123.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#231f20"
                            d="M 191.5,135.5 C 229.835,135.333 268.168,135.5 306.5,136C 309.167,139 309.167,142 306.5,145C 268.5,145.667 230.5,145.667 192.5,145C 188.968,142.172 188.634,139.005 191.5,135.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#e7e7e8"
                            d="M 462.5,195.5 C 462.832,235.004 462.499,274.337 461.5,313.5C 429.797,283.555 392.464,273.389 349.5,283C 332.846,287.575 318.013,295.408 305,306.5C 306.132,296.913 302.298,290.413 293.5,287C 283.833,286.333 274.167,286.333 264.5,287C 259.096,288.615 255.596,292.115 254,297.5C 253.072,308.24 253.405,318.907 255,329.5C 256.892,333.058 259.725,335.558 263.5,337C 268.5,337.333 273.5,337.667 278.5,338C 265.471,360.48 260.637,384.647 264,410.5C 270.87,452.02 293.037,482.186 330.5,501C 233.5,501.667 136.5,501.667 39.5,501C 37.9512,499.786 36.7845,498.286 36,496.5C 35.5,396.167 35.3333,295.834 35.5,195.5C 177.833,195.5 320.167,195.5 462.5,195.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#727071"
                            d="M 462.5,195.5 C 463.831,235.002 463.831,274.669 462.5,314.5C 461.893,314.376 461.56,314.043 461.5,313.5C 462.499,274.337 462.832,235.004 462.5,195.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#242021"
                            d="M 201.5,225.5 C 211.839,225.334 222.172,225.5 232.5,226C 237.573,227.406 241.073,230.572 243,235.5C 243.667,245.5 243.667,255.5 243,265.5C 241.5,271 238,274.5 232.5,276C 222.833,276.667 213.167,276.667 203.5,276C 198,274.5 194.5,271 193,265.5C 192.333,255.5 192.333,245.5 193,235.5C 194.978,231.362 197.811,228.029 201.5,225.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#262223"
                            d="M 263.5,225.5 C 274.896,225.091 286.23,225.591 297.5,227C 299.333,228.833 301.167,230.667 303,232.5C 304.62,243.402 304.954,254.402 304,265.5C 302.5,271 299,274.5 293.5,276C 283.833,276.667 274.167,276.667 264.5,276C 259.137,274.395 255.637,270.895 254,265.5C 253.333,255.5 253.333,245.5 254,235.5C 256.022,230.98 259.189,227.647 263.5,225.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#262223"
                            d="M 324.5,225.5 C 334.839,225.334 345.172,225.5 355.5,226C 361,227.5 364.5,231 366,236.5C 373.276,270.89 359.776,284.057 325.5,276C 321,274.167 317.833,271 316,266.5C 315.333,255.833 315.333,245.167 316,234.5C 317.688,230.315 320.521,227.315 324.5,225.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#252222"
                            d="M 385.5,225.5 C 395.839,225.334 406.172,225.5 416.5,226C 421.573,227.406 425.073,230.572 427,235.5C 427.667,245.5 427.667,255.5 427,265.5C 425.385,270.904 421.885,274.404 416.5,276C 406.5,276.667 396.5,276.667 386.5,276C 381.572,274.073 378.406,270.573 377,265.5C 376.333,255.167 376.333,244.833 377,234.5C 379.362,230.973 382.196,227.973 385.5,225.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#abddf8"
                            d="M 204.5,235.5 C 213.506,235.334 222.506,235.5 231.5,236C 232,236.5 232.5,237 233,237.5C 233.667,246.5 233.667,255.5 233,264.5C 232.5,265 232,265.5 231.5,266C 222.5,266.667 213.5,266.667 204.5,266C 204,265.5 203.5,265 203,264.5C 202.333,255.5 202.333,246.5 203,237.5C 203.717,236.956 204.217,236.289 204.5,235.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#aadcf6"
                            d="M 265.5,235.5 C 274.506,235.334 283.506,235.5 292.5,236C 293,236.5 293.5,237 294,237.5C 294.667,246.5 294.667,255.5 294,264.5C 293.5,265 293,265.5 292.5,266C 283.5,266.667 274.5,266.667 265.5,266C 265,265.5 264.5,265 264,264.5C 263.333,255.5 263.333,246.5 264,237.5C 264.717,236.956 265.217,236.289 265.5,235.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#6cca6c"
                            d="M 327.5,235.5 C 336.94,235.055 346.274,235.555 355.5,237C 353.754,237.471 352.087,238.138 350.5,239C 345.833,243.667 341.167,248.333 336.5,253C 335.5,253.667 334.5,253.667 333.5,253C 332.021,249.428 329.354,247.594 325.5,247.5C 324.99,243.187 325.657,239.187 327.5,235.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#6cca6c"
                            d="M 388.5,235.5 C 398.001,235.029 407.334,235.529 416.5,237C 409.905,241.591 403.905,246.924 398.5,253C 397.5,253.667 396.5,253.667 395.5,253C 393.758,249.128 390.758,247.295 386.5,247.5C 385.99,243.187 386.657,239.187 388.5,235.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#4d814b"
                            d="M 355.5,263.5 C 355.819,258.637 355.486,253.97 354.5,249.5C 354.783,248.711 355.283,248.044 356,247.5C 356.817,253.016 356.651,258.35 355.5,263.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#69c268"
                            d="M 354.5,249.5 C 355.486,253.97 355.819,258.637 355.5,263.5C 355.423,264.75 354.756,265.583 353.5,266C 347.833,266.667 342.167,266.667 336.5,266C 342.67,260.662 348.67,255.162 354.5,249.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#67be66"
                            d="M 416.5,248.5 C 417.651,253.65 417.817,258.984 417,264.5C 416.5,265 416,265.5 415.5,266C 409.833,266.667 404.167,266.667 398.5,266C 405.004,260.663 411.004,254.829 416.5,248.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#6ac66a"
                            d="M 386.5,258.5 C 389.297,260.795 391.964,263.295 394.5,266C 388.165,267.5 385.499,265 386.5,258.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#6ac66a"
                            d="M 325.5,259.5 C 327.963,261.461 330.297,263.628 332.5,266C 327.165,267.167 324.831,265 325.5,259.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#262223"
                            d="M 80.5,286.5 C 90.5056,286.334 100.506,286.5 110.5,287C 113.902,288.4 116.736,290.567 119,293.5C 120.622,304.736 120.955,316.069 120,327.5C 118.833,332.667 115.667,335.833 110.5,337C 100.167,337.667 89.8333,337.667 79.5,337C 74.5995,335.098 71.4329,331.598 70,326.5C 69.3333,316.833 69.3333,307.167 70,297.5C 72.3566,292.645 75.8566,288.979 80.5,286.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#262323"
                            d="M 141.5,286.5 C 175.815,278.982 189.315,292.316 182,326.5C 180.474,332.026 176.974,335.526 171.5,337C 161.167,337.667 150.833,337.667 140.5,337C 135.938,335.373 133.105,332.206 132,327.5C 131.333,316.833 131.333,306.167 132,295.5C 134.406,291.592 137.572,288.592 141.5,286.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#252122"
                            d="M 203.5,286.5 C 213.172,286.334 222.839,286.5 232.5,287C 237.598,288.433 241.098,291.6 243,296.5C 243.667,306.5 243.667,316.5 243,326.5C 241.5,332 238,335.5 232.5,337C 197.489,344.988 184.323,331.488 193,296.5C 195.106,291.557 198.606,288.224 203.5,286.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#54a9d1"
                            d="M 370.5,289.5 C 426.707,289.237 463.874,315.571 482,368.5C 491.911,420.826 474.411,460.992 429.5,489C 387.679,508.804 348.346,504.804 311.5,477C 278.712,447.3 267.212,410.8 277,367.5C 291.986,322.008 323.153,296.008 370.5,289.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#6ac56a"
                            d="M 82.5,296.5 C 91.1922,296.169 99.8589,296.502 108.5,297.5C 102.805,303.031 96.9714,308.364 91,313.5C 89.1628,311.387 86.9961,309.554 84.5,308C 82.8876,307.28 81.3876,307.446 80,308.5C 78.7734,303.938 79.6067,299.938 82.5,296.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#6bc76a"
                            d="M 143.5,296.5 C 152.173,296.334 160.84,296.5 169.5,297C 163.531,301.967 157.865,307.301 152.5,313C 151.5,313.667 150.5,313.667 149.5,313C 148.021,309.428 145.354,307.594 141.5,307.5C 141.01,303.513 141.676,299.846 143.5,296.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#6ac76a"
                            d="M 204.5,296.5 C 213.192,296.169 221.859,296.502 230.5,297.5C 225.015,302.485 219.681,307.652 214.5,313C 213.5,313.667 212.5,313.667 211.5,313C 209.758,309.128 206.758,307.295 202.5,307.5C 202.01,303.513 202.676,299.846 204.5,296.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#a9daf5"
                            d="M 265.5,296.5 C 274.506,296.334 283.506,296.5 292.5,297C 293,297.5 293.5,298 294,298.5C 294.667,304.5 294.667,310.5 294,316.5C 291.167,320 288.333,323.5 285.5,327C 278.833,327.667 272.167,327.667 265.5,327C 265,326.5 264.5,326 264,325.5C 263.333,316.5 263.333,307.5 264,298.5C 264.717,297.956 265.217,297.289 265.5,296.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#252121"
                            d="M 368.5,304.5 C 415.922,302.807 448.422,323.807 466,367.5C 475.624,404.279 467.124,436.112 440.5,463C 407.754,489.412 372.421,493.412 334.5,475C 295.837,449.479 281.671,413.979 292,368.5C 305.294,332.357 330.794,311.024 368.5,304.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#4d814c"
                            d="M 171.5,325.5 C 171.821,319.974 171.488,314.64 170.5,309.5C 170.783,308.711 171.283,308.044 172,307.5C 172.819,313.681 172.653,319.681 171.5,325.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#41653f"
                            d="M 110.5,324.5 C 110.819,319.637 110.486,314.97 109.5,310.5C 109.783,309.711 110.283,309.044 111,308.5C 111.817,314.016 111.651,319.35 110.5,324.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#6ac66a"
                            d="M 170.5,309.5 C 171.488,314.64 171.821,319.974 171.5,325.5C 171.389,326.117 171.056,326.617 170.5,327C 161.167,327.667 151.833,327.667 142.5,327C 141.398,324.599 141.231,322.099 142,319.5C 144.167,321.667 146.333,323.833 148.5,326C 149.833,326.667 151.167,326.667 152.5,326C 158.67,320.662 164.67,315.162 170.5,309.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#6ac56a"
                            d="M 232.5,308.5 C 233.652,313.985 233.818,319.651 233,325.5C 232.5,326 232,326.5 231.5,327C 222.5,327.667 213.5,327.667 204.5,327C 202.496,324.159 201.996,320.993 203,317.5C 205.561,322.438 209.394,325.271 214.5,326C 221.004,320.663 227.004,314.829 232.5,308.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#69c268"
                            d="M 109.5,310.5 C 110.486,314.97 110.819,319.637 110.5,324.5C 110.586,325.496 110.252,326.329 109.5,327C 100.167,327.667 90.8333,327.667 81.5,327C 79.4766,323.817 78.9766,320.317 80,316.5C 82.4626,319.965 85.2959,323.131 88.5,326C 89.8333,326.667 91.1667,326.667 92.5,326C 98.3365,320.996 104.003,315.829 109.5,310.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            fill="#fdcb28"
                            d="M 368.5,314.5 C 402.452,312.063 428.952,324.729 448,352.5C 459.437,371.76 462.771,392.427 458,414.5C 447.815,449.675 424.648,470.175 388.5,476C 347.736,478.212 319.236,460.712 303,423.5C 291.065,381.908 302.898,349.075 338.5,325C 348.035,319.768 358.035,316.268 368.5,314.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#282220"
                            d="M 376.5,324.5 C 379.652,323.959 382.152,324.959 384,327.5C 384.333,345.5 384.667,363.5 385,381.5C 392.779,385.631 395.446,391.964 393,400.5C 388.436,409.558 381.436,412.224 372,408.5C 362.592,416.453 353.092,424.286 343.5,432C 336.574,433.414 334.407,430.914 337,424.5C 346.517,417.072 355.851,409.406 365,401.5C 362.61,392.614 365.443,385.948 373.5,381.5C 374.333,363.176 374.833,344.842 375,326.5C 375.717,325.956 376.217,325.289 376.5,324.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#282526"
                            d="M 80.5,347.5 C 90.1724,347.334 99.8391,347.5 109.5,348C 114.208,349.378 117.708,352.212 120,356.5C 120.667,367.167 120.667,377.833 120,388.5C 118.833,393.667 115.667,396.833 110.5,398C 99.8333,398.667 89.1667,398.667 78.5,398C 74.2115,395.708 71.3782,392.208 70,387.5C 69.3333,377.833 69.3333,368.167 70,358.5C 72.3566,353.645 75.8566,349.979 80.5,347.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#282526"
                            d="M 142.5,347.5 C 151.506,347.334 160.506,347.5 169.5,348C 175.477,349.307 179.643,352.807 182,358.5C 182.667,368.167 182.667,377.833 182,387.5C 180.567,392.598 177.4,396.098 172.5,398C 161.833,398.667 151.167,398.667 140.5,398C 135.901,396.402 133.068,393.235 132,388.5C 131.333,377.833 131.333,367.167 132,356.5C 134.489,352.168 137.989,349.168 142.5,347.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#262324"
                            d="M 203.5,347.5 C 213.172,347.334 222.839,347.5 232.5,348C 238.026,349.526 241.526,353.026 243,358.5C 243.667,368.5 243.667,378.5 243,388.5C 241.6,391.902 239.433,394.736 236.5,397C 199.641,408.135 185.141,394.968 193,357.5C 195.354,352.916 198.854,349.583 203.5,347.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#a8d9f3"
                            d="M 81.5,358.5 C 91.0834,358.182 100.583,358.515 110,359.5C 110.667,368.833 110.667,378.167 110,387.5C 109.5,388 109,388.5 108.5,389C 99.8333,389.667 91.1667,389.667 82.5,389C 81.6667,388.167 80.8333,387.333 80,386.5C 79.3333,377.833 79.3333,369.167 80,360.5C 80.7172,359.956 81.2172,359.289 81.5,358.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#a8d9f3"
                            d="M 142.5,358.5 C 151.839,358.334 161.173,358.5 170.5,359C 171,359.5 171.5,360 172,360.5C 172.667,369.167 172.667,377.833 172,386.5C 171.167,387.333 170.333,388.167 169.5,389C 160.833,389.667 152.167,389.667 143.5,389C 143,388.5 142.5,388 142,387.5C 141.194,377.756 141.361,368.089 142.5,358.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#aadbf6"
                            d="M 204.5,358.5 C 213.506,358.334 222.506,358.5 231.5,359C 232,359.5 232.5,360 233,360.5C 233.667,369.167 233.667,377.833 233,386.5C 232.692,387.308 232.192,387.975 231.5,388.5C 222.882,389.637 214.215,389.804 205.5,389C 204.692,388.692 204.025,388.192 203.5,387.5C 202.361,378.548 202.195,369.548 203,360.5C 203.717,359.956 204.217,359.289 204.5,358.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#dbdbdc"
                            d="M 376.5,390.5 C 381.835,390.005 384.335,392.338 384,397.5C 381.294,400.978 378.294,401.311 375,398.5C 374.109,395.502 374.609,392.836 376.5,390.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#272425"
                            d="M 79.5,409.5 C 89.8387,409.334 100.172,409.5 110.5,410C 115.206,411.105 118.373,413.938 120,418.5C 120.667,428.833 120.667,439.167 120,449.5C 118.594,454.573 115.428,458.073 110.5,460C 76.1767,468.009 62.6767,454.843 70,420.5C 71.5992,415.406 74.7658,411.739 79.5,409.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#272425"
                            d="M 140.5,409.5 C 150.839,409.334 161.172,409.5 171.5,410C 177,411.5 180.5,415 182,420.5C 189.323,454.843 175.823,468.009 141.5,460C 137,458.167 133.833,455 132,450.5C 131.333,439.833 131.333,429.167 132,418.5C 133.688,414.315 136.521,411.315 140.5,409.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#252122"
                            d="M 201.5,409.5 C 211.839,409.334 222.172,409.5 232.5,410C 237.573,411.406 241.073,414.572 243,419.5C 243.667,429.5 243.667,439.5 243,449.5C 241.5,455 238,458.5 232.5,460C 222.833,460.667 213.167,460.667 203.5,460C 198,458.5 194.5,455 193,449.5C 192.333,439.5 192.333,429.5 193,419.5C 194.978,415.362 197.811,412.029 201.5,409.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#a9daf4"
                            d="M 81.5,419.5 C 91.0834,419.182 100.583,419.515 110,420.5C 110.667,429.833 110.667,439.167 110,448.5C 109.5,449 109,449.5 108.5,450C 99.8333,450.667 91.1667,450.667 82.5,450C 81.6667,449.167 80.8333,448.333 80,447.5C 79.3333,438.833 79.3333,430.167 80,421.5C 80.7172,420.956 81.2172,420.289 81.5,419.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#a9daf4"
                            d="M 142.5,419.5 C 151.839,419.334 161.173,419.5 170.5,420C 171,420.5 171.5,421 172,421.5C 172.667,430.167 172.667,438.833 172,447.5C 171.167,448.333 170.333,449.167 169.5,450C 160.833,450.667 152.167,450.667 143.5,450C 143,449.5 142.5,449 142,448.5C 141.194,438.756 141.361,429.089 142.5,419.5 Z"
                          />
                        </g>
                        <g>
                          <path
                            style={{ opacity: "1" }}
                            fill="#aadcf6"
                            d="M 204.5,419.5 C 213.506,419.334 222.506,419.5 231.5,420C 232,420.5 232.5,421 233,421.5C 233.667,430.5 233.667,439.5 233,448.5C 232.5,449 232,449.5 231.5,450C 222.5,450.667 213.5,450.667 204.5,450C 204,449.5 203.5,449 203,448.5C 202.333,439.5 202.333,430.5 203,421.5C 203.717,420.956 204.217,420.289 204.5,419.5 Z"
                          />
                        </g>
                      </svg>
                      Start Time <br /> {date} <br /> {time}
                    </p>
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="title">{data.title}</div>
                <div className="text">{data.subtitle}</div>
                <div className="flex justify-center">
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="512px"
                    height="512px"
                    viewBox="0 0 512 512"
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                      height: "20px",
                      width: "20px",
                    }}
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      fill="#000000"
                      stroke="none"
                    >
                      <path
                        d="M1204 5031 c-49 -13 -134 -63 -161 -95 -14 -17 -37 -54 -51 -82 -24
-49 -28 -52 -71 -58 -106 -14 -203 -86 -250 -186 -22 -46 -26 -69 -26 -140 0
-79 -2 -89 -32 -135 -40 -63 -57 -131 -50 -201 5 -49 4 -54 -14 -54 -11 0 -31
-11 -44 -25 -25 -24 -25 -26 -25 -215 0 -189 0 -191 25 -215 20 -21 34 -25 80
-25 l55 0 0 -40 c0 -40 0 -40 -38 -40 -152 0 -282 -129 -282 -280 0 -74 28
-140 84 -196 60 -59 122 -84 212 -84 l53 0 16 -57 c68 -235 255 -474 467 -597
l48 -28 0 -71 0 -72 -351 -125 c-219 -78 -374 -138 -414 -162 -129 -77 -240
-204 -295 -336 -54 -127 -60 -188 -60 -562 l0 -341 25 -24 24 -25 864 0 865 0
6 -32 c3 -18 19 -60 35 -93 163 -342 577 -457 893 -248 104 69 159 138 238
299 53 108 81 154 119 192 159 159 419 160 581 2 38 -37 65 -80 121 -196 66
-135 80 -156 148 -224 241 -240 621 -239 863 2 107 108 177 275 178 425 0 44
-108 662 -166 953 -35 175 -136 322 -291 424 -49 32 -195 86 -235 86 -27 0
-28 1 -28 61 0 92 -17 137 -75 194 -63 64 -100 75 -245 75 -145 0 -182 -11
-245 -75 -57 -56 -75 -102 -75 -189 l0 -56 -240 0 -240 0 0 56 c0 87 -18 133
-75 189 -63 64 -100 75 -245 75 -145 0 -182 -11 -245 -75 -57 -57 -75 -102
-75 -191 l0 -59 -58 -11 c-31 -6 -86 -23 -121 -37 l-64 -26 -79 27 -78 27 0
72 0 71 48 28 c116 68 253 196 331 313 52 76 113 204 136 284 l16 57 53 0
c166 0 296 123 296 280 0 151 -130 280 -282 280 -38 0 -38 0 -38 40 l0 40 55
0 c46 0 60 4 80 25 25 24 25 26 25 215 0 189 0 191 -25 215 -13 14 -33 25 -44
25 -17 0 -19 5 -14 59 7 70 -15 147 -55 201 -24 31 -27 43 -27 125 0 76 -4 99
-26 146 -47 100 -142 170 -250 185 -43 6 -48 10 -69 52 -36 75 -75 116 -142
153 -57 30 -71 33 -148 34 -77 0 -91 -3 -142 -31 l-57 -31 -62 31 c-54 26 -74
31 -139 31 -65 0 -85 -5 -139 -31 l-62 -31 -56 30 c-59 32 -156 44 -219 28z
m-439 -1191 c-53 -53 -87 -80 -102 -80 -22 0 -23 3 -23 80 l0 80 102 0 103 0
-80 -80z m840 40 l-39 -40 -285 0 -285 0 39 40 39 40 285 0 285 0 -39 -40z
m760 -40 l-80 -80 -285 0 -285 0 80 80 80 80 285 0 285 0 -80 -80z m192 -512
c-4 -233 -7 -283 -24 -343 -95 -332 -324 -557 -653 -641 -102 -26 -306 -26
-404 0 -325 86 -558 315 -648 636 -19 66 -22 109 -26 348 l-4 272 882 0 882 0
-5 -272z m-1917 -89 l0 -122 -46 6 c-69 7 -109 51 -109 116 0 73 47 119 123
120 l32 1 0 -121z m2204 82 c26 -27 31 -39 31 -81 0 -66 -40 -110 -109 -117
l-46 -6 0 123 0 123 46 -6 c34 -3 55 -13 78 -36z m149 -1012 c32 -14 47 -49
47 -104 l0 -45 -160 0 -160 0 0 45 c0 54 15 89 44 103 29 14 199 15 229 1z
m1120 0 c32 -14 47 -49 47 -104 l0 -45 -160 0 -160 0 0 45 c0 54 15 89 44 103
29 14 199 15 229 1z m-2653 -127 c128 -32 412 -19 523 23 15 6 17 1 17 -46 0
-64 -30 -112 -99 -163 -70 -50 -134 -71 -221 -71 -87 0 -151 21 -221 71 -69
51 -99 99 -99 163 0 47 2 52 18 46 9 -3 46 -14 82 -23z m2882 -193 c145 -30
271 -129 333 -261 30 -65 44 -127 120 -537 47 -255 85 -481 85 -502 0 -157
-98 -319 -237 -391 -188 -98 -376 -71 -531 76 -44 41 -66 76 -124 196 -64 131
-78 152 -147 220 -230 228 -571 228 -802 0 -69 -68 -83 -89 -147 -220 -58
-120 -80 -155 -124 -196 -155 -147 -343 -174 -531 -77 -141 74 -237 233 -237
392 0 21 38 247 85 502 75 404 90 473 119 534 61 129 171 222 305 257 60 15
146 17 923 17 589 1 874 -2 910 -10z m-3702 -1189 l0 -80 -200 0 -200 0 0 80
0 80 200 0 200 0 0 -80z"
                      />
                      <path d="M1200 3280 l0 -160 80 0 80 0 0 160 0 160 -80 0 -80 0 0 -160z" />
                      <path d="M2000 3280 l0 -160 80 0 80 0 0 160 0 160 -80 0 -80 0 0 -160z" />
                      <path
                        d="M1284 2833 c15 -111 70 -206 159 -273 71 -54 137 -75 237 -75 100 0
166 21 237 75 89 67 144 162 159 273 l7 47 -81 0 -80 0 -7 -37 c-22 -120 -115
-197 -235 -197 -72 0 -126 22 -172 71 -31 33 -67 108 -68 141 0 21 -4 22 -81
22 l-82 0 7 -47z"
                      />
                      <path
                        d="M4000 1907 c-53 -17 -133 -102 -149 -160 -13 -46 -11 -113 5 -151 6
-16 4 -18 -12 -12 -145 60 -324 -64 -324 -224 0 -96 81 -204 173 -229 46 -13
113 -11 151 5 16 6 18 4 12 -12 -60 -146 64 -324 226 -324 133 0 251 132 235
263 -2 23 -8 51 -13 61 -6 16 -4 18 12 12 42 -18 112 -18 163 -1 88 29 161
131 161 225 0 94 -73 196 -161 225 -51 17 -121 17 -163 -1 -16 -6 -18 -4 -12
12 61 148 -66 327 -228 323 -23 -1 -57 -6 -76 -12z m80 -462 c30 0 66 4 78 8
22 8 23 7 15 -15 -4 -12 -8 -48 -8 -78 0 -30 4 -66 8 -78 8 -22 7 -23 -15 -15
-12 4 -48 8 -78 8 -30 0 -66 -4 -78 -8 -22 -8 -23 -7 -15 15 4 12 8 48 8 78 0
30 -4 66 -8 78 -8 22 -7 23 15 15 12 -4 48 -8 78 -8z m354 -16 c58 -27 55
-115 -5 -139 -63 -26 -125 36 -100 99 19 44 60 60 105 40z m-308 -332 c20 -18
27 -32 26 -57 -2 -70 -83 -99 -129 -46 -31 36 -29 61 6 97 36 35 61 37 97 6z"
                      />
                      <path
                        d="M2585 1815 c-23 -22 -25 -32 -25 -120 l0 -95 -95 0 c-88 0 -98 -2
-120 -25 -25 -24 -25 -26 -25 -215 0 -189 0 -191 25 -215 22 -23 32 -25 120
-25 l95 0 0 -95 c0 -88 2 -98 25 -120 24 -25 26 -25 215 -25 189 0 191 0 215
25 23 22 25 32 25 120 l0 95 95 0 c88 0 98 2 120 25 25 24 25 26 25 215 0 189
0 191 -25 215 -22 23 -32 25 -120 25 l-95 0 0 95 c0 88 -2 98 -25 120 -24 25
-26 25 -215 25 -189 0 -191 0 -215 -25z"
                      />
                    </g>
                  </svg>
                  &nbsp;Space left
                  <span style={{ color: "red" }}>{numberOfJoinedPlayer}/{data.numberofPlayers}</span>
                </div>
                <div className="flex my-3 justify-center gap-16 regbtn">
                  <div className="text" style={{ marginBottom: "0rem" }}>
                    {data.type}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if(checkCurrentSpaceLeft()){
                        setform(true);
                      }
                      else{
                        toast.warning("Space is full",{
                          position: "top-center",
                        });
                      }
                    }}
                  >
                    J O I N
                    <div id="clip">
                      <div id="leftTop" className="corner"></div>
                      <div id="rightBottom" className="corner"></div>
                      <div id="rightTop" className="corner"></div>
                      <div id="leftBottom" className="corner"></div>
                    </div>
                    <span id="rightArrow" className="arrow"></span>
                    <span id="leftArrow" className="arrow"></span>
                  </button>{" "}
                </div>
                <div className="extraDetails">{data.extraDetails}</div>
                <div className="instruction">{data.instruction}</div>
                <div className="text my-5">Instruction</div>
                <div>{data.instruction}</div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <section className={styleError.errorPage}>
            <div className={styleError.content}>
              <h2 className={styleError.header}>404</h2>
              <h4>Tournament Game card not Found !</h4>
              <p>
                Please click on the "Tournament Game" card to do registration on
                game. <br />
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

export default Registration;
