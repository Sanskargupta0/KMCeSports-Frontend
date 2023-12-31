import React, { useState } from "react";
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
              About Us
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
              How To Join ?
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
            <div className="aboutUs">
              <section id="aboutKMCesports">
                <h1
                  className="text-4xl"
                  style={{
                    textAlign: "center",
                    marginBottom: "1rem",
                    textDecorationLine: "underline",
                    fontWeight: "400",
                  }}
                >
                  About KMCesports
                </h1>
                <p>
                  We are KMCesports, a passionate community dedicated to
                  fostering a fair, competitive, and thrilling esports
                  experience for players of all skill levels. Founded by a team
                  of experienced gamers and esports enthusiasts, we understand
                  the excitement, dedication, and sportsmanship that fuels the
                  competitive gaming world.
                </p>
              </section>
              <section id="ourMission">
                <h2>Our Mission:</h2>
                <section id="ourMission1">
                  <h3>At KMCesports, our mission is to:</h3>
                  <p>
                    Provide a platform for gamers to compete in a safe and
                    respectful environment. Promote fair play and integrity in
                    all our tournaments and events. Offer a variety of
                    tournaments and formats to cater to diverse interests and
                    skill levels. Create a thriving community where gamers can
                    connect, share their passion, and learn from each other.
                    Support the growth and development of the esports industry.
                  </p>
                </section>
                <section id="ourMission2">
                  <h3>We believe in the following core values:</h3>
                  <p>
                    Fairness: We are committed to providing a level playing
                    field for all participants. Integrity: We uphold the highest
                    standards of ethical conduct in all our operations.
                    Community: We foster a welcoming and inclusive environment
                    for all gamers. Passion: We share our passion for esports
                    with our community and strive to create a positive and
                    engaging experience. Innovation: We are constantly looking
                    for new ways to improve and expand our platform and
                    services.
                  </p>
                </section>
              </section>
              <section id="whatWeOffer">
                <h2>What We Offer:</h2>
                <section id="whatWeOffer1">
                  <h3>
                    KMCesports offers a wide range of features and services,
                    including:
                  </h3>
                  <p>
                    Tournaments: We host a variety of tournaments for popular
                    esports titles, with different formats to cater to casual
                    and competitive players alike. Leagues: Join a league and
                    compete against other players for a chance to win prizes and
                    climb the ranks. Ladders: Challenge yourself and climb the
                    ladder to prove your skills in individual competition.
                    Community Features: Connect with other gamers, discuss
                    strategies, and find teammates in our forums, chat rooms,
                    and social media channels. Streaming: Watch top players
                    compete live and learn from their skills and strategies.
                    Join the KMCesports Community!
                  </p>
                </section>
                <section id="whatWeOffer2">
                  <h3>KMCesports: Elevate Your Game, Claim Your Glory</h3>
                  <p>
                    At KMCesports, victory isn't just about bragging rights -
                    it's about reaping the rewards! Every tournament holds the
                    potential for a thriving prize pool and a system of earning
                    points you can use to grab epic loot across our platform.
                    Gear up, sharpen your skills, and get ready to dominate!
                  </p>
                </section>
              </section>
              <section id="powerhouse">
                <h2>Prize Pool Powerhouse:</h2>
                <section id="powerhouse1">
                  <h2>Exciting Escalation:</h2>
                  <p>
                    he more players join a tournament, the higher the prize pool
                    climbs! Watch the anticipation surge as the pot swells,
                    promising lucrative rewards for the top performers.
                  </p>
                </section>
                <section id="powerhouse2">
                  <h2>Tiered Triumphs:</h2>
                  <p>
                    Whether you're a seasoned champion or a rising star, there's
                    a place for you in the winning circle. Every tournament
                    features multiple prize tiers, ensuring top contenders and
                    promising newcomers alike walk away with a satisfying haul.
                  </p>
                </section>
                <section id="powerhouse3">
                  <h2>Cash & More:</h2>
                  <p>
                    From cold, hard cash to sponsor-provided gaming gear and
                    peripherals, our prize pools offer a mix of rewards that
                    fuel your competitive spirit and level up your gameplay.
                  </p>
                </section>
              </section>
              <section id="pointsSystem">
                <h2 className="text-2xl " style={{ marginBottom: "1rem" }}>
                  Points System:
                </h2>
                <p>
                  Level Up Your Loot Every Match Matters: Earn points not just
                  for tournament victories, but for every competitive match you
                  play! Consistent performance builds your point total, opening
                  doors to even more rewards. Redemption Paradise: Our website
                  boasts a curated store bursting with awesome goodies. Use your
                  earned points to snag exclusive in-game items, cosmetics,
                  merchandise, and even tournament entries, keeping the value
                  and excitement flowing. Exclusive Perks: As your point level
                  climbs, you unlock exclusive benefits like priority tournament
                  registration, access to special events, and even personalized
                  rewards tailored to your gaming preferences.
                </p>
              </section>
              <section id="KMCesports">
                <h2 className="text-2xl" style={{ marginBottom: "1rem" }}>
                  KMCesports - Where Skill Meets Reward:
                </h2>
                <p style={{ marginBottom: "2rem" }}>
                  At KMCesports, we believe every victory deserves to be
                  celebrated. Join our passionate community, push your limits,
                  and reap the rewards of your dedication. With a robust prize
                  pool system and a point-based redemption paradise, your
                  triumphs translate into tangible gains, fueling your passion
                  and propelling you further on your esports journey. So, step
                  onto the virtual arena, unleash your skills, and claim your
                  glory! The more you win, the more you earn, and the more epic
                  your KMCesports experience becomes. Remember, this is just a
                  template, feel free to customize it with specific prize pool
                  figures, point values, and reward examples relevant to your
                  website and target audience. Whether you're a seasoned veteran
                  or a curious newcomer, we welcome you to join the KMCesports
                  community. Sign up today and start your esports journey with
                  us!
                </p>
              </section>
            </div>
            <nav className="section-nav">
              <ol>
                <li>
                  <a href="#aboutKMCesports">About KMCesports</a>
                </li>
                <li>
                  <a href="#ourMission">Our Mission</a>
                  <ul>
                    <li className="">
                      <a href="#ourMission1">Platform for gamers</a>
                    </li>
                    <li className="">
                      <a href="#ourMission2">Values</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#whatWeOffer">What We Offer</a>
                  <ul>
                    <li className="">
                      <a href="#whatWeOffer1">Tournaments</a>
                    </li>
                    <li className="">
                      <a href="#whatWeOffer2">Claim Your Glory</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#powerhouse">Prize Pool</a>
                  <ul>
                    <li className="">
                      <a href="#powerhouse1">Exciting Escalation</a>
                    </li>
                    <li className="">
                      <a href="#powerhouse2">Multiple prize tiers</a>
                    </li>
                    <li className="">
                      <a href="#powerhouse3">Rewards</a>
                    </li>
                  </ul>
                </li>
                <li className="">
                  <a href="#pointsSystem">Points System</a>
                </li>
                <li className="">
                  <a href="#KMCesports">KMCesports</a>
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
              <section id="aboutKMCesports">
                <h1
                  className="text-4xl"
                  style={{
                    textAlign: "center",
                    marginBottom: "1rem",
                    textDecorationLine: "underline",
                    fontWeight: "400",
                  }}
                >
                  About KMCesports
                </h1>
                <p>
                  We are KMCesports, a passionate community dedicated to
                  fostering a fair, competitive, and thrilling esports
                  experience for players of all skill levels. Founded by a team
                  of experienced gamers and esports enthusiasts, we understand
                  the excitement, dedication, and sportsmanship that fuels the
                  competitive gaming world.
                </p>
              </section>
              <section id="ourMission">
                <h2>Our Mission:</h2>
                <section id="ourMission1">
                  <h3>At KMCesports, our mission is to:</h3>
                  <p>
                    Provide a platform for gamers to compete in a safe and
                    respectful environment. Promote fair play and integrity in
                    all our tournaments and events. Offer a variety of
                    tournaments and formats to cater to diverse interests and
                    skill levels. Create a thriving community where gamers can
                    connect, share their passion, and learn from each other.
                    Support the growth and development of the esports industry.
                  </p>
                </section>
                <section id="ourMission2">
                  <h3>We believe in the following core values:</h3>
                  <p>
                    Fairness: We are committed to providing a level playing
                    field for all participants. Integrity: We uphold the highest
                    standards of ethical conduct in all our operations.
                    Community: We foster a welcoming and inclusive environment
                    for all gamers. Passion: We share our passion for esports
                    with our community and strive to create a positive and
                    engaging experience. Innovation: We are constantly looking
                    for new ways to improve and expand our platform and
                    services.
                  </p>
                </section>
              </section>
              <section id="whatWeOffer">
                <h2>What We Offer:</h2>
                <section id="whatWeOffer1">
                  <h3>
                    KMCesports offers a wide range of features and services,
                    including:
                  </h3>
                  <p>
                    Tournaments: We host a variety of tournaments for popular
                    esports titles, with different formats to cater to casual
                    and competitive players alike. Leagues: Join a league and
                    compete against other players for a chance to win prizes and
                    climb the ranks. Ladders: Challenge yourself and climb the
                    ladder to prove your skills in individual competition.
                    Community Features: Connect with other gamers, discuss
                    strategies, and find teammates in our forums, chat rooms,
                    and social media channels. Streaming: Watch top players
                    compete live and learn from their skills and strategies.
                    Join the KMCesports Community!
                  </p>
                </section>
                <section id="whatWeOffer2">
                  <h3>KMCesports: Elevate Your Game, Claim Your Glory</h3>
                  <p>
                    At KMCesports, victory isn't just about bragging rights -
                    it's about reaping the rewards! Every tournament holds the
                    potential for a thriving prize pool and a system of earning
                    points you can use to grab epic loot across our platform.
                    Gear up, sharpen your skills, and get ready to dominate!
                  </p>
                </section>
              </section>
              <section id="powerhouse">
                <h2>Prize Pool Powerhouse:</h2>
                <section id="powerhouse1">
                  <h2>Exciting Escalation:</h2>
                  <p>
                    he more players join a tournament, the higher the prize pool
                    climbs! Watch the anticipation surge as the pot swells,
                    promising lucrative rewards for the top performers.
                  </p>
                </section>
                <section id="powerhouse2">
                  <h2>Tiered Triumphs:</h2>
                  <p>
                    Whether you're a seasoned champion or a rising star, there's
                    a place for you in the winning circle. Every tournament
                    features multiple prize tiers, ensuring top contenders and
                    promising newcomers alike walk away with a satisfying haul.
                  </p>
                </section>
                <section id="powerhouse3">
                  <h2>Cash & More:</h2>
                  <p>
                    From cold, hard cash to sponsor-provided gaming gear and
                    peripherals, our prize pools offer a mix of rewards that
                    fuel your competitive spirit and level up your gameplay.
                  </p>
                </section>
              </section>
              <section id="pointsSystem">
                <h2 className="text-2xl " style={{ marginBottom: "1rem" }}>
                  Points System:
                </h2>
                <p>
                  Level Up Your Loot Every Match Matters: Earn points not just
                  for tournament victories, but for every competitive match you
                  play! Consistent performance builds your point total, opening
                  doors to even more rewards. Redemption Paradise: Our website
                  boasts a curated store bursting with awesome goodies. Use your
                  earned points to snag exclusive in-game items, cosmetics,
                  merchandise, and even tournament entries, keeping the value
                  and excitement flowing. Exclusive Perks: As your point level
                  climbs, you unlock exclusive benefits like priority tournament
                  registration, access to special events, and even personalized
                  rewards tailored to your gaming preferences.
                </p>
              </section>
              <section id="KMCesports">
                <h2 className="text-2xl" style={{ marginBottom: "1rem" }}>
                  KMCesports - Where Skill Meets Reward:
                </h2>
                <p style={{ marginBottom: "2rem" }}>
                  At KMCesports, we believe every victory deserves to be
                  celebrated. Join our passionate community, push your limits,
                  and reap the rewards of your dedication. With a robust prize
                  pool system and a point-based redemption paradise, your
                  triumphs translate into tangible gains, fueling your passion
                  and propelling you further on your esports journey. So, step
                  onto the virtual arena, unleash your skills, and claim your
                  glory! The more you win, the more you earn, and the more epic
                  your KMCesports experience becomes. Remember, this is just a
                  template, feel free to customize it with specific prize pool
                  figures, point values, and reward examples relevant to your
                  website and target audience. Whether you're a seasoned veteran
                  or a curious newcomer, we welcome you to join the KMCesports
                  community. Sign up today and start your esports journey with
                  us!
                </p>
              </section>
            </div>
            <nav className="section-nav">
              <ol>
                <li>
                  <a href="#aboutKMCesports">About KMCesports</a>
                </li>
                <li>
                  <a href="#ourMission">Our Mission</a>
                  <ul>
                    <li className="">
                      <a href="#ourMission1">Platform for gamers</a>
                    </li>
                    <li className="">
                      <a href="#ourMission2">Values</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#whatWeOffer">What We Offer</a>
                  <ul>
                    <li className="">
                      <a href="#whatWeOffer1">Tournaments</a>
                    </li>
                    <li className="">
                      <a href="#whatWeOffer2">Claim Your Glory</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#powerhouse">Prize Pool</a>
                  <ul>
                    <li className="">
                      <a href="#powerhouse1">Exciting Escalation</a>
                    </li>
                    <li className="">
                      <a href="#powerhouse2">Multiple prize tiers</a>
                    </li>
                    <li className="">
                      <a href="#powerhouse3">Rewards</a>
                    </li>
                  </ul>
                </li>
                <li className="">
                  <a href="#pointsSystem">Points System</a>
                </li>
                <li className="">
                  <a href="#KMCesports">KMCesports</a>
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

export default About;
