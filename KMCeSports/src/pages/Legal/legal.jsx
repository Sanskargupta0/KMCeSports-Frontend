import React, { useState } from "react";
import { useEffect } from "react";
import "../About/About.css";
const legal = () => {
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

  const [selectedTab, setSelectedTab] = useState(true);
  const aboutStyles = {
    display: selectedTab ? "block" : "none",
    borderBottomWidth: selectedTab ? "2px" : "0px",
  };

  const joinStyles = {
    display: selectedTab ? "none" : "block",
    borderBottomWidth: selectedTab ? "0px" : "2px",
  };

  const changeSelectedTab = () => {
    setSelectedTab((prevTab) => !prevTab);
  };

  return (
    <div className="about">
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-tab"
          style={{ justifyContent: "center" }}
        >
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4  rounded-t-lg  hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="about-Us"
              data-tabs-target="#about"
              type="button"
              style={{ borderBottomWidth: aboutStyles.borderBottomWidth }}
              onClick={changeSelectedTab}
            >
              Privacy Policy
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4  rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="join"
              data-tabs-target="#join"
              type="button"
              style={{ borderBottomWidth: joinStyles.borderBottomWidth }}
              onClick={changeSelectedTab}
            >
              Terms and Conditions
            </button>
          </li>
        </ul>
      </div>
      <div id="default-tab-content">
        <div
          className=""
          style={{ display: aboutStyles.display }}
          id="aboutUsBody"
        >
          <div className="stickybtn">
            <a href="#">
            <button className="button">
              <svg className="svgIcon" viewBox="0 0 384 512">
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
              </svg>
            </button>
            </a>
          </div>
          <main>
            <div className="PrivacyPolicy">
              <section id="privacyPolicy">
                <h1
                  className="text-4xl"
                  style={{
                    textAlign: "center",
                    marginBottom: "1rem",
                    textDecorationLine: "underline",
                    fontWeight: "400",
                  }}
                >
                  Privacy Policy
                </h1>
                <p>
                This Privacy Policy outlines how KMCeSports collects, uses,
                 and discloses information from users of our website and 
                 related services (collectively, the "Services"). 
                 Your privacy is important to us, and we are committed 
                 to protecting your personal information.
                </p>
              </section>
              <section id="weCollect">
                <h2>Information We Collect:</h2>
                <section id="weCollect1">
                  <h3>We may collect the following types of information from you:</h3>
                  <p>
                  
At KMCesports, we place a premium on openness and safeguarding your privacy.
 Our commitment to transparency is reflected in the types of information 
 we collect to enrich your interaction with our services. Personal
 Information, encompassing identifiers like your name, email address, 
 phone number, and IP address, is obtained to facilitate secure 
 and personalized user experiences. We also gather Demographic 
 Information, consisting of non-personally identifiable details 
 such as age, gender, location, and interests, providing insights into 
 the diversity of our user base.

Moreover, we track Usage Information, which includes comprehensive data 
on your engagement with our Services, ranging from the specific pages 
you visit to the features you utilize, and even the timestamp of 
your activities. This wealth of data allows us to continually refine 
and optimize our platform, ensuring it aligns seamlessly with 
your preferences. Additionally, any Content you contribute, be it 
comments, forum posts, messages, or profile information, becomes integral 
to the vibrant community within our ecosystem.

It's important to emphasize that we handle all gathered information 
with utmost responsibility, striving to create a secure environment 
that respects individual privacy choices. Rest assured, our practices 
are designed to foster a trustworthy and personalized user experience 
while upholding the highest standards of privacy protection.
                  </p>
                </section>
                <section id="weCollect2">
                  <h3>How We Use Your Information:</h3>
                  <p>
                  
At KMCesports, we prioritize your privacy and aim to enhance your experience through various services. We use the information you provide to operate and personalize our services, ensuring a tailored and seamless interaction. Our updates and promotional materials are crafted to keep you informed about the latest offerings. Additionally, we are committed to promptly responding to your inquiries and requests, fostering a responsive and customer-centric environment. By analyzing usage patterns, we continuously improve our services, making them more intuitive and efficient. We also enforce our Terms of Service to maintain a secure and trustworthy platform. Lastly, we adhere to legal requirements, ensuring that your data is handled responsibly and in compliance with relevant regulations. Your trust is paramount, and we are dedicated to upholding the highest standards in data management and service delivery.
                  </p>
                </section>
              </section>
              <section id="infoCookies">
                <h2>Sharing Your Information & Cookies and Tracking Technologies:</h2>
                <section id="infoCookies1">
                  <h3>
                  Sharing Your Information:
                  </h3>
                  <p>
                  At KMCesports, maintaining the security and privacy of your information is a top priority. To ensure the seamless operation of our Services, we collaborate with trusted third parties, including service providers like cloud storage, email, and analytics providers. These partners assist us in delivering a robust and efficient user experience while adhering to stringent data protection standards.

Furthermore, in our commitment to enhancing your overall experience, we may share your information with select business partners. These collaborations are carefully chosen, aligning with our dedication to providing you with products or services that we believe will be of genuine interest.

It's important to note that, in certain instances, we may be obligated to disclose your information to meet legal requirements. This could include situations where compliance with a court order or subpoena is necessary. Rest assured, in every interaction with third parties, we prioritize your privacy and diligently evaluate partnerships to uphold the trust you place in us.
                  </p>
                </section>
                <section id="infoCookies2">
                  <h3>Cookies and Tracking Technologies:</h3>
                  <p>
                  We use cookies and other tracking technologies to track the activity on the Services and hold certain information. Cookies are files with small amounts of data that may include a unique anonymous identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and analyze information.
You can configure your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of the Services.

                  </p>
                </section>
              </section>
              <section id="security">
                <h2>Security, Children's Privacy & International Transfers</h2>
                <section id="security1">
                  <h2>Security:</h2>
                  <p>
                  We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or method of electronic storage is 100% secure. Therefore, we cannot guarantee the absolute security of your information.
                  </p>
                </section>
                <section id="security2">
                  <h2>Children's Privacy:</h2>
                  <p>
                  The Services are not intended for children under the age of 13. We do not knowingly collect personal information from children under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
                  </p>
                </section>
                <section id="security3">
                  <h2>International Transfers:</h2>
                  <p>
                  Your information may be transferred to and processed in countries other than your own. These countries may have different data protection laws than your own country.
                  </p>
                </section>
              </section>
              <section id="yourRight">
                <h2 className="text-2xl " style={{ marginBottom: "1rem" }}>
                Your Rights:
                </h2>
                <p>
                You have the right to access, correct, delete, or restrict the processing of your personal information. You also have the right to withdraw your consent for the processing of your personal information at any time.

To exercise these rights.

                </p>
              </section>
              <section id="updateContact">
                <h2 className="text-2xl" style={{ marginBottom: "1rem" }}>
                Policy Updates, Contact:
                </h2>
                <p style={{ marginBottom: "2rem" }}>
                In our commitment to transparency and continuous improvement, we reserve the right to make updates to this Privacy Policy periodically. Any changes will be communicated to you through the posting of the revised Privacy Policy on our Services. We recommend reviewing this policy periodically to stay informed about any modifications. Your continued use of our Services after any changes indicates your acceptance of the updated terms. If you have any questions or concerns about this Privacy Policy, please feel free to contact us through the provided "Contact Us" section. Your privacy and understanding of our practices are important to us, and we are here to address any inquiries you may have.
                </p>
              </section>
            </div>
            <nav className="section-nav">
              <ol>
                <li>
                  <a href="#privacyPolicy">Privacy Policy</a>
                </li>
                <li>
                  <a href="#weCollect">Information We Collect</a>
                  <ul>
                    <li className="">
                      <a href="#weCollect1">Data we Collect</a>
                    </li>
                    <li className="">
                      <a href="#weCollect2">Information we use</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#infoCookies">Privacy and Tracking</a>
                  <ul>
                    <li className="">
                      <a href="#infoCookies1">                  Sharing Your Information 
</a>
                    </li>
                    <li className="">
                      <a href="#infoCookies2">Cookies</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#security">Privacy Safeguards</a>
                  <ul>
                    <li className="">
                      <a href="#security1">Security</a>
                    </li>
                    <li className="">
                      <a href="#security2">Children's Privacy</a>
                    </li>
                    <li className="">
                      <a href="#security3">International Transfers</a>
                    </li>
                  </ul>
                </li>
                <li className="">
                  <a href="#yourRight">Your Rights</a>
                </li>
                <li className="">
                  <a href="#updateContact">Policy Updates, Contact</a>
                </li>
              </ol>
              <div className="backToTopBtn">
                <a href="#about-Us">
                  <button className="button">
                    <svg className="svgIcon" viewBox="0 0 384 512">
                      <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
                    </svg>
                  </button>
                </a>
              </div>
            </nav>
          </main>
        </div>
        <div className="" id="joinbody" style={{ display: joinStyles.display }}>
        <div className="stickybtn">
            <a href="#">
            <button className="button">
              <svg className="svgIcon" viewBox="0 0 384 512">
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
              </svg>
            </button>
            </a>
          </div>
           <main>
            <div className="aboutUs">
              <section id="termsCondition">
                <h1
                  className="text-4xl"
                  style={{
                    textAlign: "center",
                    marginBottom: "1rem",
                    textDecorationLine: "underline",
                    fontWeight: "400",
                  }}
                >
                  Terms & Conditions
                </h1>
                <p>
                Welcome to KMC Esports ("we," "us," or "our"). By using our website and participating in our esports tournaments, you agree to comply with and be bound by the following terms and conditions:
                </p>
              </section>
              <section id="fairPlay">
                <h2>Fair Play Policy</h2>
                <section id="fairPlay1">
                  <h3>Fair Play Policy: Zero Tolerance for Unethical Practices</h3>
                  <p>
                  No unfair means or practices will be tolerated on our platform. This includes, but is not limited to, cheating, exploiting, or using unauthorized software. Violators will be subject to immediate suspension or banning from our platform.

                  </p>
                </section>
                <section id="fairPlay2">
                  <h3>Payment and Refund Policy
</h3>
                  <p>
                  Amounts paid for tournament entry are non-refundable. Once a participant has paid the entry fee, no refunds will be provided, regardless of the circumstances.


                  </p>
                </section>
              </section>
              <section id="responsibility">
                <h2>Participant Responsibility</h2>
                <section id="responsibility1">
                  <h3>
                  Participant Accountability:
                  </h3>
                  <p>
                  Participants are solely responsible for their actions and decisions, including the risk of losing money in tournaments.
                  </p>
                </section>
                <section id="responsibility2">
                  <h3>Financial Disclaimer</h3>
                  <p>
                  KMC Esports is not responsible for any financial losses incurred by participants, including but not limited to entry fees, bets, or other financial transactions related to tournaments.
                  </p>
                </section>
              </section>
              <section id="coc">
                <h2>Code of Conduct, Eligibility & Intellectual Property:</h2>
                <section id="coc1">
                  <h2>Code of Conduct:</h2>
                  <p>
                  Participants must adhere to a respectful and sportsmanlike conduct during tournaments and interactions on our platform. Harassment, discrimination, or any form of inappropriate behavior will not be tolerated.        </p>
                </section>
                <section id="coc2">
                  <h2>Eligibility:</h2>
                  <p>
                  Participants must meet the eligibility criteria specified for each tournament. Failure to meet these criteria may result in disqualification.
                  </p>
                </section>
                <section id="coc3">
                  <h2>Intellectual Property:</h2>
                  <p>
                  All content, including but not limited to logos, graphics, and text, on the KMC Esports website is the intellectual property of KMC Esports and may not be used without explicit permission.
                  </p>
                </section>
              </section>
              <section id="termsPrivacy">
                <h2 className="text-2xl " style={{ marginBottom: "1rem" }}>
                Privacy Policy, Modification of Terms & Termination of Account :
                </h2>
                <p>
                Our Privacy Policy serves as the guiding document for the collection, use, and disclosure of personal information within our platform. Your use of our website implies your consent to adhere to the terms outlined in this Privacy Policy.

Regarding any changes, we retain the right to modify or update the terms and conditions at our discretion. The most recent version will be made available on our website, along with the corresponding effective date. We encourage users to stay informed by periodically reviewing the posted terms.

Additionally, we hold the authority to terminate or suspend any user account if there is a violation of these terms and conditions or for any other reason deemed necessary at our discretion. This termination is executed with the objective of maintaining the integrity and compliance of our platform.
                </p>
              </section>
              <section id="governingLaw">
                <h2 className="text-2xl" style={{ marginBottom: "1rem" }}>
                Governing Law
                </h2>
                <p style={{ marginBottom: "2rem" }}>
                These terms and conditions are governed by and construed in accordance with the laws.

By using our website and participating in our tournaments, you agree to these terms and conditions. If you do not agree with any part of these terms, please refrain from using our platform..
                </p>
                <p>
                For any questions or concerns regarding these terms and conditions.
Thank you for choosing KMC Esports!
                </p>
              </section>
            </div>
            <nav className="section-nav">
              <ol>
                <li>
                  <a href="#termsCondition">T&C</a>
                </li>
                <li>
                  <a href="#fairPlay">Fair Play Policy</a>
                  <ul>
                    <li className="">
                      <a href="#fairPlay1">Zero Tolerance</a>
                    </li>
                    <li className="">
                      <a href="#fairPlay2">Payment & Refund
</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#responsibility">Participant Responsibility</a>
                  <ul>
                    <li className="">
                      <a href="#responsibility1">Participant Accountability</a>
                    </li>
                    <li className="">
                      <a href="#responsibility2">Financial Disclaimer</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#coc">Conduct Guidelines</a>
                  <ul>
                    <li className="">
                      <a href="#coc1">Code of Conduct</a>
                    </li>
                    <li className="">
                      <a href="#coc2">Eligibility</a>
                    </li>
                    <li className="">
                      <a href="#coc3">Intellectual Property</a>
                    </li>
                  </ul>
                </li>
                <li className="">
                  <a href="#termsPrivacy">Privacy Policy</a>
                </li>
                <li className="">
                  <a href="#governingLaw">Governing Law</a>
                </li>
              </ol>
              <div className="backToTopBtn">
                <a href="#join">
                  <button className="button">
                    <svg className="svgIcon" viewBox="0 0 384 512">
                      <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
                    </svg>
                  </button>
                </a>
              </div>
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
};

export default legal;
