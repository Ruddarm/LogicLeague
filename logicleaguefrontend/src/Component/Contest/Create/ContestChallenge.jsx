import React, { useEffect } from "react";
import { useState } from "react";
import Style from "./ContestChallenge.module.css";
import { ContestInput, ContestLabel } from "./ContestForm";
import { useContestEdit } from "../Hooks/ContestLandingHooks";
import axiosInstance from "../../utils/request";

function ChallengeRow({ sr, name, score }) {
  return (
    <>
      <tr className={Style.ContestTableRow}>
        <td className={`${Style.ContestTableRowData} ${Style.DataSr}`}>{sr}</td>
        <td className={Style.ContestTableRowData}>{name}</td>
        <td className={Style.ContestTableRowData}>{score}</td>
        <td className={Style.ContestTableRowData}>
          <button>Delete</button>
        </td>
      </tr>
    </>
  );
}
function SuggestionItem({ challengeName, challengeID, addChallenge }) {
  const challenge = {
    challenge: challengeID,
    challenge_name: challengeName,
    marks: 10,
  };
  console.log(challenge)
  return (
    <li
      onClick={() => {
        addChallenge(challenge);
      }}
      className={Style.suggestionListItem}
    >
      {challengeName}
    </li>
  );
}
function ContestChallenge() {
  const { challenges, addChallenge } = useContestEdit();
  const [query, setQuery] = useState(""); // User input
  const [suggestions, setSuggestions] = useState([]); // Fetched challenges
  const [selectedChallenges, setSelectedChallenges] = useState([]);
  

  const fetchChallenges = async (query) => {
    if (query.length < 2) return; // Minimum 2 letters before search
    try {
      const response = await axiosInstance.get(
        `challenges/admin/search-challenge/?search=${query}`
      );
      handelSuggestion(response.data);
    } catch (error) {
      console.error("Error fetching challenges", error);
    }
  };
  const handelSuggestion = (value) => {
    if (query === "") setSuggestions([]);
    else setSuggestions(value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log("value is", value);
    if (value === "") {
      setQuery(value);
      setSuggestions([]);
      return;
    }
    setQuery(value);
    fetchChallenges(value);
  };
  useEffect(() => {
    if (query === "") {
      setSuggestions([]);
    }
  }, [query]);
  // console.log(suggestions, "and", query);
  return (
    <>
      <div className={Style.ChallengeBodyContainer}>
        {/* Add Challenge */}
        <div className={Style.AddChallengeContianer}>
          <div className={Style.AddChallengeInnerContainer}>
            <ContestLabel title={"Find Challenge"}></ContestLabel>
            <div className={Style.FindChallengInputContainer}>
              <div className={Style.FindChallengInputContainer}>
                <div style={{ width: "100%", backgroundColor: "red" }}>
                  <ContestInput
                    name="querry"
                    value={query}
                    placeholder={"Search Challenges Here"}
                    changeHandeler={handleInputChange}
                  ></ContestInput>
                </div>
                <button className={Style.addContestButton}>Add</button>
              </div>
              {suggestions.length >= 1 && query.length > 0 ? (
                <div
                  className={Style.ChallengeSuggestionContainer}
                  style={{ marginTop: "5px" }}
                >
                  <ul className={Style.suggestionList}>
                    {suggestions.map((data, idx) => (
                      <SuggestionItem
                        key={idx}
                        challengeID={data.challengeID}
                        challengeName={data.challengeName}
                        addChallenge={addChallenge}
                      ></SuggestionItem>
                    ))}
                  </ul>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        {/* Show Exsiting Challenge */}
        <div className={Style.ContestChallengeTabelContainer}>
          <table className={Style.ContestChallengeTabel}>
            <thead className={Style.ContestChallengeTableHead}>
              <tr className={`${Style.ContestTableRow} ${Style.tableHeadRow}`}>
                <th className={`${Style.ContestTableRowData} ${Style.DataSr}`}>
                  Sr
                </th>
                <th className={Style.ContestTableRowData}>Challenge Name</th>
                <th className={Style.ContestTableRowData}>Max Score</th>
                <th className={Style.ContestTableRowData}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((data, idx) => (
                <ChallengeRow
                  sr={idx + 1}
                  key={idx}
                  name={data.challenge_name}
                  score={data.marks}
                ></ChallengeRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ContestChallenge;
