import React, { useState } from "react";
import { images } from "../../assets";
import Contributor from "../../components/Contributor/Contributor";
import constactStyles from "./Contact.module.css";
const Contact = () => {
  function reset() {
    document.getElementById("name").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("message").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("subEmail").value = "";
  }

  function check() {
    var name = document.getElementById("name").value;
    var mail = document.getElementById("mail").value;
    var message = document.getElementById("message").value;
    if (name === "" || mail === "" || message === "") {
      alert("Please fill all the fields");
    } else if (!mail.includes("@") || !mail.includes(".")) {
      alert("Please enter a valid email");
    } else if (message.length < 10) {
      alert("Please enter a valid message");
    } else if (name.length < 3) {
      alert("Please enter a valid name");
    } else {
      try {
        alert("Thank you for your response");
        reset();
      } catch (error) {
        confirm.log(error);
        alert("Something went wrong");
      }
    }
  }

  const [contact, setContact] = useState({
    name: "",
    mail: "",
    phone: "",
    message: "",
  });

  const handleConatct = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const [email, setEmail] = useState("");
  const handelEmail = (e) => {
    setEmail(e.target.value);
  };
  function checkEmail() {
    var mail = document.getElementById("subEmail").value;
    if (!mail.includes("@") || !mail.includes(".")) {
      alert("Please enter a valid email");
    } else {
      try {
        reset();
        alert("Thank for Subscribing our news later");
      } catch (error) {
        confirm.log(error);
        alert("Something went wrong");
      }
    }
  }
  return (
    <div>
      <div className={constactStyles.formscontainer}>
        <div className={constactStyles.forms}>
          <span className={constactStyles.heading}>Get in touch</span>
          <input
            name="name"
            placeholder="Name"
            id="name"
            type="text"
            className={constactStyles.input}
            value={contact.name}
            onChange={handleConatct}
          />
          <input
            name="mail"
            placeholder="Email"
            id="mail"
            type="email"
            className={constactStyles.input}
            value={contact.mail}
            onChange={handleConatct}
          />
          <input
            name="phone"
            placeholder="Phone  ( Not Compulsory )"
            id="phone"
            type="number"
            className={constactStyles.input}
            value={contact.phone}
            onChange={handleConatct}
          />
          <textarea
            placeholder="Say Hello"
            rows="10"
            cols="30"
            id="message"
            name="message"
            className={constactStyles.textarea}
            value={contact.message}
            onChange={handleConatct}
          ></textarea>
          <div className={constactStyles.buttoncontainer}>
            <div
              className={constactStyles.sendbutton}
              onClick={(e) => {
                e.preventDefault();
                check();
              }}
            >
              Send
            </div>
            <div className={constactStyles.resetbuttoncontainer}>
              <div
                id="reset-btn"
                className={constactStyles.resetbutton}
                onClick={reset}
              >
                Reset
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={constactStyles.Contributor}>
        <Contributor
          name="Akash Gupta"
          dev="Co-Founder"
          images={images.Akash}
          git="https://github.com/saysky2"
          mail="mailto:10582akash@gmail.com"
          linkedin="https://www.linkedin.com/in/saysky2/"
        />
        <Contributor
          name="Sanskar Gupta"
          dev=" Founder"
          images={images.Sanskar}
          git="https://github.com/Sanskargupta0"
          mail="mailto:Sanskar362002@gmail.com"
          linkedin="https://www.linkedin.com/in/sanskar-gupta-12476423b/"
        />
        <Contributor name="Aman Raj" dev="Co-Founder" images={images.Aman} />
      </div>

      <div
        className="flex flex-col items-center justify-center h-screen dark"
        style={{ height: "20rem", margin: "3rem" }}
      >
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">
            Subscribe to Our Newsletter
          </h2>

          <form className="flex flex-col">
            <input
              placeholder="Enter your email address"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
              name="email"
              id="subEmail"
              value={email.email}
              onChange={handelEmail}
            />

            <button
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                checkEmail();
              }}
            >
              Subscribe
            </button>
          </form>

          <div className="flex justify-center mt-4">
            <a className="text-sm text-gray-400 hover:underline" href="#">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
