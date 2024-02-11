import React ,{useState} from "react";
import { components } from "../../../../components";
import constactStyles from "../../../Contact/Contact.module.css";
import { useAuth } from "../../../../store/auth";
import { toast } from "react-toastify";
import config from "../../../../config";
import "./ReportBug.css";
const ReportBug = () => {
  const { userdata }= useAuth();
  const [contactData, setContactData] = useState(true);
  const [show , setShow] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    bugImage: "",
  });

  function reset() {
    setContact({
    name: "",
    email: "",
    phone: "",
    message: "",
    bugImage: "",
    })
    setShow(false);
  }

  function check() {
    var name = document.getElementById("name").value;
    var mail = document.getElementById("mail").value;
    var message = document.getElementById("message").value;
    var phone = document.getElementById("phone").value;

    if (name === "" || mail === "" || message === "") {
      toast.warn("Please fill all the fields", {
        position: "top-center",
      });
    } else if (phone.length > 0 && phone.length != 10) {
      toast.warn("Please enter a valid phone number", {
        position: "top-center",
      });
    } else if (!mail.includes("@") || !mail.includes(".")) {
      toast.warn("Please enter a valid email", {
        position: "top-center",
      });
    } else if (message.length < 10) {
      toast.warn("Please enter a valid message", {
        position: "top-center",
      });
    } else if (name.length < 3) {
      toast.warn("Please enter a valid name", {
        position: "top-center",
      });
    } else {
      try {
        return true;
      } catch (error) {
        confirm.log(error);
        toast.warn("Something went wrong", {
          position: "top-center",
        });
      }
    }
  }
  const handleConatct = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };
  const handelConatct = async (e) => {
    try {
      e.preventDefault();
      const pass = check();
      if (pass) {
        const contactResponse = await fetch(`${config.backendUrl}/bugReport`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        });
        const contactData = await contactResponse.json();
        if (!(contactResponse.status === 422)) {
          reset();
          toast.success(`${contactData.message}`, {
            position: "top-center",
          });
        } else {
          if (contactData.extrD) {
            toast.error(`${contactData.msg + contactData.extrD}`, {
              position: "top-center",
            });
          } else {
            toast.error(`${contactData.msg}`, {
              position: "top-center",
            });
          }
        }
      }
    } catch (error) {
      console.log({ err: error });
    }
  };
  if(contactData && userdata){
    setContactData(false);
    if(userdata.firstName!==null && userdata.email!==null){
    setContact({...contact, name: userdata.firstName, email: userdata.email});
    }
  };
  const convertBase64 = (e) => {
    const file = e.target.files[0];

    // Check if file size is within the limit (500KB = 500 * 1024 bytes)
    if (file.size > 500 * 1024) {
      toast.error("Image size exceeds 500KB limit", {
        position: "top-center",
      });
      return; // Stop further processing
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setContact({
        ...contact,
        bugImage: reader.result,
      });
      setShow(true);
      toast.success("Image converted to Base64", {
        position: "top-center",
      });
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
      toast.error("Failed to convert the image into Base64", {
        position: "top-center",
      });
    };
  };

  return (
    <>
      <components.DashboardNavbar />
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
            name="email"
            placeholder="Email"
            id="mail"
            type="email"
            className={constactStyles.input}
            value={contact.email}
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
            placeholder="Describe the bug briefly and attach the screenshot below. Thank you We will be rewarded soon"
            rows="10"
            cols="30"
            id="message"
            name="message"
            className={constactStyles.textarea}
            value={contact.message}
            onChange={handleConatct}
          ></textarea>
          <div className={constactStyles.buttoncontainer}>
            <div className={constactStyles.sendbutton} onClick={handelConatct}>
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
      <div className="reportBugMainDiv">
      <form className="file-upload-form">
            <label htmlFor="file" className="file-upload-label">
              <div className="file-upload-design">
                <svg viewBox="0 0 640 512" height="1em">
                  <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                </svg>
                <p>Drag and Drop</p>
                <p>or</p>
                <span className="browse-button">Browse file</span>
              </div>
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={convertBase64}
              />
            </label>
          </form>
          {show?<img src={contact.bugImage} alt="Bug Image" />:""}
      </div>
    </>
  );
};

export default ReportBug;
