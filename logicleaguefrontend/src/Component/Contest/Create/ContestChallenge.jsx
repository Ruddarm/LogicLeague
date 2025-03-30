import React from "react";

import Style from "./ContestChallenge.module.css";
import { ContestInput, ContestLabel } from "./ContestForm";

function ChallengeRow({ sr, name, score }) {
  return (
    <>
      <tr className={Style.ContestTableRow}>
        <td className={`${Style.ContestTableRowData} ${Style.DataSr}`}>1</td>
        <td className={Style.ContestTableRowData}>Add Two Number</td>
        <td className={Style.ContestTableRowData}>100</td>
        <td className={Style.ContestTableRowData}>
          <button>Delete</button>
        </td>
      </tr>
    </>
  );
}
function ContestChallenge() {
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
                  <ContestInput></ContestInput>
                </div>
                <button className={Style.addContestButton}>Add</button>
              </div>
              <div className={Style.ChallengeSuggestionContainer} style={{marginTop:0}}></div>
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
              <ChallengeRow sr={1} name={"Add two Number"}></ChallengeRow>
              <ChallengeRow sr={1} name={"Add two Number"}></ChallengeRow>
              <ChallengeRow sr={1} name={"Add two Number"}></ChallengeRow>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ContestChallenge;
