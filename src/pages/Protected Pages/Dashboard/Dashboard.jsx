import React, { useEffect, useState } from "react";
import { components } from "../../../components";
import "./Dashboard.css";
import { images } from "../../../assets";
const Dashboard = () => {
  const [gameData, setGameData] = useState([
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
      title: "Clash of Champions",
      subtitle: "Gather your squad for a shot at the $1000 prize pool",
      type: "Paid Entry $10",
      startTime: "2024-05-18T17:30:00",
      extraDetails:
        "Join the Clash of Champions with an entry fee of $10. Compete for a share of the $1000 prize pool.",
      link: "/JoinNow",
      image: "Crocodile",
    },
  ]);
  const [bookmarkData, setBookmarkData] = useState([]);
  const commingSoonData = [
    {
      title: "Comming Soon",
      description: "Stay Tuned for More Exciting Tournaments",
      images: "Cat",
      link: "/CommingSoon"
    },
    {
      title: "Upcoming Events",
      description: "Check out our calendar for upcoming tournaments",
      images: "Cat",
      link: "/UpcomingEvents"
    },
    {
      title: "Latest Updates",
      description: "Catch up on the latest news and announcements",
      images: "Cat",
      link: "/LatestUpdates"
    },
    {
      title: "Special Announcement",
      description: "Exciting news coming your way soon!",
      images: "Cat",
      link: "/SpecialAnnouncement"
    },
    {
      title: "Exclusive Sneak Peek",
      description: "Get a glimpse of what's in store for you",
      images: "Cat",
      link: "/ExclusiveSneakPeek"
    }
  ];
  
  const [commingSoon, setCommingSoon] = useState(true);
  const [bookmark, setBookmark] = useState(true);

  const handleCheckboxToggle = (item) => {
    if (bookmarkData.find((bookmarkItem) => bookmarkItem.id === item.id)) {
      // If item is already in bookmarkData, remove it
      setBookmarkData(
        bookmarkData.filter((bookmarkItem) => bookmarkItem.id !== item.id)
      );
    } else {
      // If item is not in bookmarkData, add it
      setBookmarkData([...bookmarkData, item]);
    }
  };
  useEffect(() => {
    if (bookmarkData.length > 0) {
      setBookmark(false);
    } else {
      setBookmark(true);
    }
  }, [bookmarkData]);

  useEffect(()=>{
    if (commingSoonData.length>0){
      setCommingSoon(false);
    }
    else{
      setCommingSoon(true);
    }
  },[commingSoonData])
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
            {gameData.map((item) => {
              return (
                <components.GameCard
                  key={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  type={item.type}
                  startTime={item.startTime}
                  extraDetails={item.extraDetails}
                  link={item.link}
                  image={item.image}
                  checked={bookmarkData.some(
                    (bookmarkItem) => bookmarkItem.id === item.id
                  )}
                  onCheckboxToggle={() => handleCheckboxToggle(item)}
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
          {bookmark ? (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={images.NoBookmark}
                  alt="NoBookmark"
                  style={{ width: "100%", maxWidth: "700px" }}
                />
              </div>
              <p className="title" style={{ fontSize: "3vw", color: "red" }}>
                No BookMark Found !
              </p>{" "}
            </>
          ) : (
            <ul>
              {bookmarkData.map((item) => {
                return (
                  <components.GameCard
                    key={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    type={item.type}
                    startTime={item.startTime}
                    extraDetails={item.extraDetails}
                    link={item.link}
                    image={item.image}
                    checked={bookmarkData.some(
                      (bookmarkItem) => bookmarkItem.id === item.id
                    )}
                    onCheckboxToggle={() => handleCheckboxToggle(item)}
                  />
                );
              })}
            </ul>
          )}
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
          {commingSoon ? (
            <img
              src={images.CommingSoon}
              alt="comming soon"
              style={{ width: "-webkit-fill-available" }}
            />
          ) : (
            <ul>
              {commingSoonData.map((item, index) => {
                return (
                  <components.CommingSoon
                    key={index}
                    title={item.title}
                    description={item.description}
                    images={item.images}
                    link={item.link}
                  />
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
