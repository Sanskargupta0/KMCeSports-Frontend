import React, { useState } from "react";
import registrationStyle from "./Registration.module.css";

const registration = () => {
  function checkInput() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var userName = document.getElementById("userName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var cpassword = document.getElementById("cpassword").value;

    if (firstName.length < 3) {
      alert("First name should be at least 3 characters long");
    } else if (lastName.length < 3) {
      alert("Last name should be at least 3 characters long");
    } else if (!/^[a-zA-Z0-9]+$/.test(userName)) {
      alert("Username can only contain letters and numbers");
    } else if (email === "") {
      alert("Please enter your email");
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      alert("Please enter a valid email address");
    } else if (password === "") {
      alert("Please enter your password");
    } else if (cpassword === "") {
      alert("Please enter your confirm password");
    } else if (password !== cpassword) {
      alert("Password and confirm password do not match");
    } else {
      return true;
    }
  }

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleUser = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleRegistration = async (e) => {
    try {
      e.preventDefault();
      const pass = checkInput();
      if (pass) {
        const registrationResponse = await fetch(
          `http://localhost:3000/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        const registrationData = await registrationResponse.json();
        console.log(registrationData);
        if (!(registrationResponse.status === 422)) {
          setUser({
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
          });
          document.getElementById("cpassword").value = "";
          alert(registrationData.msg);
        } else {
          alert(registrationData.extraDetails); // Show response object in alert
        }
      }
    } catch (error) {
      console.log({ err: error });
    }
  };

  return (
    <div className={registrationStyle.container}>
      <div className={registrationStyle.form_area}>
        <p className={registrationStyle.title}>SIGN UP</p>
        <form action="">
          <div className={registrationStyle.form_group}>
            <div className={registrationStyle.lableforname}>
              <label
                className={registrationStyle.sub_title}
                htmlFor="firstName"
                style={{ marginRight: "70px" }}
              >
                Frist Name
              </label>
              <label className={registrationStyle.sub_title} htmlFor="lastName">
                Last Name
              </label>
            </div>
            <div className={registrationStyle.inputfiledforname}>
              <input
                placeholder="First Name"
                className={registrationStyle.form_style}
                style={{ marginRight: "10px" }}
                type="text"
                id="firstName"
                name="firstName"
                value={user.firstName}
                onChange={handleUser}
              />
              <input
                placeholder="Last Name"
                className={registrationStyle.form_style}
                type="text"
                id="lastName"
                name="lastName"
                value={user.lastName}
                onChange={handleUser}
              />
            </div>
          </div>
          <div className={registrationStyle.form_group}>
            <label className={registrationStyle.sub_title} htmlFor="userName">
              User Name
            </label>
            <input
              placeholder="Enter your @Username"
              id="userName"
              className={registrationStyle.form_style}
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleUser}
            />
          </div>
          <div className={registrationStyle.form_group}>
            <label className={registrationStyle.sub_title} htmlFor="email">
              Email
            </label>
            <input
              placeholder="Enter your email"
              id="email"
              className={registrationStyle.form_style}
              type="email"
              name="email"
              value={user.email}
              onChange={handleUser}
            />
          </div>
          <div className={registrationStyle.form_group}>
            <label className={registrationStyle.sub_title} htmlFor="password">
              Password
            </label>
            <input
              placeholder="Enter your password"
              id="password"
              className={registrationStyle.form_style}
              type="text"
            />
          </div>
          <div className={registrationStyle.form_group}>
            <label className={registrationStyle.sub_title} htmlFor="cpassword">
              Confirm Password
            </label>
            <input
              placeholder="Enter your confirm password"
              id="cpassword"
              className={registrationStyle.form_style}
              type="password"
              name="password"
              value={user.password}
              onChange={handleUser}
            />
          </div>
          <div>
            <button
              className={registrationStyle.btn}
              style={{ background: "#1f2937" }}
              type="button"
              onClick={handleRegistration}
            >
              SIGN UP
            </button>
            <p>
              Have an Account?{" "}
              <a className={registrationStyle.link} href="/auth">
                Login Here!
              </a>
            </p>
            <a className={registrationStyle.link} href=""></a>
          </div>
          <a className={registrationStyle.link} href=""></a>
        </form>
      </div>
      <a className={registrationStyle.link} href=""></a>
    </div>
  );
};

export default registration;