import React, { useEffect, useState } from "react";
import { components } from "../../../components";
import "./Dashboard.css";
import { images } from "../../../assets";
import config from "../../../config";
import { toast } from "react-toastify";
import { useAuth } from "../../../store/auth";

const Dashboard = () => {
  let token = localStorage.getItem("Token");
  const { userdata } = useAuth();
  const [gameData, setGameData] = useState([]);
  const [bookmarkData, setBookmarkData] = useState([]);
  const [userBookmarkData, setUserBookmarkData] = useState([]);
  const [commingSoonData, setCommingSoonData] = useState([]);

  const [commingSoon, setCommingSoon] = useState(true);
  const [bookmark, setBookmark] = useState(true);

  const handleCheckboxToggle = (item) => {
    if (bookmarkData.find((bookmarkItem) => bookmarkItem._id === item._id)) {
      // If item is already in bookmarkData, remove it
      removeBookmark(item._id);
      setBookmarkData(
        bookmarkData.filter((bookmarkItem) => bookmarkItem._id !== item._id)
      );
    } else {
      // If item is not in bookmarkData, add it
      addBookmark(item._id);
      setBookmarkData([...bookmarkData, item]);
    }
  };
  const getGameData = async (token) => {
    try {
      const response = await fetch(`${config.backendUrl}/gamedata`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        // game data
        setGameData(data.gameData);
        // user bookmark data
        setUserBookmarkData(userdata.bookmarks);
        // comming soon data
        setCommingSoonData(data.commingSoonData);
      } else {
        toast.error(`failed to get Games Data`, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addBookmark = async (gameId) => {
    try {
      const response = await fetch(`${config.backendUrl}/userBookmarkAdd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gameId }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.msg, {
          position: "top-center",
        });
      } else {
        toast.error(`failed to Add BookMark`, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeBookmark = async (gameId) => {
    try {
      const response = await fetch(`${config.backendUrl}/userBookmarkRemove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gameId }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.msg, {
          position: "top-center",
        });
      } else {
        toast.error(`failed to Remove BookMark`, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    getGameData(token);
  }, [userdata]);

  useEffect(() => {
    if (userBookmarkData !== null) {
      setBookmarkData((prevBookmarkData) => {
        let updatedBookmarkData = [...prevBookmarkData]; // Create a copy of the previous state
        for (let i = 0; i < gameData.length; i++) {
          for (let j = 0; j < userBookmarkData.length; j++) {
            if (gameData[i]._id === userBookmarkData[j]) {
              updatedBookmarkData.push(gameData[i]); // Push the new bookmark into the copy
            }
          }
        }
        return updatedBookmarkData; // Return the updated state
      });
    }
  }, [userBookmarkData]);

  useEffect(() => {

    if (bookmarkData.length > 0) {
      setBookmark(false);
    } else {
      setBookmark(true);
    }
  }, [bookmarkData]);

  useEffect(() => {

    if (commingSoonData.length > 0) {
      setCommingSoon(false);
    } else {
      setCommingSoon(true);
    }
  }, [commingSoonData]);

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
                  key={item._id}
                  title={item.title}
                  subtitle={item.subtitle}
                  type={item.type}
                  startTime={item.startTime}
                  extraDetails={item.extraDetails}
                  link={item.link}
                  image={item.image}
                  checked={bookmarkData.some(
                    (bookmarkItem) => bookmarkItem._id === item._id
                  )}
                  onCheckboxToggle={() => handleCheckboxToggle(item)}
                />
              );
            })}
          </ul>
        </div>
        <div className="Bookmark panel" id="bookmarksection">
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
                    key={item._id}
                    title={item.title}
                    subtitle={item.subtitle}
                    type={item.type}
                    startTime={item.startTime}
                    extraDetails={item.extraDetails}
                    link={item.link}
                    image={item.image}
                    checked={bookmarkData.some(
                      (bookmarkItem) => bookmarkItem._id === item._id
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
