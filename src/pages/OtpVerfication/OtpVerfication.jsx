import React, { useState, useEffect } from "react";
import otpStyle from "./OtpVerfication.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const OtpVerfication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const getEmail = queryParams.get("email") || "";
  const mode = queryParams.get("mode") || "ValidateUser";
  console.log(getEmail);
  console.log(mode);
  useEffect(() => {
    setEmail(getEmail);
    document.getElementById("email").value = getEmail;
  }, [getEmail]);
  function checkemail() {
    if (email === "") {
      alert("Please enter your email");
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      alert("Please enter a valid email address");
    } else {
      return true;
    }
  }
  function checkOtp() {
    if (inputOtp === "") {
      alert("Please enter the OTP");
    } else if (inputOtp.length !== 4) {
      alert("Please enter a 4-digit OTP");
    } else {
      return true;
    }
  }
  function checkpass() {
    let pass = document.getElementById("pass").value;
    let cpass = document.getElementById("cpass").value;
    if (pass === "") {
      alert("Please enter a password");
    } else if (pass.length < 8) {
      alert("Password should be atleast 8 characters long");
    } else if (pass !== cpass) {
      alert("Passwords do not match");
    } else {
      return true;
    }
  }
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(true);
  const [otp, setOtp] = useState({ otp1: "", otp2: "", otp3: "", otp4: "" });
  const inputOtp = otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4;
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setOtp({
      ...otp,
      [name]: value,
    });
  };
  const handleEmail = (e) => {
    let value = e.target.value;
    setEmail(value);
  };
  const handlepass = (e) => {
    let value = e.target.value;
    setPass(value);
  };
  const ResetPassword = {
    Url1: "http://localhost:3000/forgotPassword",
    Url2: "http://localhost:3000/validatePassResetOTP",
  };
  const ValidateUser = {
    Url1: "http://localhost:3000/validateUser",
    Url2: "http://localhost:3000/validateOtp",
  };
  let Url1 = "";
  let Url2 = "";
  if (mode === "ResetPassword") {
    Url1 = ResetPassword.Url1;
    Url2 = ResetPassword.Url2;
  } else if (mode === "ValidateUser") {
    Url1 = ValidateUser.Url1;
    Url2 = ValidateUser.Url2;
  }
  const handelOtpSubmit = async (e) => {
    e.preventDefault();
    if (mode === "ResetPassword") {
      if (!checkpass()) {
        exit(0);
      }
    }
    if (checkOtp()) {
      try {
        const response = await fetch(Url2, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: inputOtp,
            password: pass,
          }),
        });
        const responseData = await response.json();
        console.log(response);
        console.log(responseData);
        if (response.status === 200) {
          alert(responseData.msg);
          navigate("/login");
        } else {
          if (responseData.extraD === undefined) {
            alert(responseData.msg);
          } else {
            alert(responseData.msg + responseData.extraD);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handelEmailSubmit = async (e) => {
    e.preventDefault();
    if (checkemail()) {
      try {
        const response = await fetch(Url1, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
          }),
        });
        const jsonData = await response.json();
        alert(jsonData.msg);
        if (jsonData.redirected) {
          setShow(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={otpStyle.main}>
      {show ? (
        <div className={otpStyle.email}>
          <div className="font-semibold text-xl text-lime-600">
            <h2 className={otpStyle.text}>
              Enter your Register Email Id for OTP Verification
            </h2>
          </div>
          <div className="relative mt-6">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              autoComplete="email"
              aria-label="Email address"
              className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
              onChange={handleEmail}
            />
            <div className="absolute inset-y-1 right-1 flex justify-end">
              <button
                type="submit"
                aria-label="Submit"
                className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
                onClick={handelEmailSubmit}
              >
                <svg viewBox="0 0 16 6" aria-hidden="true" className="w-4">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 3 10 .5v2H0v1h10v2L16 3Z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {mode === "ResetPassword" ? (
            <div className={otpStyle.pass}>
              <div className="font-semibold text-xl text-lime-600 mt-8">
                <h2 className={otpStyle.text}>Enter your New Password</h2>
              </div>
              <input
                type="text"
                placeholder="Password"
                id="pass"
                className={otpStyle.passInput}
              ></input>
              <input
                type="password"
                placeholder="Confirm Password"
                name="cpass"
                id="cpass"
                className={otpStyle.passInput}
                onChange={handlepass}
              ></input>
            </div>
          ) : (
            <></>
          )}
          <div className={otpStyle.otp}>
            <form className={otpStyle.form}>
              <p className={otpStyle.heading}>Verify</p>
              <svg
                className={otpStyle.check}
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="60px"
                height="60px"
                viewBox="0 0 60 60"
                xmlSpace="preserve"
              >
                {" "}
                <image
                  id="image0"
                  width="60"
                  height="60"
                  x="0"
                  y="0"
                  href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
cwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0NDzN/r+StAAACR0lEQVRYw+3Yy2sTURTH8W+bNgVf
aGhFaxNiAoJou3FVEUQE1yL031BEROjCnf4PLlxILZSGYncuiiC48AEKxghaNGiliAojiBWZNnNd
xDza3pl77jyCyPzO8ubcT85wmUkG0qT539In+MwgoxQoUqDAKDn2kSNLlp3AGi4uDt9xWOUTK3xg
hVU2wsIZSkxwnHHGKZOxHKfBe6rUqFGlTkPaVmKGn6iYao1ZyhK2zJfY0FZ9ldBzsbMKxZwZjn/e
5szGw6UsD5I0W6T+hBhjUjiF7bNInjz37Ruj3igGABjbtpIo3GIh30u4ww5wr3fwfJvNcFeznhBs
YgXw70TYX2bY/ulkZhWfzfBbTdtrzjPFsvFI+T/L35jhp5q2owDs51VIVvHYDM9sa/LY8XdtKy1l
FXfM8FVN2/X2ajctZxVXzPA5TZvHpfb6CFXxkerUWTOcY11LX9w0tc20inX2mmF4qG3upnNWrOKB
hIXLPu3dF1x+kRWq6ysHpkjDl+7eQjatYoOCDIZF3006U0unVSxIWTgTsI3HNP3soSJkFaflMDwL
3OoHrph9YsPCJJ5466DyOGUHY3Epg2rWloUxnMjsNw7aw3AhMjwVhgW4HYm9FZaFQZ/bp6QeMRQe
hhHehWKXGY7CAuSpW7MfKUZlAUqWdJ3DcbAAB3guZl9yKC4WYLfmT4muFtgVJwvQx7T2t0mnXK6J
XlGGyAQvfNkaJ5JBmxnipubJ5HKDbJJsM0eY38QucSx5tJWTVHBwqDDZOzRNmn87fwDoyM4J2hRz
NgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMi0xM1QxMzoxNTo1MCswMDowMKC8JaoAAAAldEVY
dGRhdGU6bW9kaWZ5ADIwMjMtMDItMTNUMTM6MTU6NTArMDA6MDDR4Z0WAAAAKHRFWHRkYXRlOnRp
bWVzdGFtcAAyMDIzLTAyLTEzVDEzOjE1OjUxKzAwOjAwIIO3fQAAAABJRU5ErkJggg=="
                ></image>
              </svg>
              <div className={otpStyle.box}>
                <input
                  className={otpStyle.input}
                  type="number"
                  autoComplete="off"
                  name="otp1"
                  onChange={handleInput}
                  onInput={(event) => {
                    const maxLength = 1;
                    const input = event.target.value;
                    if (input.length === maxLength) {
                      event.target.nextElementSibling?.focus();
                    } else if (input.length > maxLength) {
                      event.target.value = input.slice(0, maxLength);
                    }
                  }}
                />
                <input
                  className={otpStyle.input}
                  type="number"
                  autoComplete="off"
                  name="otp2"
                  onChange={handleInput}
                  onInput={(event) => {
                    const maxLength = 1;
                    const input = event.target.value;
                    if (input.length === 0) {
                      event.target.previousElementSibling?.focus();
                    } else if (input.length === maxLength) {
                      event.target.nextElementSibling?.focus();
                    } else if (input.length > maxLength) {
                      event.target.value = input.slice(0, maxLength);
                    }
                  }}
                />
                <input
                  className={otpStyle.input}
                  type="number"
                  autoComplete="off"
                  name="otp3"
                  onChange={handleInput}
                  onInput={(event) => {
                    const maxLength = 1;
                    const input = event.target.value;
                    if (input.length > maxLength) {
                      event.target.value = input.slice(0, maxLength);
                    } else if (input.length === 0) {
                      event.target.previousElementSibling?.focus();
                    } else if (input.length === maxLength) {
                      event.target.nextElementSibling?.focus();
                    }
                  }}
                />
                <input
                  className={otpStyle.input}
                  type="number"
                  autoComplete="off"
                  name="otp4"
                  onChange={handleInput}
                  onInput={(event) => {
                    const maxLength = 1;
                    const input = event.target.value;
                    if (input.length > maxLength) {
                      event.target.value = input.slice(0, maxLength);
                    } else if (input.length === 0) {
                      event.target.previousElementSibling?.focus();
                    }
                  }}
                />
              </div>
              <button className={otpStyle.btn1} onClick={handelOtpSubmit}>
                Submit
              </button>
              <button
                className={otpStyle.btn2}
                onClick={(e) => {
                  e.preventDefault();
                  setShow(true);
                }}
              >
                Back
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default OtpVerfication;
