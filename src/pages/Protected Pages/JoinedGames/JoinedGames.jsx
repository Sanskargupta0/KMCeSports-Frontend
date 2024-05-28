import React, { useEffect, useState } from "react";
import { components } from "../../../components";
import config from "../../../config";
const JoinedGames = () => {
  let token = localStorage.getItem("Token");
  const [JoinedGames, setJoinedGames] = useState([]);
  const getJoinedGameData = async (token) => {
    try {
      const response = await fetch(`${config.backendUrl}/userJoinedGames`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        // get Joined Games Data
        setJoinedGames(data);
        console.log(data);
      } else {
        toast.error(`failed to get Joinned Games Data`, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const timeConverter = (timestamp) => {
    let date = new Date(timestamp);
    let formattedDate = date.toLocaleString("en-IN");
    return formattedDate;
  };

  useEffect(() => {
    getJoinedGameData(token);
  }, []);

  return (
    <div className="maincardclass  mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <components.DashboardNavbar />
      <section className="ftco-section flex justify-center">
        <div className="container">
          <div className="row justify-center">
            <div className="col-md-6 text-center mb-5 text-xl text-">
              <h2 className="heading-section">Joined Games</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table-wrap overflow-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">Game ID</th>
                      <th className="px-4 py-2">Title</th>
                      <th className="px-4 py-2">Payment ID</th>
                      <th className="px-4 py-2">Joined At</th>
                      <th className="px-4 py-2">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {JoinedGames.map((item,) => (
                      <tr className="border-b border-gray-200 text-center" key={item.payment_id}>
                        <td className="px-4 py-2">{item.gameId}</td>
                        <td className="px-4 py-2">{item.title}</td>
                        <td className="px-4 py-2">{item.payment_id}</td>
                        <td className="px-4 py-2">{timeConverter(item.joinedAt)}</td>
                        <td className="px-4 py-2">
                          <a
                            href="#"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Link
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinedGames;
