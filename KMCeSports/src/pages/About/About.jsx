import React from "react";
import { useEffect } from "react";
import "./About.css";
const About = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting) {
          document
            .querySelector(`nav li a[href="#${id}"]`)
            .parentElement.classList.add("active");
        } else {
          document
            .querySelector(`nav li a[href="#${id}"]`)
            .parentElement.classList.remove("active");
        }
      });
    });

    // Track all sections that have an `id` applied
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      // Clean up the observer on component unmount
      observer.disconnect();
    };
  }, []);
  return (
    <div className="about">
      <main>
        <div>
          <h1>Smooth Scrolling Sticky ScrollSpy Navigation</h1>
          <p>
            <em>
              Want an explanation of how this works?
              <br />
              &rarr;{" "}
              <a
                href="https://www.bram.us/2020/01/10/smooth-scrolling-sticky-scrollspy-navigation/"
                target="_top"
              >
                https://www.bram.us/2020/01/10/smooth-scrolling-sticky-scrollspy-navigation/
              </a>
            </em>
          </p>
          <section id="introduction">
            <h2>Introduction</h2>
            <p>…</p>
          </section>
          <section id="request-response">
            <h2>Request &amp; Response</h2>
            <p>…</p>
          </section>
          <section id="authentication">
            <h2>Authentication</h2>
            <p>…</p>
          </section>
          <section id="endpoints">
            <h2>Endpoints</h2>
            <section id="endpoints--root">
              <h3>Root</h3>
              <p>…</p>
            </section>
            <section id="endpoints--cities-overview">
              <h3>Cities Overview</h3>
              <p>…</p>
            </section>
            <section id="endpoints--city-detail">
              <h3>City Detail</h3>
              <p>…</p>
            </section>
            <section id="endpoints--city-config">
              <h3>City Config</h3>
              <p>…</p>
            </section>
            <section id="endpoints--city-spots-overview">
              <h3>City Spots Overview</h3>
              <p>…</p>
            </section>
            <section id="endpoints--city-spot-detail">
              <h3>City Spot Detail</h3>
              <p>…</p>
            </section>
            <section id="endpoints--city-icons-overview">
              <h3>City Icons Overview</h3>
              <p>…</p>
            </section>
            <section id="endpoints--city-icon-detail">
              <h3>City Icon Detail</h3>
              <p>…</p>
            </section>
          </section>
          <section id="links">
            <h2>Links</h2>
            <p>…</p>
          </section>
          <section id="expanders">
            <h2>Expanders</h2>
            <p>…</p>
          </section>
          <section id="filters">
            <h2>Filters</h2>
            <p>…</p>
          </section>
        </div>
        <nav className="section-nav">
          <ol>
            <li>
              <a href="#introduction">Introduction</a>
            </li>
            <li>
              <a href="#request-response">Request &amp; Response</a>
            </li>
            <li>
              <a href="#authentication">Authentication</a>
            </li>
            <li>
              <a href="#endpoints">Endpoints</a>
              <ul>
                <li className="">
                  <a href="#endpoints--root">Root</a>
                </li>
                <li className="">
                  <a href="#endpoints--cities-overview">Cities Overview</a>
                </li>
                <li className="">
                  <a href="#endpoints--city-detail">City Detail</a>
                </li>
                <li className="">
                  <a href="#endpoints--city-config">City Config</a>
                </li>
                <li className="">
                  <a href="#endpoints--city-spots-overview">
                    City Spots Overview
                  </a>
                </li>
                <li className="">
                  <a href="#endpoints--city-spot-detail">City Spot Detail</a>
                </li>
                <li className="">
                  <a href="#endpoints--city-icons-overview">
                    City Icons Overview
                  </a>
                </li>
                <li className="">
                  <a href="#endpoints--city-icon-detail">City Icon Detail</a>
                </li>
              </ul>
            </li>
            <li className="">
              <a href="#links">Links</a>
            </li>
            <li className="">
              <a href="#expanders">Expanders</a>
            </li>
            <li className="">
              <a href="#filters">Filters</a>
            </li>
          </ol>
        </nav>
      </main>
    </div>
  );
};

export default About;
