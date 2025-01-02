import React, { useEffect, useState } from "react";
import Style from "./DisplayChallenge.module.css";
import { FetchChallenges } from "./Challengeapi";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/loading";
// import <Loder></Loder
function GetChallengeRow({ challenge, handeler }) {
  return (
    <>
      <tr className={Style.Displaythtr}>
        <td className={`${Style.DispalyData} ${Style.status}`}>Pending</td>
        <td className={`${Style.DispalyData} ${Style.title}`}>
          {challenge.challengeName}
        </td>
        <td
          className={`${Style.DispalyData}  ${Style.level} ${
            challenge.challengeLevel === "Easy"
              ? Style.easy
              : challenge.challengeLevel == "Medium"
              ? Style.medium
              : Style.hard
          }`}
        >
          {challenge.challengeLevel}
        </td>
        <td className={`${Style.DispalyData} ${Style.playnow}`}>
          <button
            className={Style.playBtn}
            onClick={() => {
              handeler(challenge.challengeID);
            }}
          >
            play now{" "}
          </button>
        </td>
      </tr>
    </>
  );
}

function ChallengeBoard() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function GetChallenge() {
    setLoading(true);
    const response = await FetchChallenges();
    if (response) {
      setChallenges(response.data?.challenges);
      setLoading(false);
    }
  }
  useEffect(() => {
    GetChallenge();
  }, []);
  const playNowHandel = (id) => {
    navigate(`/challenge/${id}`);
  };
  return (
    <>
      {console.log("is loading", loading)}
      <div className={`${Style.DisplayContainer}`}>
        <table className={`${Style.DisplayChallengeHeader}`}>
          {loading && <Loader msg={"loading..."}></Loader>}

          <thead className={`${Style.Displaythtr} ${Style.head}`}>
            <th className={`${Style.DispalyData}  ${Style.status}`}>Status</th>
            <th className={`${Style.DispalyData} ${Style.title}`}>Title</th>
            <th className={`${Style.DispalyData} ${Style.level}`}>Level</th>
            <th className={`${Style.DispalyData} ${Style.playnow}`}></th>
          </thead>
          <tbody>
            {challenges.map((data) => (
              <>
                <GetChallengeRow
                  key={data.challengeID}
                  challenge={data}
                  handeler={playNowHandel}
                ></GetChallengeRow>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ChallengeBoard;
