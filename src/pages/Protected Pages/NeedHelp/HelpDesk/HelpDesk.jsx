import React, { useEffect, useState } from "react";
import { components } from "../../../../components";
import "./HelpDesk.css";

const HelpDesk = () => {
  const [filter, setFilter] = useState("");

  const searchFunction = () => {
    const input = document.getElementById("myInput");
    const ul = document.getElementById("myUL");
    const li = ul.getElementsByTagName("li");

    for (let i = 0; i < li.length; i++) {
      const a = li[i].getElementsByTagName("a")[0];
      const txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  };
  //for the start

  const filterSelectionn = (c) => {
    console.log("atc", c);
    console.log("ff", filter);
    const x = document.getElementsByClassName("filterDiv");
    if (c === "all") c = "";
    for (let i = 0; i < x.length; i++) {
      faqRemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) faqAddClass(x[i], "show");
    }
  };
  // and for the rest of case
  const filterSelection = (c) => {
    const x = document.getElementsByClassName("filterDiv");
    if (c === "all") {
      c = "";
    }
    for (let i = 0; i < x.length; i++) {
      if (c === "" || x[i].className.indexOf(c) > -1) {
        x[i].style.display = "";
      } else {
        x[i].style.display = "none";
      }
    }
  };

  const faqAddClass = (element, name) => {
    const arr1 = element.className.split(" ");
    const arr2 = name.split(" ");
    for (let i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) === -1) {
        element.className += " " + arr2[i];
      }
    }
  };

  const faqRemoveClass = (element, name) => {
    const arr1 = element.className.split(" ");
    const arr2 = name.split(" ");
    for (let i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
  };

  const handleButtonClick = (event, filter) => {
    setFilter(filter);
    const current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    event.target.className += " active";
    filterSelection(filter);
  };

  const handleAccordionClick = (e) => {
    e.preventDefault();
    e.target.classList.toggle("is-active");
    const panel = e.target.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  };
  const handlehide = (e) => {
    e.target.style.display = "none";
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    setFilter(value);
    filterSelection(value.toLowerCase());
  };

  useEffect(() => {
    filterSelectionn("");
    setFilter("all");
  }, []);

  return (
    <>
      <div
        className="master-box mx-auto w-full max-w-screen-xl p-4 py-1 lg:py-8"
        style={{ marginTop: "25px" }}
      >
        <components.DashboardNavbar />
        <div className="faq-header">
          <h1 className="title">Knowledge Base</h1>
          <h4 className="subtitle">Frequently Asked Questions</h4>
          <div className="filter-search">
            <i className="fa fa-search"></i>
            <input
              type="text"
              id="myInput"
              name="myInput"
              value={filter}
              onKeyUp={searchFunction}
              onChange={handleSearch}
              placeholder="Search"
              style={{ color: "black" }}
            />
            <hr className="hr-sep" />
            <div id="myBtnContainer">
              <button
                className="btn active"
                onClick={(e) => handleButtonClick(e, "all")}
              >
                {" "}
                {/* replaced onclick with onClick */}
                Show all
              </button>
              <button
                className="btn"
                onClick={(e) => handleButtonClick(e, "account")}
              >
                {" "}
                {/* replaced onclick with onClick */}
                Account
              </button>
              {/* Other buttons go here */}
            </div>
          </div>
        </div>

        <ul id="myUL">
          <li className="filterDiv account">
            <a
              className="accordion-thumb"
              href="#"
              onClick={handleAccordionClick}
            >
              How can I reset my password?
            </a>
            <p className="accordion-panel" onClick={handlehide}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </li>
          <li className="filterDiv orders">
            <a className="accordion-thumb" href="#">
              Where can I find the tracking number of my order?
            </a>
            <p className="accordion-panel">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </li>
          <li className="filterDiv orders">
            <a className="accordion-thumb" href="#">
              Can I return a product?
            </a>
            <p className="accordion-panel">
              Lorem ipsum dolor sit amet, ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, consectetur adipisicing elit.
            </p>
          </li>
          <li className="filterDiv bugs">
            <a className="accordion-thumb" href="#">
              Can you fix my bugs?
            </a>
            <p className="accordion-panel">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </li>
          <li className="filterDiv orders">
            <a className="accordion-thumb" href="#">
              I haven't received my order
            </a>
            <p className="accordion-panel">
              Dictumst quisque sagittis purus sit amet volutpat consequat. Quis
              varius quam quisque id. Urna duis convallis convallis tellus id
              interdum. Ultrices tincidunt arcu non sodales. Justo laoreet sit
              amet cursus sit. Vulputate ut pharetra sit amet aliquam id diam
              maecenas.
            </p>
          </li>
          <li className="filterDiv promotions">
            <a className="accordion-thumb" href="#">
              Do you have any promotions available?
            </a>
            <p className="accordion-panel">
              Tellus at urna condimentum mattis pellentesque id. Mollis nunc sed
              id semper risus in hendrerit gravida.
            </p>
          </li>
          <li className="filterDiv orders">
            <a className="accordion-thumb" href="#">
              Can I change the delivery address for my completed order?
            </a>
            <p className="accordion-panel">
              gestas maecenas pharetra convallis posuere morbi leo urna
              molestie. Semper eget duis at tellus at urna condimentum mattis.
              Phasellus faucibus scelerisque eleifend donec. Sagittis nisl
              rhoncus mattis rhoncus urna neque. Velit egestas dui id ornare
              arcu. Ac feugiat sed lectus vestibulum mattis. Euismod quis
              viverra nibh cras pulvinar mattis nunc sed. Purus semper eget duis
              at. Blandit massa enim nec dui nunc mattis enim. Potenti nullam ac
              tortor vitae purus faucibus ornare.
            </p>
          </li>
          <li className="filterDiv orders">
            <a className="accordion-thumb" href="#">
              How much will the shipping be for my product?
            </a>
            <p className="accordion-panel">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </li>
          <li className="filterDiv bugs">
            <a className="accordion-thumb" href="#">
              My mouse doesn't work properly
            </a>
            <p className="accordion-panel">
              Dictum sit amet justo donec enim diam. Mus mauris vitae ultricies
              leo integer malesuada nunc. At lectus urna duis convallis
              convallis tellus id interdum velit. At volutpat diam ut venenatis
              tellus in metus.
            </p>
          </li>
          <li className="filterDiv account orders">
            <a className="accordion-thumb" href="#">
              Can I make an order without creating an account?
            </a>
            <p className="accordion-panel">
              Pharetra et ultrices neque ornare aenean euismod elementum nisi
              quis. Urna duis convallis convallis tellus id interdum velit. Elit
              pellentesque habitant morbi tristique senectus et. Habitant morbi
              tristique senectus et netus et malesuada fames. Sed viverra tellus
              in hac habitasse platea dictumst vestibulum. Pretium aenean
              pharetra magna ac placerat. Odio ut sem nulla pharetra diam sit
              amet. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices
              dui. At erat pellentesque adipiscing commodo elit at. Sed viverra
              tellus in hac habitasse platea. Eu ultrices vitae auctor eu augue
              ut lectus. Sagittis purus sit amet volutpat consequat mauris nunc
              congue nisi. Volutpat diam ut venenatis tellus.
            </p>
          </li>
          <li className="filterDiv promotions">
            <a className="accordion-thumb" href="#">
              If I buy 2 products or more, do I get a discount?
            </a>
            <p className="accordion-panel">
              Sed adipiscing diam donec adipiscing. Mattis vulputate enim nulla
              aliquet porttitor lacus. Id venenatis a condimentum vitae sapien
              pellentesque habitant.
            </p>
          </li>
          <li className="filterDiv account">
            <a className="accordion-thumb" href="#">
              Can I have two accounts?
            </a>
            <p className="accordion-panel">
              Et malesuada fames ac turpis egestas sed tempus urna.
            </p>
          </li>
          <li className="filterDiv account">
            <a className="accordion-thumb" href="#">
              How can I create an account?
            </a>
            <p className="accordion-panel">
              Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim
              diam. Etiam sit amet nisl purus. Volutpat maecenas volutpat
              blandit aliquam etiam.
            </p>
          </li>
          <li className="filterDiv promotions">
            <a className="accordion-thumb" href="#">
              Do I have a discount if I have a lot of friends?
            </a>
            <p className="accordion-panel">
              In aliquam sem fringilla ut morbi tincidunt augue interdum velit.
              Et malesuada fames ac turpis. Pretium quam vulputate dignissim
              suspendisse in est ante in nibh. Venenatis a condimentum vitae
              sapien. Facilisis gravida neque convallis a. Ac tortor vitae purus
              faucibus ornare suspendisse sed
            </p>
          </li>
          <li className="filterDiv bugs">
            <a className="accordion-thumb" href="#">
              Website is bugged
            </a>
            <p className="accordion-panel">
              Aliquet nec ullamcorper sit amet risus nullam. Purus ut faucibus
              pulvinar elementum integer enim neque volutpat. Dignissim cras
              tincidunt lobortis feugiat vivamus at augue eget arcu. Diam donec
              adipiscing tristique risus nec feugiat. Pharetra sit amet aliquam
              id diam maecenas ultricies mi eget. Dolor magna eget est lorem
              ipsum dolor sit amet consectetur.
            </p>
          </li>
          <li className="filterDiv account promotion bugs">
            <a className="accordion-thumb" href="#">
              Can you tell me what am I looking for?
            </a>
            <p className="accordion-panel">
              Purus non enim praesent elementum facilisis. Platea dictumst
              quisque sagittis purus sit. Nec dui nunc mattis enim. Vitae congue
              eu consequat ac felis donec et odio pellentesque. Pulvinar
              elementum integer enim neque volutpat. Vel facilisis volutpat est
              velit egestas dui. Eget arcu dictum varius duis at consectetur
              lorem. Diam sollicitudin tempor id eu nisl nunc mi ipsum. Vitae
              auctor eu augue ut. Sed libero enim sed faucibus turpis in. Mauris
              sit amet massa vitae.
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HelpDesk;
