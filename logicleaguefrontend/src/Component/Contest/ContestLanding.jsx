// A React js page for Contest Landing Page
import React from "react";

// Importing the CSS file for the Contest Landing Page
import Style from "./ContestLanding.module.css";

// Function to create a Contest Info Card
function ContestInfoCard(title, content) {
  return (
    <>
      <div className={Style.ContestInfoCard}>
        <span id={Style.infoHeading}>{title}</span>
        <div className={Style.content}>
          {content}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure impedit
          distinctio perspiciatis nisi dolor ipsa rem quaerat repudiandae
          cupiditate. Totam doloremque perspiciatis nihil fugiat, quam nulla
          consectetur ipsum qui nisi!
        </div>
      </div>
    </>
  );
}

// Function to create the Contest Banner
function ContestBanner() {
  return (
    <>
      <div className={Style.ContestBannerContainer}>
        <img
          id={Style.trophyImage}
          src="\trophy.png"
          alt="Contest Banner"
          className={Style.ContestBannerImage}
        />
        <span id={Style.ContestBannerText}>Code to conquer the world</span>
        <span></span>
      </div>
    </>
  );
}
// Function to create the Contest Challenge Board
function ContestChallengeBoard() {
  return (
    <>
      <div className={Style.ContestInfoCard}>
        <span id={Style.infoHeading}>Challenges</span>
        <div className={Style.ChalenegeBox}>
          {ContestChallengeCard("Challenge 1")}
          {ContestChallengeCard("Challenge 1")}
        </div>
      </div>
    </>
  );
}
// Function to create the Contest Challenge Card
function ContestChallengeCard(title) {
  return (
    <>
      <div className={Style.ChallengeCard}>
        <div className={`${Style.flexCentercolumn} `}>
          <div id={Style.infoHeading}>{title}</div>
          <div
            style={{
              padding: "0rem 0.5rem",
              fontFamily: "lato",
              fontSize: "0.9rem",
            }}
          >
            Max Score: <span>100</span>
          </div>
        </div>
        <div className={Style.flexCenter}>
          <button>Solve</button>
        </div>
      </div>
    </>
  );
}
// Function to create the Contest Landing Page
function ContestLandingPage() {
  return (
    <>
      <div className={Style.ContestLandingPageContainer}>
        <div>
          {ContestBanner()}
          <div className={Style.ContestContentContainer}>
            <div className={Style.ContestInfoContainer}>
              {ContestInfoCard("About Contest", "")}
              {ContestInfoCard("Rules", "")}
              {ContestInfoCard("Prizes", "")}
              {ContestInfoCard("Scoring", "")}
            </div>
            <div className={Style.ContestChallengeBoardContainer}>
              {ContestChallengeBoard()}
            </div>
            <div className={Style.ContestLeaderboardContainer}>
              <ContestLeaderboard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
// Function to create a contest Leaderboard
function ContestLeaderboard() {
  return (
    <>
      <div className={Style.ContestInfoCard}>
        <span id={Style.infoHeading}>Leaderboard</span>
        <table className={Style.LeaderboardBox}>
          <thead className={Style.LeaderboardHead}>
            <tr>
              <th  className={Style.rank}>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Submission</th>
            </tr>
          </thead>
          <tbody className={Style.LeaderboardHead}>
            <tr>{userCard(1, "ruddarm", 10)}</tr>
            <tr>{userCard(2, "Niks", 9)}</tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function userCard(rank, name, score) {
  return (
    <>
      <td className={Style.rank}>{rank}</td>
      <td className={Style.name}>{name}</td>
      <td children={score} className={Style.score}>{score}</td>
      <td className={Style.submission}><button>View Submission</button></td>
    </>
  );
}

export default ContestLandingPage;
