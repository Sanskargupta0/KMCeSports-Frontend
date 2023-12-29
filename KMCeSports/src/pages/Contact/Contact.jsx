import React from "react";
import { images } from "../../assets";
import Contributor from "../../components/Contributor/Contributor";
import "./Contact.css";
const Contact = () => {
  return (
    <div>
      <div className="forms-container">
        <div className="forms">
          <span className="heading">Get in touch</span>
          <input placeholder="Name" type="text" className="input" />
          <input placeholder="Email" id="mail" type="email" className="input" />
          <textarea
            placeholder="Say Hello"
            rows="10"
            cols="30"
            id="message"
            name="message"
            className="textarea"
          ></textarea>
          <div className="button-container">
            <div className="send-button">Send</div>
            <div className="reset-button-container">
              <div id="reset-btn" className="reset-button">
                Reset
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Contributor">
        <Contributor
          name="Akash Gupta"
          dev="Co-Founder"
          images={images.Akash}
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
            />

            <button
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
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
