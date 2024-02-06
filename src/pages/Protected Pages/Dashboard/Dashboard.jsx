import React from "react";
import { components } from "../../../components";
import "./Dashboard.css";
import { images } from "../../../assets";
const Dashboard = () => {
  const data = [
    {
      title: "Pubg Mobile Tournament",
      subtitle: "Make your team and win the prize pool of 1000$",
      type: "Paid Tournament 10$",
      startTime: "2024-03-01T00:07:00",
      extraDetails:
        "This is a paid tournament. You have to pay 10$ to join this tournament. The prize pool is 1000$.",
      link: "/Contact",
      image: "Crocodile",
    },
    {
      title: "Exciting Pubg Championship",
      subtitle: "Assemble your squad and compete for a $1500 prize",
      type: "Paid Entry $15",
      startTime: "2024-03-15T14:30:00",
      extraDetails:
        "Join this thrilling tournament with a paid entry of $15. Total prize money is $1500.",
      link: "/Registration",
      image: "Crocodile",
    },
    {
      title: "Battle Royale Showdown",
      subtitle: "Form your dream team and seize the $800 grand prize",
      type: "Entry Fee $8",
      startTime: "2024-04-02T18:45:00",
      extraDetails:
        "Participate in this intense battle with an entry fee of $8. The winner takes home the grand prize of $800.",
      link: "/SignUp",
      image: "Crocodile",
    },
    {
      title: "Elite Squad Showdown",
      subtitle: "Compete against top teams for a chance to win $1200",
      type: "Paid Entry $12",
      startTime: "2024-04-20T21:15:00",
      extraDetails:
        "A challenging tournament awaits you. Secure your spot by paying the entry fee of $12. Prize pool: $1200.",
      link: "/Details",
      image: "Crocodile",
    },
    {
      title: "Ultimate Pubg Challenge",
      subtitle: "Battle it out for the title and a $2000 cash prize",
      type: "Paid Entry $20",
      startTime: "2024-05-05T12:00:00",
      extraDetails:
        "The ultimate challenge is here. Pay the entry fee of $20 and stand a chance to win the grand prize of $2000.",
      link: "/RegisterNow",
      image: "Crocodile",
    },
    {
      title: "Clash of Champions",
      subtitle: "Gather your squad for a shot at the $1000 prize pool",
      type: "Paid Entry $10",
      startTime: "2024-05-18T17:30:00",
      extraDetails:
        "Join the Clash of Champions with an entry fee of $10. Compete for a share of the $1000 prize pool.",
      link: "/JoinNow",
      image: "Crocodile",
    },
  ];
  return (
    <div className="dashboard">
      <div className="maincardclass  mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <components.DashboardNavbar />
        <h1>
          <p className="maintext">Level Up Your Game</p>{" "}
          <p>Join Exciting Esports Tournaments and Compete for Glory!</p>
        </h1>
        <div className="games panel">
          <div className="title">
            <h1>Battle Arena</h1>
            <p>Games Tournament Section</p>
          </div>
          <ul>
            {data.map((item, index) => {
              return (
                <components.GameCard
                  key={index}
                  title={item.title}
                  subtitle={item.subtitle}
                  type={item.type}
                  startTime={item.startTime}
                  extraDetails={item.extraDetails}
                  link={item.link}
                  image={item.image}
                />
              );
            })}
          </ul>
        </div>
        <div className="Bookmark panel">
          <div className="title">
            <h1>Tourney Tracker</h1>
            <p>Secure Your Play Space</p>
          </div>
        </div>
        <div className="upcoming panel">
          <div className="title">
            <h1>
              Future Clash <span>Calendar</span>
            </h1>
            <p>
              Upcoming Tournaments <br /> Section
            </p>
          </div>
          <div style={{display: "flex", justifyContent: "center"}}>
            {/* <img
              src={images.CommingSoon}
              alt="comming soon"
              style={{ width: "-webkit-fill-available" }}
            /> */}
            <components.CommingSoon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
